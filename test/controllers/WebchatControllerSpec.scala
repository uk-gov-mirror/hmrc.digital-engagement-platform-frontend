/*
 * Copyright 2020 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers

import config.AppConfig
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.{Matchers, WordSpec}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.{Cookie, MessagesControllerComponents}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import services.NuanceEncryptionService
import uk.gov.hmrc.play.bootstrap.tools.Stubs.stubMessagesControllerComponents
import views.html._

class WebchatControllerSpec
  extends WordSpec
    with Matchers
    with GuiceOneAppPerSuite
    with ScalaCheckPropertyChecks {

  implicit private val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  implicit val appConfig = app.injector.instanceOf[AppConfig]
  val selfAssessmentView = app.injector.instanceOf[SelfAssessmentView]
  val taxCreditsView = app.injector.instanceOf[TaxCreditsView]
  val childBenefitView = app.injector.instanceOf[ChildBenefitView]
  val customsEnquiriesView = app.injector.instanceOf[CustomsEnquiriesView]
  val employerEnquiriesView = app.injector.instanceOf[EmployerEnquiriesView]
  val incomeTaxEnquiriesView = app.injector.instanceOf[IncomeTaxEnquiriesView]
  val nationalInsuranceNumbersView = app.injector.instanceOf[NationalInsuranceNumbersView]
  val onlineServiceHelpdeskView = app.injector.instanceOf[OnlineServiceHelpdeskView]
  val vatEnquiriesView = app.injector.instanceOf[VatEnquiriesView]
  val vatOnlineServicesHelpdeskView = app.injector.instanceOf[VatOnlineServicesHelpdeskView]
  val webChatView = app.injector.instanceOf[WebChatView]
  val nuanceEncryptionService = app.injector.instanceOf[NuanceEncryptionService]

  val mcc = stubMessagesControllerComponents()
  val messagesCC = app.injector.instanceOf[MessagesControllerComponents]
  private val controller = new WebchatController(
    appConfig,
    messagesCC,
    selfAssessmentView,
    taxCreditsView,
    childBenefitView,
    customsEnquiriesView,
    employerEnquiriesView,
    incomeTaxEnquiriesView,
    nationalInsuranceNumbersView,
    onlineServiceHelpdeskView,
    vatEnquiriesView,
    vatOnlineServicesHelpdeskView,
    webChatView,
    nuanceEncryptionService)

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Query parameter URLs" should {
    "All optionable strings should be 200" in {
      forAll { fromUrl: Option[String] =>
        val result = controller.webchat(fromUrl)(fakeRequest)
        val doc = asDocument(contentAsString(result))

        status(result) shouldBe OK
        doc.select("h1").text() shouldBe "Webchat Use the web chat on the side of the page to talk to an adviser"
      }
    }

    Seq(Some("non-page"), None).foreach { from =>
      s"non-supported ($from) pages should render default page" in {
        val result = controller.webchat(from)(fakeRequest)
        val doc = asDocument(contentAsString(result))

        doc.select("h1").text() shouldBe "Webchat Use the web chat on the side of the page to talk to an adviser"
      }
    }

    "self-assessment should render the self-assessment webchat page" in {
      val from = Some("self-assessment")
      val result = controller.webchat(from)(fakeRequest)
      val doc = asDocument(contentAsString(result))

      doc.select("h1").text() shouldBe "Self Assessment: webchat"
    }

    "tax-credits should render the tax-credits webchat page" in {
      val from = Some("tax-credits")
      val result = controller.webchat(from)(fakeRequest)
      val doc = asDocument(contentAsString(result))

      doc.select("h1").text() shouldBe "Tax credits: webchat"
    }
  }

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Self Assessment: webchat"
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Tax credits: webchat"
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Child Benefit: webchat"
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Employers: webchat"
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "VAT: webchat"
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "VAT online services helpdesk: webchat"
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Online services helpdesk: webchat"
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "National Insurance: webchat"
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Imports and exports: webchat"
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Income tax for individuals, pensioners and employees: webchat"
    }
  }
}
