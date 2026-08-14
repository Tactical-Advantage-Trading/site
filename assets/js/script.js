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

    if (!$menu.length) {
      return;
    }

    if (!$hero.length && !$('.claim-ecash-content-page').length) {
      setMenuTheme(true);
      return;
    }

    function syncMenuTheme() {
      var useSolidTheme = $(window).scrollTop() > 0;

      setMenuTheme(useSolidTheme);
    }

    $(window).on('load resize scroll', syncMenuTheme);
    syncMenuTheme();
  }

  initMenuTheme();

  function initSectionMenuState() {
    var $menu = $('#desktop-menu');
    var entries = [];
    var syncFrame = null;

    if (!$menu.length) {
      return;
    }

    $menu.find('a[href*="#"]').each(function () {
      var link = this;
      var url = new URL(link.href, window.location.href);
      var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      var linkPath = url.pathname.replace(/\/$/, '') || '/';
      var $target;

      if (
        url.origin !== window.location.origin ||
        linkPath !== currentPath ||
        !url.hash
      ) {
        return;
      }

      $target = $(url.hash);

      if (!$target.length) {
        return;
      }

      entries.push({
        $item: $(link).closest('.menu-item'),
        $link: $(link),
        $target: $target
      });
    });

    if (!entries.length) {
      return;
    }

    function setActiveEntry(activeEntry) {
      entries.forEach(function (entry) {
        var isActive = entry === activeEntry;

        entry.$item.toggleClass('active', isActive);

        if (isActive) {
          entry.$link.attr('aria-current', 'location');
        } else {
          entry.$link.removeAttr('aria-current');
        }
      });
    }

    function syncSectionMenuState() {
      var menuHeight = $('.menu-container').outerHeight() || 0;
      var scrollTop = $(window).scrollTop();
      var visualGap = 18;
      var activeEntry = null;

      if ($('html, body').is(':animated')) {
        return;
      }

      entries.forEach(function (entry) {
        var targetPaddingTop =
          parseFloat(entry.$target.css('padding-top')) || 0;
        var activationTop = Math.max(
          entry.$target.offset().top -
            menuHeight -
            targetPaddingTop -
            visualGap,
          0
        );

        if (scrollTop >= activationTop - 1) {
          activeEntry = entry;
        }
      });

      setActiveEntry(activeEntry);
    }

    entries.forEach(function (entry) {
      entry.$link.on('click', function () {
        setActiveEntry(entry);
      });
    });

    function queueSectionMenuSync() {
      if (syncFrame !== null) {
        window.cancelAnimationFrame(syncFrame);
      }

      syncFrame = window.requestAnimationFrame(function () {
        syncSectionMenuState();
        syncFrame = null;
      });
    }

    $(window).on('load resize scroll', queueSectionMenuSync);
    syncSectionMenuState();
  }

  initSectionMenuState();

  function initKeyWalletSideMenu() {
    var $sidebarWrap = $('.key-wallet-sidebar-wrap');
    var $sideMenu = $sidebarWrap.find('.key-wallet-side-menu');

    if (!$sidebarWrap.length || !$sideMenu.length) {
      return;
    }

    function syncKeyWalletSideMenu() {
      var isDesktop = window.matchMedia('(min-width: 992px)').matches;
      var menuHeight = $('.menu-container').outerHeight() || 55;
      var topOffset = menuHeight + 19;

      if (!isDesktop) {
        $sidebarWrap.removeClass('key-wallet-sidebar-floating');
        $sidebarWrap.css({
          minHeight: ''
        });
        $sideMenu.css({
          left: '',
          top: '',
          width: '',
          maxHeight: ''
        });
        return;
      }

      var sidebarTop = $sidebarWrap.offset().top;
      var sideMenuHeight = $sideMenu.outerHeight() || 0;
      var shouldFloat = $(window).scrollTop() + topOffset >= sidebarTop;
      var wrapPaddingLeft = parseFloat($sidebarWrap.css('padding-left')) || 0;
      var sidebarLeft = $sidebarWrap.offset().left + wrapPaddingLeft;
      var sidebarWidth = $sidebarWrap.width();

      $sidebarWrap.css({
        minHeight: sideMenuHeight
      });

      if (!shouldFloat) {
        $sidebarWrap.removeClass('key-wallet-sidebar-floating');
        return;
      }

      $sidebarWrap.addClass('key-wallet-sidebar-floating');
      $sidebarWrap[0].style.setProperty(
        '--key-wallet-side-menu-left',
        sidebarLeft + 'px'
      );
      $sidebarWrap[0].style.setProperty(
        '--key-wallet-side-menu-top',
        topOffset + 'px'
      );
      $sidebarWrap[0].style.setProperty(
        '--key-wallet-side-menu-width',
        sidebarWidth + 'px'
      );
    }

    $(window).on('load resize scroll', syncKeyWalletSideMenu);
    syncKeyWalletSideMenu();
  }

  initKeyWalletSideMenu();

  function initClaimStepGuides() {
    $('.claim-guide-section').each(function () {
      var $section = $(this);
      var $track = $section.find('[data-claim-step-track]').first();
      var $steps = $track.find('[data-claim-step]');
      var $buttons = $section.find('[data-claim-step-button]');
      var $mobileCopyDeck = $section.find('.claim-mobile-copy-deck').first();
      var $mobileCopies = $section.find('[data-claim-mobile-copy]');
      var scrollFrame = null;
      var scrollEndTimer = null;
      var programmaticIndex = null;
      var activeIndex = 0;

      if (!$track.length || !$steps.length || !$buttons.length) {
        return;
      }

      function syncMobileCopyDeckHeight(index) {
        var mobileCopy = $mobileCopies.get(index);

        if (!$mobileCopyDeck.length || !mobileCopy) {
          return;
        }

        if (!window.matchMedia('(max-width: 767px)').matches) {
          $mobileCopyDeck.removeClass('is-ready').css('height', '');
          return;
        }

        $mobileCopyDeck
          .css(
            'height',
            Math.ceil(mobileCopy.getBoundingClientRect().height + 2) + 'px'
          )
          .addClass('is-ready');
      }

      function setActiveStep(index) {
        if (index < 0 || index >= $steps.length) {
          return;
        }

        var activeStepChanged =
          index !== activeIndex ||
          !$mobileCopies.eq(index).hasClass('is-active');

        activeIndex = index;

        if (activeStepChanged) {
          $buttons.removeClass('is-active').attr('aria-current', 'false');
          $steps.removeClass('is-active');
          $mobileCopies.removeClass('is-active').attr('aria-hidden', 'true');

          $buttons.eq(index).addClass('is-active').attr('aria-current', 'step');
          $steps.eq(index).addClass('is-active');
          $mobileCopies
            .eq(index)
            .addClass('is-active')
            .attr('aria-hidden', 'false');
        }

        syncMobileCopyDeckHeight(index);
      }

      function scheduleProgrammaticScrollEnd() {
        window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(function () {
          programmaticIndex = null;
          syncActiveStep();
        }, 160);
      }

      function syncActiveStep() {
        var trackRect = $track[0].getBoundingClientRect();
        var closestIndex = -1;
        var largestVisibleWidth = -1;
        var visibilityTieTolerance = 1;

        $steps.each(function (index) {
          var stepRect = this.getBoundingClientRect();
          var visibleWidth = Math.max(
            0,
            Math.min(stepRect.right, trackRect.right) -
              Math.max(stepRect.left, trackRect.left)
          );

          if (
            closestIndex === -1 ||
            visibleWidth > largestVisibleWidth + visibilityTieTolerance ||
            (Math.abs(visibleWidth - largestVisibleWidth) <=
              visibilityTieTolerance &&
              index === activeIndex)
          ) {
            largestVisibleWidth = visibleWidth;
            closestIndex = index;
          }
        });

        setActiveStep(closestIndex);
      }

      function scrollToStep(index) {
        var target = $steps.get(index);
        var trackPaddingLeft =
          parseFloat(window.getComputedStyle($track[0]).paddingLeft) || 0;
        var reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        if (!target) {
          return;
        }

        programmaticIndex = index;
        setActiveStep(index);
        $track[0].scrollTo({
          left: Math.max(target.offsetLeft - trackPaddingLeft, 0),
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
        scheduleProgrammaticScrollEnd();
      }

      $buttons.on('click', function () {
        var index = $buttons.index(this);

        scrollToStep(index);
      });

      $steps.on('click', function (event) {
        var index = $steps.index(this);
        var selection = window.getSelection();

        if (
          $(event.target).closest('a, button, input, select, textarea').length ||
          (selection && selection.toString())
        ) {
          return;
        }

        scrollToStep(index);
      });

      $track.on('scroll', function () {
        if (programmaticIndex !== null) {
          scheduleProgrammaticScrollEnd();
          return;
        }

        if (scrollFrame !== null) {
          window.cancelAnimationFrame(scrollFrame);
        }

        scrollFrame = window.requestAnimationFrame(function () {
          syncActiveStep();
          scrollFrame = null;
        });
      });

      $(window).on('load resize', syncActiveStep);
      syncActiveStep();
    });
  }

  initClaimStepGuides();

  $('#current-year').html(new Date().getFullYear());
})(jQuery);
