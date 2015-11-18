(function () {
  "use strict";
  var root = this,
      $ = root.jQuery;

  if (typeof LR === 'undefined') { root.LR = {}; }

  var printControls = {
    _defaultText: 'Print this page',

    init: function(elements) {
      elements.each(function(index, element) {
        var element = $(element);
        if (element.text() === '') {
          element.text(printControls._defaultText);
        }
        element
          .addClass('button-print')
          .on('click', function(e) {
            e.preventDefault();
            window.print();
          })
          .wrapInner('<a href="#"></a>');
      });
    }
  };

  root.LR.printControls = printControls;
}).call(this);
