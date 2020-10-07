export function observeStatus(callback, el) {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(callback);

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }