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
import org.scalatest.MustMatchers._
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.{Cookie, MessagesControllerComponents}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import play.api.test._
import services.NuanceEncryptionService
import views.html._

class IvrControllerSpec
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
  val charitiesCommunityAmateurSportsView = app. injector.instanceOf[CharitiesCommunityAmateurSportsView]
  val employingExpatriateEmployeesView = app.injector.instanceOf[EmployingExpatriateEmployeesView]
  val employmentRelatedSecuritiesView = app.injector.instanceOf[EmploymentRelatedSecuritiesView]
  val nonUkResidentEmployeesView = app.injector.instanceOf[NonUkResidentEmployeesView]
  val nonUkResidentLandlordsView = app.injector.instanceOf[NonUkResidentLandlordsView]
  val corporationTaxEnquiriesView = app.injector.instanceOf[CorporationTaxEnquiriesView]
  val constructionIndustrySchemeView = app.injector.instanceOf[ConstructionIndustrySchemeView]
  val vatRegistrationView = app.injector.instanceOf[VatRegistrationView]
  val nationalClearanceHubView = app.injector.instanceOf[NationalClearanceHubView]

  val nuanceEncryptionService = app.injector.instanceOf[NuanceEncryptionService]

  val messagesCC = app.injector.instanceOf[MessagesControllerComponents]
  private val controller = new IvrController(
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
    charitiesCommunityAmateurSportsView,
    employingExpatriateEmployeesView,
    employmentRelatedSecuritiesView,
    nonUkResidentEmployeesView,
    nonUkResidentLandlordsView,
    corporationTaxEnquiriesView,
    constructionIndustrySchemeView,
    vatRegistrationView,
    nationalClearanceHubView,
    nuanceEncryptionService)

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/self-assessment?nuance=ivr")
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/tax-credits-enquiries?nuance=ivr")
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/child-benefit?nuance=ivr")
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/employer-enquiries?nuance=ivr")
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/vat-enquiries?nuance=ivr")
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/vat-online-services-helpdesk?nuance=ivr")
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/online-services-helpdesk?nuance=ivr")
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/national-insurance-numbers?nuance=ivr")
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/customs-international-trade-and-excise-enquiries?nuance=ivr")
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/income-tax-enquiries-for-individuals-pensioners-and-employees?nuance=ivr")
    }

    "render charities community sports page" in {
      val result = controller.charitiesCommunitySports(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/charities-and-community-sports?nuance=ivr")
    }

    "render employing expatriate employees page" in {
      val result = controller.employingExpatriateEmployees(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/employing-expatriate-employees?nuance=ivr")
    }

    "render employment related securities page" in {
      val result = controller.employmentRelatedSecurities(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/employment-related-securities?nuance=ivr")
    }

    "Non-UK resident employees page" in {
      val result = controller.nonUkResidentEmployees(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/non-UK-resident-employees?nuance=ivr")
    }

    "Non-UK resident landlords page" in {
      val result = controller.nonUkResidentLandlords(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/non-UK-resident-landlords?nuance=ivr")
    }

    "Corporation tax enquiries page" in {
      val result = controller.corporationTaxEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/corporation-tax-enquiries?nuance=ivr")
    }

    "Construction industry scheme page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/construction-industry-scheme-enquiries?nuance=ivr")
    }

    "VAT registration page" in {
      val result = controller.vatRegistration(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/vat-registration?nuance=ivr")
    }

    "National clearance hub page" in {
      val result = controller.nationalClearanceHub(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/national-clearance-hub?nuance=ivr")
    }
  }
}
