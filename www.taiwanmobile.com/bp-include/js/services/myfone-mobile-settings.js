/*
 * --------------------------------------------------------------------------
 * Taiwan Mobile Services: myfone mobile setting page (v20171101.1)
 * --------------------------------------------------------------------------
 */
/* global jQuery _ */
(function (window, $, _) {
  /*
   * Initial Product gallery.
   * @author bojia 2017/11
   * @version 1.0.0
   */
  function initialSlick() {
    $('.gallery-view-slick').slick({
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.gallery-thumb-slick'
    });
    $('.gallery-thumb-slick').slick({
      prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
      nextArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      focusOnSelect: true,
      asNavFor: '.gallery-view-slick'
    });
  }

  $(document).ready(function () {
    initialSlick();
  });
})(window, jQuery, _);