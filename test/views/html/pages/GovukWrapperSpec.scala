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

package views.html.pages

import config.AppConfig
import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.SelfAssessmentView

class GovukWrapperSpec extends ChatViewBehaviours {

  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[SelfAssessmentView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "GovukWrapper display the beta banner when toggle turned on" must {
    //val flag = frontendAppConfig.betaBannerMode == true
    val betaBannerMode: Boolean = frontendAppConfig.betaBannerMode
    val flag = betaBannerMode.equals(true)

    println(s"**********ChatViewBehaviours**********")
    println(s"betaBannerMode = $betaBannerMode")
    println(s"flag = $flag")
    println(s"*************************************")
    println(s"*************************************")

    behave like generalContent(
      createView,
      "Self Assessment: webchat",
      true,
      "This is a new service"
    )
  }

//  "GovukWrapper display the beta banner when toggle turned off" must {
//    behave like generalContent(
//      createView,
//      "Self Assessment: webchat",
//      false,
//      ""
//    )
//  }
}