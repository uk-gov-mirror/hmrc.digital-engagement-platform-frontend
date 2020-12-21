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

package views.html.pages.UCIViews

import play.twirl.api.HtmlFormat
import views.html.pages.ChatViewBehaviours
import views.html.UCIViews.JRSVariantOneTestView

class JRSVariantOneTestViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[JRSVariantOneTestView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "JRS Variant One Test View" must {
    "rendered" must {
      "have the correct banner title" in {
        val doc = asDocument(createView())
        val nav = doc.getElementById("proposition-menu")
        val span = nav.children.first
        //TODO add title when dicided what it will be
        span.text mustBe messages("")
      }

      "display the correct browser title" in {
        val doc = asDocument(createView())
        assertEqualsMessage(doc, "title", s"Get help with the Coronavirus Job Retention Scheme - GOV.UK")
      }

      "display the correct page title" in {
        val doc = asDocument(createView())
        doc.getElementsByTag("h1")
        assertPageTitleEqualsMessage(doc, s"Coronavirus Job Retention Scheme: chat")
      }

//    behave like normalPage(
//      createView,
//      "Test full page UCI for webchat",
//      "Test full page UCI for webchat",
//      "",
//      "",
//      Nil,
//      Seq("nuanMessagingFrame")
//    )
    }
  }
}