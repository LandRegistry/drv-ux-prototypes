$(function() {

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Set up any "print this page" links
  var $printLinks = $('.print-page');
  new LR.printControls.init($printLinks);

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Details/summary polyfill
  // See /js/vendor/polyfills/details.polyfill.js

  if ($('.js-stick-at-top-when-scrolling').length > 0) {
    GOVUK.stickAtTopWhenScrolling.init();
    GOVUK.stopScrollingAtFooter.addEl($('.js-stick-at-top-when-scrolling'), $('.js-stick-at-top-when-scrolling').height());
  }

});
