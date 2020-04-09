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

import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import config.AppConfig
import services.NuanceEncryptionService
import views.html._
import uk.gov.hmrc.play.bootstrap.controller.FrontendController

import scala.concurrent.Future

@Singleton
class IvrController @Inject()(appConfig: AppConfig,
                              mcc: MessagesControllerComponents,
                              selfAssessmentView: SelfAssessmentView,
                              taxCreditsView: TaxCreditsView,
                              childBenefitView: ChildBenefitView,
                              customsEnquiriesView: CustomsEnquiriesView,
                              employerEnquiriesView: EmployerEnquiriesView,
                              incomeTaxEnquiriesView: IncomeTaxEnquiriesView,
                              nationalInsuranceNumbersView: NationalInsuranceNumbersView,
                              onlineServiceHelpdeskView: OnlineServiceHelpdeskView,
                              vatEnquiriesView: VatEnquiriesView,
                              vatOnlineServiceHelpdeskView: VatOnlineServicesHelpdeskView,
                              charitiesCommunitySportsView: CharitiesCommunityAmateurSportsView,
                              employingExpatriateEmployeesView: EmployingExpatriateEmployeesView,
                              employmentRelatedSecuritiesView: EmploymentRelatedSecuritiesView,
                              nonUkResidentEmployeesView: NonUkResidentEmployeesView,
                              nonUkResidentLandlordsView: NonUkResidentLandlordsView,
                              corporationTaxEnquiriesView: CorporationTaxEnquiriesView,
                              constructionIndustrySchemeView: ConstructionIndustrySchemeView,
                              vatRegistrationView: VatRegistrationView,
                              nationalClearanceHubView: NationalClearanceHubView,
                              nuanceEncryptionService: NuanceEncryptionService) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  val param: String = "?nuance=ivr"

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.selfAssessment().url + param))
  }

  def taxCredits: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.taxCredits().url + param))
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.childBenefit().url + param))
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.employerEnquiries().url + param))
  }

  def vatEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.vatEnquiries().url + param))
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.onlineServicesHelpdesk().url + param))
  }

  def vatOnlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.vatOnlineServicesHelpdesk().url + param))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.nationalInsuranceNumbers().url + param))
  }

  def customsEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.customsEnquiries().url + param))
  }

  def incomeTaxEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.incomeTaxEnquiries().url + param))
  }

  def charitiesCommunitySports: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.charitiesCommunitySports().url + param))
  }

  def employingExpatriateEmployees: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.employingExpatriateEmployees().url + param))
  }

  def employmentRelatedSecurities: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.employmentRelatedSecurities().url + param))
  }

  def nonUkResidentEmployees: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.nonUkResidentEmployees().url + param))
  }

  def nonUkResidentLandlords: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.nonUkResidentLandlords().url + param))
  }

  def corporationTaxEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.corporationTaxEnquiries().url + param))
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.constructionIndustryScheme().url + param))
  }

  def vatRegistration: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.vatRegistration().url + param))
  }

  def nationalClearanceHub: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.WebchatController.nationalClearanceHub().url + param))
  }

  def paymentProblem: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Redirect(controllers.routes.PaymentProblemsController.paymentProblem().url + param))
  }

}
