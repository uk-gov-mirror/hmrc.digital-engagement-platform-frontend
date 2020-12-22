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

package views.html.pages.includes

import play.twirl.api.HtmlFormat
import views.html.UCIViews.JRSVariantOneTestView
import views.html.pages.ViewSpecBase

class sidebarLinksSpec extends ViewSpecBase {

  private val viewWithTemplate = app.injector.instanceOf[JRSVariantOneTestView]

  private def createView: () => HtmlFormat.Appendable = () => viewWithTemplate()(fakeRequest, messages)


  "behave like an include" when {
    "show the sidebar header" in {
      val doc = asDocument(createView())
      doc.getElementById("sidebar-header")
      assertContainsText(doc, "Help from HMRC")
    }

    "show the sidebar chatbot can paragraph" in {
      val doc = asDocument(createView())
      doc.getElementById("chatbot-can")
      assertContainsText(doc, "This chatbot can answer questions about the support " +
        "offered under the Coronavirus Job Retention Scheme.")
    }

    "show the sidebar chatbot cannot paragraph" in {
      val doc = asDocument(createView())
      doc.getElementById("chatbot-cannot")
      assertContainsText(doc, "If it cannot help you, it can transfer you to an " +
        "HMRC adviser if they're available.")
    }
  }
}