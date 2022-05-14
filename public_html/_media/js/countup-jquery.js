// Dependency: CountUp.js: https://github.com/inorganik/CountUp.js

(function ($) {
  $.fn.countup = function (params) {
    // make sure dependency is present
    if (typeof CountUp !== 'function') {
      console.error('countUp.js is a required dependency of countUp-jquery.js.');
      return;
    }

    var defaults = {
        options: {
            startVal: 0,
            decimalPlaces: 0,
            duration: 2,
        },
        endVal: $(this).text()
    };

    if (typeof params === 'object') {
      $.extend(defaults.options, params);
    }

    this.each(function (i, elem) {
      var countUp = new CountUp(elem, defaults.endVal, defaults.options);
      countUp.start();
    });

    return this;
  };

}(jQuery));