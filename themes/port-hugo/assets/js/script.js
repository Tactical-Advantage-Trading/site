(function ($) {
  'use strict';

  /*--------------------------------
	 Start Smooth Scrolling
	----------------------------------*/
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

    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .on('click', function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') ==
            this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length
            ? target
            : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate(
              {
                scrollTop: getScrollTargetTop(target)
              },
              1000,
              'easeInOutExpo',
              function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(':focus')) {
                  // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                }
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
  // Applying Smooth Scroll When The Browser Is Not Opera Mini Or UC Browser
  if (
    navigator.userAgent.indexOf('Opera Mini') == -1 ||
    navigator.userAgent.indexOf('UCBrowser') != -1
  ) {
    smoothScroll();
  }
  /*--------------------------------
			End Smooth Scrolling
	----------------------------------*/

  /*--------------------------------
	Start Menu
	----------------------------------*/

  function setMenuTheme(useLightTheme) {
    $('.menu-container').toggleClass('menu-normal', useLightTheme);
    $('.menu-item').toggleClass('menu-item-transparent', useLightTheme);
    $('.desktop-menu .hvr-underline-from-left').toggleClass(
      'dark',
      useLightTheme
    );
  }

  // Styling Menu on Scroll
  if (window.location.pathname === '/') {
    function syncMenuTheme() {
      var $menu = $('.menu-container');
      var $firstContentSection = $('.about-me').first();

      if (!$menu.length || !$firstContentSection.length) {
        return;
      }

      var threshold = $firstContentSection.offset().top - $menu.outerHeight() - 1;
      var useLightTheme = $(window).scrollTop() >= threshold;

      setMenuTheme(useLightTheme);
    }

    $(window).on('load resize scroll', syncMenuTheme);
    syncMenuTheme();
  } else {
    // Changing Menu background after leaving Header Section
    setMenuTheme(true);
  }
  /*--------------------------------
			 End Menu
	----------------------------------*/

  $('#current-year').html(new Date().getFullYear());
})(jQuery);
