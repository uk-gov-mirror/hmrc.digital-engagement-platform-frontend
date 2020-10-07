import * as availabilityChecker from './getAvailability'

export function observeStatus(callback) {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(callback());

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }