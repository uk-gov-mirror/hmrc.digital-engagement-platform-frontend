import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import {createDataLayerElement,reportEvent} from './addToDataLayer'
import {availabilities} from './getAvailability'

export function waitForCUI(w, d) {
  $(w).on("load", function () {
    return;
      var loadingAnimation = $('#cui-loading-animation')
      var messagingFrame = $('#nuanMessagingFrame')
      var messagingContainer = $('#cui-messaging-container')

      messagingContainer.fadeTo(0, 0.0);
      loadingAnimation.show();

      var el = '#nuanMessagingFrame';
      elementWatcher.waitForEl(el + ' #inqChatStage', function () {
        w.setTimeout(function() {
            messagingContainer.fadeTo(2000, 1.0);
            loadingAnimation.fadeTo(1500, 0.0);
        }, 2000);

        // TODO: Reinstate these, if it makes sense.
//        dataLayerUpdater.updateDataLayer(el,w,d);
//        statusObserver.observeStatus(el,w,d);
      },
      function() {
        loadingAnimation.hide();
        messagingContainer.fadeTo(0, 1.0);

        $(el).text('Chat is experiencing technical difficulties. Please keep refreshing the page to try again.')
        reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, el))
      });
  });
};

export function waitForChanges(w, d) {
  $(w).on("load", function () {
    if (w.location.pathname.includes("payment-problems")) {
      waitForNuanceElement('#pp_self_assessment_webchat',w,d);
      waitForNuanceElement('#pp_vat_webchat',w,d);
      waitForNuanceElement('#pp_paye_webchat',w,d);
      waitForNuanceElement('#pp_corporation_tax_webchat',w,d);
    } else {
      waitForNuanceElement('#HMRC_Fixed_1',w,d);
    }
  });
};

function waitForNuanceElement(el,w,d) {
  elementWatcher.waitForEl(el + ' div',
    function () {
      dataLayerUpdater.updateDataLayer(el,w,d);
      statusObserver.observeStatus(el,w,d);
    },
    function() {
      const assistantUsed = w.location.pathname.includes("virtual-assistant")
        ? "The digital assistant"
        : "Webchat";
      $(el).text(assistantUsed + ' is experiencing technical difficulties. Please keep refreshing the page to try again.')
      reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, el))
    }
  );
}
