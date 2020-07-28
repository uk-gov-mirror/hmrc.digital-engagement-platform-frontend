//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
function gtmDl(d, w, el) {
  function parseData(string) {
    var properties = string.split(', ');
    var obj = {};
  }

  function observeStatus() {
    let elementToObserve = document.querySelector("#HMRC_Fixed_1");
    // let elementToObserve = document.querySelector("#HMRC_Fixed_1");
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(function() {
      setAvailability();

  function setAvailability() {
    var availability;
    var nuanceText = document.querySelector('#HMRC_Fixed_1 div span').innerHTML;
    var nuanceText = document.querySelector(el + 'div span').innerHTML;

    if (nuanceText === "Advisers are available to chat.") {
      availability = 'Ready';

  $(window).on("load", function () {
    waitForEl('#HMRC_Fixed_1 div span', function () {
    waitForEl(el + 'div span', function () {
      setAvailability();
      observeStatus();
    });
  });
})(document, window);
};

gtmDl(document, window, '#HMRC_Fixed_1');