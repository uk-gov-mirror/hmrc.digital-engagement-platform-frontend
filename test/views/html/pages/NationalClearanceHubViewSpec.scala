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

import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.NationalClearanceHubView

class NationalClearanceHubViewSpec extends ChatViewBehaviours {
  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[NationalClearanceHubView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  //TODO add correct return url
    "Non Uk Resident Employees view" must {
      val returnUrl: String =
        "NATIONAL_CLEARANCE_HUB_RETURN_URL"

      //TODO add correct content
      behave like normalPage(
        createView,
        "National clearance hub: webchat",
        "National clearance hub: webchat",
        "Return to Contact HMRC",
        returnUrl,
        "Opening times:",
        "Monday to Friday, 8am to 4pm"
      )
    }
}