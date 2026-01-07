/*
 * --------------------------------------------------------------------------
 * Taiwan Mobile Products main (v20171012.1)
 * --------------------------------------------------------------------------
 */
/* global $ Waypoint */
(function (window, $) {
  window.initialPagePromoCarousel = function () {
    $('.twm-carousel-page-promos').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      lazyLoad: true,
      navText: ['<span class="owl-nav-icon owl-nav-icon-prev"></span>', '<span class="owl-nav-icon owl-nav-icon-next"></span>'],
      smartSpeed: 800,
      autoHeight: true,
      autoHeightClass: 'owl-height',
      autoplay: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 800,
      autoplayHoverPause: true,
      responsive: {
        768: {
          mouseDrag: false,
          margin: 30,
          items: 2
        }
      },
      onInitialize: function onInitialize() {
        // console.log('carousel onInit')
      }
    });
  };

  window.initialPagePromoBannerCarousel = function () {
    $('.twm-carousel-page-promos-banner').owlCarousel({
      items: 1,
      //loop: true,
      dots: true,
      nav: false,
      lazyLoad: true,
      // navText: ['<span class="owl-nav-icon owl-nav-icon-prev"></span>', '<span class="owl-nav-icon owl-nav-icon-next"></span>'],
      smartSpeed: 800,
      autoHeight: true,
      autoHeightClass: 'owl-height',
      autoplay: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 800,
      autoplayHoverPause: true,
      responsive: {
        768: {
          mouseDrag: false
        }
      },
      onInitialize: function onInitialize() {
        // console.log('carousel onInit')
      }
    });
  };

  var appsCarousel = null;
  function initAppCarousel() {
    appsCarousel = $('.tab-pane.active .twm-carousel-apps').owlCarousel({
      items: 1,
      // loop: true,
      center: false,
      dots: false,
      nav: true,
      navText: ['<span class="owl-nav-icon owl-nav-icon-prev"></span>', '<span class="owl-nav-icon owl-nav-icon-next"></span>'],
      smartSpeed: 800,
      autoHeight: true,
      autoHeightClass: 'owl-height',
      autoplay: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 800,
      autoplayHoverPause: true,
      responsive: {
        768: {
          dots: false,
          nav: true,
          mouseDrag: false,
          items: 4
        }
        // onInitialized: function (event) {
        //   var _this = this
        //   var items = event.item.count
        //   var windowWidth = $(window).width()
        //   // var size = event.page.size
        //   console.log(windowWidth)
        //   console.log(_this)
        //   // console.log(size)
        //   if (windowWidth >= 768 && items < 4) {
        //     _this.options.center = true
        //     console.log(_this)
        //     setTimeout(function () {
        //       _this.trigger('resize.owl.carousel')
        //     }, 300)
        //   }
        // }
      } });
  }

  $(document).ready(function () {
    if ($('.twm-pa-apps-content').length > 0) {
      initAppCarousel();

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        initAppCarousel();
      });

      $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
        appsCarousel.trigger('destroy.owl.carousel');
      });
    }

    if ($('.twm-page-section-nav').length > 0) {
      var stickySectionNav = new Waypoint.Sticky({
        element: $('.twm-page-section-nav').first()
      });
    }

    $('.twm-ps-products-menu:not(.twm-ps-section-anchor)').on('click', 'a', function (event) {
      event.preventDefault();

      console.log($(this));

      var $this = $(this);
      var elements = $('.twm-ps-products');

      var target = $this.data('target');

      $this.parents('.twm-ps-products-menu').find('.active').removeClass('active');
      $this.parent().addClass('active');

      if (target !== '*') {
        elements.not(target).hide('fast');
        elements.siblings(target).show('fast');
      } else {
        elements.show('fast');
      }
    });

    $('.twm-ps-products-nav').first().on('shown.bs.dropdown', function () {
      var $this = $(this);
      var $target = $this.find('.dropdown-menu');
      var $block = $this.find('.twm-ps-products-menu-block');

      var hasInput = $target.find('input');
      // $('html').addClass('noScroll')
      // $('.twm-page-section-group').append($('<div />', {
      $('.twm-wrapper').append($('<div />', {
        id: 'twm-page-section-group-overlay',
        class: 'twm-page-section-group-overlay'
      }));

      if (hasInput.length > 0) {
        $(hasInput).focus();
      }
    });

    $('.twm-ps-products-nav').on('hidden.bs.dropdown', function () {
      $('#twm-page-section-group-overlay').remove();
    });

    $('body').scrollspy({
      target: '#twm-ps-products-section-nav',
      offset: window.innerWidth >= 768 ? 235 : 118
    });

    // 1-4-1 travel more switch
    $('#morePlanBox').hide();
    $('#btn_morePlan').click(function () {
      if ($('#morePlanBox').css('display') === 'none') {
        $('#morePlanBox').slideDown();
      } else {
        $('#morePlanBox').slideUp();
      }
    });

    // 1-3-1 tab
    $('.internet-G.4G').click(function () {
      $('.internet-G').removeClass('active');
      $(this).addClass('active');
      $('#3Gblock').hide();
      $('#4Gblock').fadeIn();
    });
    $('.internet-G.3G').click(function () {
      $('.internet-G').removeClass('active');
      $(this).addClass('active');
      $('#4Gblock').hide();
      $('#3Gblock').fadeIn();
    });
  });
})(window, $);