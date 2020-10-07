
import * as dataLayerUpdater from './updateDatalayer'

export function observeStatus(el,w,d) {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(dataLayerUpdater.updateDataLayer(el,w,d));

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }

