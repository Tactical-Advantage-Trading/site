(function ($) {
  'use strict';

  function smoothScroll() {
    function getScrollTargetTop($target) {
      var menuHeight = $('.menu-container').outerHeight() || 0;
      var targetPaddingTop = parseFloat($target.css('padding-top')) || 0;
      var visualGap = 18;

      return Math.max(
        $target.offset().top - menuHeight - targetPaddingTop - visualGap,
        0
      );
    }

    $('a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .on('click', function (event) {
        if (
          location.pathname.replace(/^\//, '') ==
            this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $('[name=' + this.hash.slice(1) + ']');

          if (target.length) {
            event.preventDefault();
            $('html, body').animate(
              {
                scrollTop: getScrollTargetTop(target)
              },
              1000,
              'easeInOutExpo',
              function () {
                var $target = $(target);
                $target.focus();

                if ($target.is(':focus')) {
                  return false;
                }

                $target.attr('tabindex', '-1');
                $target.focus();
              }
            );
          }
        }
      });

    jQuery.extend(jQuery.easing, {
      easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    });
  }

  if (
    navigator.userAgent.indexOf('Opera Mini') == -1 ||
    navigator.userAgent.indexOf('UCBrowser') != -1
  ) {
    smoothScroll();
  }

  function setMenuTheme(useSolidTheme) {
    $('.menu-container').toggleClass('menu-normal', useSolidTheme);
    $('.menu-item').toggleClass('menu-item-transparent', useSolidTheme);
    $('.desktop-menu .hvr-underline-from-left').toggleClass(
      'dark',
      useSolidTheme
    );
  }

  function initMenuTheme() {
    var $menu = $('.menu-container');
    var $hero = $('.header').first();
    var $firstContentSection = $('.about-me').first();

    if (!$menu.length) {
      return;
    }

    if (!$hero.length || !$firstContentSection.length) {
      setMenuTheme(true);
      return;
    }

    function syncMenuTheme() {
      var threshold = $firstContentSection.offset().top - $menu.outerHeight() - 1;
      var useSolidTheme = $(window).scrollTop() >= threshold;

      setMenuTheme(useSolidTheme);
    }

    $(window).on('load resize scroll', syncMenuTheme);
    syncMenuTheme();
  }

  initMenuTheme();

  $('#current-year').html(new Date().getFullYear());
})(jQuery);
