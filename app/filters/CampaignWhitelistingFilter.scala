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

package filters

import akka.stream.Materializer
import com.google.inject.Inject
import config.AppConfig
import play.api.mvc.Results._
import play.api.mvc._
import uk.gov.hmrc.auth.otac.{OtacAuthConnector, OtacAuthorisationFunctions}
import uk.gov.hmrc.http.SessionKeys
import uk.gov.hmrc.play.HeaderCarrierConverter

import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

class CampaignWhitelistingFilter @Inject()(
                                            override val mat: Materializer,
                                            val authConnector: OtacAuthConnector,
                                            appConfig: AppConfig,
                                            mcc: MessagesControllerComponents) extends Filter with OtacAuthorisationFunctions{


  override def apply(f: RequestHeader => Future[Result])(rh: RequestHeader): Future[Result] = {

    implicit val ec: ExecutionContext = mcc.executionContext
    val messages = mcc.messagesApi.preferred(rh)

    if(appConfig.isCampaignWhitelistingEnabled && rh.path.contains(app.RoutesPrefix.prefix)){
      rh.session.get(SessionKeys.otacToken)
        .orElse(rh.queryString.get("p").flatMap(_.headOption))
        .orElse(rh.cookies.get("whitelisting").map(_.value))
        .map {
          token =>
            implicit val hc = HeaderCarrierConverter.fromHeadersAndSession(rh.headers, Some(rh.session))
            withVerifiedPasscode[Result]("digital-engagement-platform-frontend", Some(token)) {
              f(rh)
            }.recover {
              case NonFatal(_) =>
                Redirect(s"${appConfig.otacUrl}?p=$token")
                  .addingToSession(
                    SessionKeys.redirect -> s"${appConfig.loginContinueURL}?p=$token",
                    SessionKeys.otacToken -> token
                  )(rh)

            }
        }.getOrElse {
        Future.successful(NotFound(views.html.templates.not_found_template(
          messages("global.error.pageNotFound404.title"),
          messages("global.error.pageNotFound404.heading"),
          messages("global.error.pageNotFound404.message"),
          appConfig)(Request(rh, ""), messages)))
      }
    } else {
      f(rh)
    }
  }
}