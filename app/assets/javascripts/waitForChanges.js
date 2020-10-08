import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'


export function waitForChanges(d, w) {
  $(window).on("load", function () {
    if (window.location.pathname.includes("payment-problems")) {
      elementWatcher.waitForEl('#pp_self_assessment_webchat' + ' div span', function () {
        dataLayerUpdater.updateDataLayer('#pp_self_assessment_webchat',w,d);
  
        statusObserver.observeStatus('#pp_self_assessment_webchat',w,d);
      });

      elementWatcher.waitForEl('#pp_vat_webchat' + ' div span', function () {
        dataLayerUpdater.updateDataLayer('#pp_vat_webchat',w,d);
  
        statusObserver.observeStatus('#pp_vat_webchat',w,d);
      });

      elementWatcher.waitForEl('#pp_paye_webchat' + ' div span', function () {
        dataLayerUpdater.updateDataLayer('#pp_paye_webchat',w,d);
  
        statusObserver.observeStatus('#pp_paye_webchat',w,d);
      });

      elementWatcher.waitForEl('#pp_corporation_tax_webchat' + ' div span', function () {
        dataLayerUpdater.updateDataLayer('#pp_corporation_tax_webchat',w,d);
  
        statusObserver.observeStatus('#pp_corporation_tax_webchat',w,d);
      });

    } else {
      elementWatcher.waitForEl('#HMRC_Fixed_1' + ' div span', function () {
        dataLayerUpdater.updateDataLayer('#HMRC_Fixed_1',w,d);
  
        statusObserver.observeStatus('#HMRC_Fixed_1',w,d);
      });
    }
  });
};