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
import play.api.mvc.Cookie
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
  implicit val messages = mcc.messagesApi.preferred(fakeRequest)

  private val controller = new WebchatController(
    appConfig,
    mcc,
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
      forAll { (fromUrl: Option[String]) =>
        val result = controller.webchat(fromUrl)(fakeRequest)

        status(result) shouldBe OK
        contentAsString(result) should include ("<h1>default.title</h1>")
      }
    }

    Seq(Some("non-page"), None).map { from =>
      s"non-supported ($from) pages should render default page" in {
        val result = controller.webchat(from)(fakeRequest)
        val doc = asDocument(contentAsString(result))

        doc.select("h1").text() shouldBe ("default.title default.sub.heading")
      }
    }

    "self-assessment should render the self-assessment webchat page" in {
      val from = Some("self-assessment")
      val result = controller.webchat(from)(fakeRequest)
      val doc = asDocument(contentAsString(result))

      doc.select("h1").text() shouldBe ("self.assessment.title")
    }

    "tax-credits should render the tax-credits webchat page" in {
      val from = Some("tax-credits")
      val result = controller.webchat(from)(fakeRequest)
      val doc = asDocument(contentAsString(result))

      doc.select("h1").text() shouldBe ("tax.credits.title")
    }
  }

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("self.assessment.title")
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("tax.credits.title")
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("child.benefit.title")
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("employers.enquiries.title")
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("vat.enquiries.title")
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("vat.online.helpdesk.title")
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("online.services.title")
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("national.insurance.title")
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("customs.title")
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe ("income.tax.title")
    }
  }
}
