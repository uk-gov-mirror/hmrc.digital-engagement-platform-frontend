import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'


function gtmDl(d, w, el) {
  $(window).on("load", function () {
    elementWatcher.waitForEl(el + ' div span', function () {
      dataLayerUpdater.updateDataLayer(el,w,d);

      statusObserver.observeStatus(el,w,d);
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');