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

package views.html.pages.templates

import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.UCIViews.JRSVariantOneTestView
import views.html.pages.ChatViewBehaviours

class GovukWrapperUCISpec extends ChatViewBehaviours {

  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[JRSVariantOneTestView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "GovukWrapperUCI" must {
    behave like generalContentUCI(
      createView,
      "Coronavirus Job Retention Scheme: chat",
      "This is a new service",
      "Is this page not working properly?",
      "Help from HMRC"
    )
  }
}