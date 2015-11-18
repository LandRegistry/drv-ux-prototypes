$(function() {

  $('.case-list .summary td:first-child').wrapInner('<a href="#"></a>');
  $('.case-list .details').attr('aria-hidden', 'true');

  $('.case-list').on('click', '.summary', function(e) {
    e.preventDefault();
    var $el = $(this).next();
    var ariaVal = $el.attr('aria-hidden');
    if (ariaVal == 'true') {
      ariaVal = 'false';
    } else {
      ariaVal = 'true';
    }
    $el
      .toggleClass('js-hidden')
      .attr('aria-hidden', ariaVal);
  });
  
});