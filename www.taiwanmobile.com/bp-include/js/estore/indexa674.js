/*
 * --------------------------------------------------------------------------
 * Taiwan Mobile eStore main (v20171017.1)
 * --------------------------------------------------------------------------
 */
/* global jQuery _ TWMeStore */
(function (window, $, _) {
  window.TWMeStore = function () {};

  $.extend(TWMeStore, {
    filterTypeToggler: function filterTypeToggler() {
      // 產品過濾搜尋：分類 / 關鍵字切換
      $('.filter-type-toggle').on('click', function (event) {
        event.preventDefault();
        // let targetGroup = $(event.currentTarget).data('toggleFilterSection')
        var $targetGroup = $('#' + $(event.currentTarget).data('toggleFilterSection'));
        $targetGroup.toggleClass('use-keyword');
      });
    },
    buildProductDOM: function buildProductDOM(dataArray) {
      if (!dataArray) $.error('Data cannot be null.');

      _.forEach(dataArray, function (data) {
        console.log(data);
      });
    },
    productInitial: function productInitial(options) {
      if (!options) {
        $.error('Option cannot be null.');
      }
      if (!options.el) {
        $.error('option.el cannot be null.');
      }
      console.log(options.el);
      console.log(this);
    },
    setProdictPosition: function (_setProdictPosition) {
      function setProdictPosition(_x) {
        return _setProdictPosition.apply(this, arguments);
      }

      setProdictPosition.toString = function () {
        return _setProdictPosition.toString();
      };

      return setProdictPosition;
    }(function (element) {
      setProdictPosition(element);
    }),
    initialPagePromoCarousel: function initialPagePromoCarousel() {
      $('.twm-carousel-page-promos').owlCarousel({
        items: 1,
        loop: true,
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
            mouseDrag: false,
            margin: 30,
            items: 2
          }
        }
      });
    }
  });

  function fomatePricing(value) {
    // console.log(value)
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function clearListParent(element, newChildren) {
    $(element).removeAttr('style').removeClass('init-complete').empty().append(newChildren);

    if (element === '#twm-estore-mobile-product') {
      setMobilePosition(element);
    }
  }

  function setMobilePosition(parentElement) {
    var $parentElement = $(parentElement);
    var parentWidth = $parentElement.outerWidth();
    var parentHeight = $parentElement.outerHeight();
    var parentOffset = $parentElement.offset();
    var childrenElement = $parentElement.find('.estore-product-item');
    // console.log(`Parent width: ${parentWidth}, height: ${parentHeight}`)

    $parentElement.css({
      width: parentWidth,
      height: parentHeight
    });

    _.forEach(childrenElement, function (child, index) {
      var $child = $(child);
      var childOffset = $child.offset();
      var newTop = childOffset.top - parentOffset.top;
      var newLeft = childOffset.left - parentOffset.left;
      var newWidth = $child.outerWidth();
      var newHeight = $child.outerHeight();
      // console.log(`child[${index}] top: ${newTop}, left: ${newLeft}`)

      $child.css({
        top: newTop,
        left: newLeft,
        width: newWidth,
        height: newHeight
      });
      // .removeClass('col-3 col-4')
    });

    $parentElement.addClass('init-complete');
  }

  /*
    * 組合手機列表 html dom
    * @dataArray = [
    *  {
    *    brand: '品牌名',
    *    name: '商品名',
    *    path: '商品圖片',
    *    price: 原廠售價,
    *    sales: 專案售價,
    *    link: '商品連結',
    *    stock: 1, => 0 = 售完, 1 = 銷售中
    *    hot: 1 => 熱銷/最新促銷
    *  }
    *  ...
    * ]
    * @return htmlCode => 組合完畢的列表
    */
  function combinationMobileDOM(dataArray, targetElement) {
    console.log('重組手機列表');
    var htmlCode = '';
    var dataLength = dataArray.length;
    var lastRowItems = dataLength >= 5 ? (dataLength - 3) % 4 : dataLength;
    var lastRowStartAt = dataLength - lastRowItems;
    // 組合新列表 html
    _.forEach(dataArray, function (data, index) {
      var colWidth = index <= 2 && dataArray.length >= 5 ? 'col-4' : 'col-3';
      htmlCode += '<div class="' + colWidth + ' estore-product-item estore-mobile-item';
      if (index >= lastRowStartAt) {
        htmlCode += ' lastrow';
      }
      htmlCode += '">\n        <div class="item-inner">';
      if (data.hot === 1) {
        htmlCode += '<div class="inPromo">' + '最新促銷' + '</div>';
      }
      htmlCode += '<figure class="mobile-image" style="background-image: url(' + data.path + ');"></figure>\n        <div class="mobile-text">\n          <div class="brand">' + data.brand + '</div>\n          <div class="product-name">' + data.name + '</div>\n        </div>\n        <div class="mobile-detail">\n          <div class="row align-items-center price">\n            <div class="col-5">\n              <span class="official-price">' + '原廠售價' + ' $' + fomatePricing(data.price) + '</span>\n            </div>\n            <div class="col-7">\n              <span class="special-offer"><i class="fa fa-check" aria-hidden="true"></i> ' + '專案特惠價' + '<span class="highlight">$' + fomatePricing(data.sales) + ' ' + '起' + '</span></span>\n            </div>\n          </div>\n          ';
      if (data.stock === 1) {
        htmlCode += '<div class="row saling align-items-center">\n          <div class="col text-center">\n            <a href="' + data.link + '" class="btn btn-brand-pinkOrange btn-block btn-capsule">' + '我要申辦' + '</a>\n          </div>\n        </div>';
      } else {
        htmlCode += '<div class="row buttons soldOut align-items-center">\n          <div class="col-12 text-center">\n            <a data-fancybox-arrival data-type="ajax" data-src="lb-arrival-notice.html" href="javascript:;" class="btn btn-brand-red btn-block btn-capsule" data-arrival-product="' + data.name + '">\u5546\u54C1\u71B1\u92B7\u5099\u8CA8\u4E2D\uFF0C\u5230\u8CA8\u8ACB\u901A\u77E5\u6211</a>\n          </div>\n          <div class="col-12 text-center">\n            <a href="' + data.link + '" class="more-info">' + '了解此機款更多資訊' + '</a>\n          </div>\n        </div>';
      }
      htmlCode += '</div>\n      </div>\n    </div>';
    });
    // 清除舊 html，並換上新 html
    clearListParent(targetElement, htmlCode);
  }

  function combinationAccessorieDOM(dataArray, targetElement) {
    console.log('重組配件列表');
    var htmlCode = '';
    // 組合新列表 html
    _.forEach(dataArray, function (data, index) {
      console.log(data);
      htmlCode += '<div class="col-3 estore-product-item estore-accessories-item">\n          <a href="' + data.link + '">\n            <div class="item-inner">';
      if (data.hot === 1) {
        htmlCode += '<div class="inPromo">' + '最新促銷' + '</div>';
      }
      htmlCode += '<figure class="product-image" style="background-image: url(' + data.path + ');"></figure>\n              <div class="product-text">\n                <div class="product-name">' + data.name + '</div>\n              </div>\n              <div class="product-detail">\n                <div class="row align-items-center price">\n                  <div class="col-12">';
      if (data.price !== null) {
        htmlCode += '<span class="official-price">$' + fomatePricing(data.price) + '</span>';
      } else {
        htmlCode += '<span class="official-price"></span>';
      }
      htmlCode += '</div>\n                  <div class="col-12">\n                    <span class="special-offer">$' + fomatePricing(data.sales) + '</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </a>\n        </div>';
    });
    // 清除舊 html，並換上新 html
    clearListParent(targetElement, htmlCode);
  }

  $(document).ready(function () {
    TWMeStore.filterTypeToggler();

    $('[data-fancybox-arrival]').fancybox({
      baseClass: 'twm-fancybox-estore-arrival',
      touch: false,
      autoFocus: false
    });

    setMobilePosition('#twm-estore-mobile-product'); // 初始化商品列表

    // 特色挑選
    $('.twm-estore-mobile-product-tag a.dropdown-item').on('click', function (e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var newText = _this.text();
      _this.parents('.dropdown').find('.dropdown-toggle .tag-text').text(newText);

      // 執行 api
      $.ajax({
        url: '#',
        method: 'GET',
        success: function success(data) {
          // Combination DOM with new data
        }
      }).done(function (data) {
        var dataArray = [{ brand: 'Apple', name: '（5.5 吋）iPhone 7 Plus<br>256GB - 銀', path: '../img/demo-img/estore/i7_g01.jpg', price: 1500, sales: 500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Asus', name: 'ZenFone 3 Max（ZC553KL）<br>32GB - 銀', path: '../img/demo-img/estore/ZenFone-3_MOONLIGHT-WHITE.jpg', price: 1500, sales: 1000, link: 'detail.html', stock: 1 }, { brand: 'OPPO', name: 'A39 - 玫瑰金', path: '../img/demo-img/estore/r9s_g1.jpg', price: 10500, sales: 600, link: 'detail.html', stock: 0 }, { brand: 'Asus', name: 'ZenFone 3 Deluxe<br>（ZS570KL）32GB - 銀', path: '../img/demo-img/estore/10-evo_b1.jpg', price: 1500, sales: 750, link: 'detail.html', stock: 0 }];
        combinationMobileDOM(dataArray, '#twm-estore-mobile-product'); // 執行重組手機商品(#twm-estore-mobile-product) 列表
      });
    });

    // 顯示更多商品
    $('[data-load-more]').on('click', function (e) {
      e.preventDefault();

      var _this = $(e.currentTarget);
      var target = _this.data('loadMore');
      console.log(target);

      // 手機商品載入更多
      if (target === '#twm-estore-mobile-product') {
        console.log('載入更多手機商品');
        $.ajax({
          url: '#',
          method: 'GET',
          success: function success(data) {
            // Combination DOM with new data
          }
        }).done(function (data) {
          var dataArray = [{ brand: 'Apple', name: '（5.5 吋）iPhone 7 Plus<br>256GB - 銀', path: '../img/demo-img/estore/i7_g01.jpg', price: 1500, sales: 500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Asus', name: 'ZenFone 3 Max（ZC553KL）<br>32GB - 銀', path: '../img/demo-img/estore/ZenFone-3_MOONLIGHT-WHITE.jpg', price: 1500, sales: 1000, link: 'detail.html', stock: 1 }, { brand: 'OPPO', name: 'A39 - 玫瑰金', path: '../img/demo-img/estore/r9s_g1.jpg', price: 10500, sales: 600, link: 'detail.html', stock: 0 }, { brand: 'Asus', name: 'ZenFone 3 Deluxe<br>（ZS570KL）32GB - 銀', path: '../img/demo-img/estore/10-evo_b1.jpg', price: 1500, sales: 750, link: 'detail.html', stock: 0 }, { brand: 'Apple', name: 'iPhone 6s 128GB -<br>金（4.7吋）', path: '../img/demo-img/estore/s7edge_gold1.jpg', price: 1500, sales: 4800, link: 'detail.html', stock: 1 }, { brand: 'HTC', name: '手機名稱', path: '../img/demo-img/estore/2.png', price: 10500, sales: 2500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Apple', name: '（5.5 吋）iPhone 7 Plus<br>256GB - 銀', path: '../img/demo-img/estore/i7_g01.jpg', price: 1500, sales: 500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Asus', name: 'ZenFone 3 Max（ZC553KL）<br>32GB - 銀', path: '../img/demo-img/estore/ZenFone-3_MOONLIGHT-WHITE.jpg', price: 1500, sales: 1000, link: 'detail.html', stock: 1 }, { brand: 'OPPO', name: 'A39 - 玫瑰金', path: '../img/demo-img/estore/r9s_g1.jpg', price: 10500, sales: 600, link: 'detail.html', stock: 0 }, { brand: 'Asus', name: 'ZenFone 3 Deluxe<br>（ZS570KL）32GB - 銀', path: '../img/demo-img/estore/10-evo_b1.jpg', price: 1500, sales: 750, link: 'detail.html', stock: 0 }, { brand: 'Apple', name: 'iPhone 6s 128GB -<br>金（4.7吋）', path: '../img/demo-img/estore/s7edge_gold1.jpg', price: 1500, sales: 4800, link: 'detail.html', stock: 1 }, { brand: 'HTC', name: '手機名稱', path: '../img/demo-img/estore/2.png', price: 10500, sales: 2500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Apple', name: '（5.5 吋）iPhone 7 Plus<br>256GB - 銀', path: '../img/demo-img/estore/i7_g01.jpg', price: 1500, sales: 500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Asus', name: 'ZenFone 3 Max（ZC553KL）<br>32GB - 銀', path: '../img/demo-img/estore/ZenFone-3_MOONLIGHT-WHITE.jpg', price: 1500, sales: 1000, link: 'detail.html', stock: 1 }, { brand: 'OPPO', name: 'A39 - 玫瑰金', path: '../img/demo-img/estore/r9s_g1.jpg', price: 10500, sales: 600, link: 'detail.html', stock: 0 }, { brand: 'Asus', name: 'ZenFone 3 Deluxe<br>（ZS570KL）32GB - 銀', path: '../img/demo-img/estore/10-evo_b1.jpg', price: 1500, sales: 750, link: 'detail.html', stock: 0 }, { brand: 'Apple', name: 'iPhone 6s 128GB -<br>金（4.7吋）', path: '../img/demo-img/estore/s7edge_gold1.jpg', price: 1500, sales: 4800, link: 'detail.html', stock: 1 }, { brand: 'HTC', name: '手機名稱', path: '../img/demo-img/estore/2.png', price: 10500, sales: 2500, link: 'detail.html', stock: 1, hot: 1 }, { brand: 'Apple', name: '（5.5 吋）iPhone 7 Plus<br>256GB - 銀', path: '../img/demo-img/estore/i7_g01.jpg', price: 1500, sales: 500, link: 'detail.html', stock: 1, hot: 1 }];
          combinationMobileDOM(dataArray, target); // 執行重組手機商品(#twm-estore-mobile-product) 列表
        });
      }
      if (target === '#twm-estore-accessories-product') {
        console.log('載入更多配件商品');
        $.ajax({
          url: '#',
          method: 'GET',
          success: function success(data) {
            // Combination DOM with new data
          }
        }).done(function (data) {
          var dataArray = [{ name: '愛迪達特製保護殼', path: '../img/demo-img/estore/accessories-1.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone電源保護殼', path: '../img/demo-img/estore/accessories-2.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7+鋼化保護殼含立架', path: '../img/demo-img/estore/accessories-3.png', price: null, sales: 1100, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7 鋼化玻璃保護殼', path: '../img/demo-img/estore/accessories-4.png', price: 1400, sales: 1290, link: 'detail-accessories.html', hot: 0 }, { name: '大金剛玻璃保護貼', path: '../img/demo-img/estore/accessories-5.png', price: 1100, sales: 990, link: 'detail-accessories.html', hot: 0 }, { name: '動物方程式可愛保護殼兩組一入', path: '../img/demo-img/estore/accessories-6.png', price: 1400, sales: 1200, link: 'detail-accessories.html', hot: 1 }, { name: '寶可夢水晶保護殼', path: '../img/demo-img/estore/accessories-7.png', price: 890, sales: 800, link: 'detail-accessories.html', hot: 1 }, { name: 'i7殼套+傳輸線組', path: '../img/demo-img/estore/accessories-8.png', price: 3200, sales: 3000, link: 'detail-accessories.html', hot: 1 }, { name: '愛迪達特製保護殼', path: '../img/demo-img/estore/accessories-1.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone電源保護殼', path: '../img/demo-img/estore/accessories-2.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone 7+鋼化保護殼含立架', path: '../img/demo-img/estore/accessories-3.png', price: null, sales: 1100, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone 7 鋼化玻璃保護殼', path: '../img/demo-img/estore/accessories-4.png', price: 1400, sales: 1290, link: 'detail-accessories.html', hot: 1 }, { name: '大金剛玻璃保護貼', path: '../img/demo-img/estore/accessories-5.png', price: 1100, sales: 990, link: 'detail-accessories.html', hot: 0 }, { name: '動物方程式可愛保護殼兩組一入', path: '../img/demo-img/estore/accessories-6.png', price: 1400, sales: 1200, link: 'detail-accessories.html', hot: 1 }, { name: '寶可夢水晶保護殼', path: '../img/demo-img/estore/accessories-7.png', price: 890, sales: 800, link: 'detail-accessories.html', hot: 0 }, { name: 'i7殼套+傳輸線組', path: '../img/demo-img/estore/accessories-8.png', price: 3200, sales: 3000, link: 'detail-accessories.html', hot: 0 }, { name: '愛迪達特製保護殼', path: '../img/demo-img/estore/accessories-1.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone電源保護殼', path: '../img/demo-img/estore/accessories-2.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone 7+鋼化保護殼含立架', path: '../img/demo-img/estore/accessories-3.png', price: null, sales: 1100, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7 鋼化玻璃保護殼', path: '../img/demo-img/estore/accessories-4.png', price: 1400, sales: 1290, link: 'detail-accessories.html', hot: 1 }, { name: '大金剛玻璃保護貼', path: '../img/demo-img/estore/accessories-5.png', price: 1100, sales: 990, link: 'detail-accessories.html', hot: 0 }, { name: '動物方程式可愛保護殼兩組一入', path: '../img/demo-img/estore/accessories-6.png', price: 1400, sales: 1200, link: 'detail-accessories.html', hot: 0 }, { name: '寶可夢水晶保護殼', path: '../img/demo-img/estore/accessories-7.png', price: 890, sales: 800, link: 'detail-accessories.html', hot: 0 }, { name: 'i7殼套+傳輸線組', path: '../img/demo-img/estore/accessories-8.png', price: 3200, sales: 3000, link: 'detail-accessories.html', hot: 0 }];
          combinationAccessorieDOM(dataArray, target); // 執行重組配件商品(#twm-estore-accessories-product) 列表
        });
      }
    });

    // 排序商品
    $('[data-sort-product]').on('click', function (e) {
      e.preventDefault();

      var _this = $(e.currentTarget);
      var target = _this.data('sortProduct');

      if (target === '#twm-estore-accessories-product') {
        console.log('配件商品排序');
        $.ajax({
          url: '#',
          method: 'GET',
          success: function success(data) {
            // Combination DOM with new data
          }
        }).done(function (data) {
          var dataArray = [{ name: 'i7殼套+傳輸線組', path: '../img/demo-img/estore/accessories-8.png', price: 3200, sales: 3000, link: 'detail-accessories.html', hot: 1 }, { name: 'i7殼套+傳輸線組', path: '../img/demo-img/estore/accessories-8.png', price: 3200, sales: 3000, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone電源保護殼', path: '../img/demo-img/estore/accessories-2.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone電源保護殼', path: '../img/demo-img/estore/accessories-2.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7 鋼化玻璃保護殼', path: '../img/demo-img/estore/accessories-4.png', price: 1400, sales: 1290, link: 'detail-accessories.html', hot: 0 }, { name: 'iPhone 7 鋼化玻璃保護殼', path: '../img/demo-img/estore/accessories-4.png', price: 1400, sales: 1290, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7+鋼化保護殼含立架', path: '../img/demo-img/estore/accessories-3.png', price: null, sales: 1100, link: 'detail-accessories.html', hot: 1 }, { name: 'iPhone 7+鋼化保護殼含立架', path: '../img/demo-img/estore/accessories-3.png', price: null, sales: 1100, link: 'detail-accessories.html', hot: 1 }, { name: '大金剛玻璃保護貼', path: '../img/demo-img/estore/accessories-5.png', price: 1100, sales: 990, link: 'detail-accessories.html', hot: 0 }, { name: '大金剛玻璃保護貼', path: '../img/demo-img/estore/accessories-5.png', price: 1100, sales: 990, link: 'detail-accessories.html', hot: 0 }, { name: '動物方程式可愛保護殼兩組一入', path: '../img/demo-img/estore/accessories-6.png', price: 1400, sales: 1200, link: 'detail-accessories.html', hot: 1 }, { name: '動物方程式可愛保護殼兩組一入', path: '../img/demo-img/estore/accessories-6.png', price: 1400, sales: 1200, link: 'detail-accessories.html', hot: 1 }, { name: '愛迪達特製保護殼', path: '../img/demo-img/estore/accessories-1.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 1 }, { name: '愛迪達特製保護殼', path: '../img/demo-img/estore/accessories-1.png', price: 1200, sales: 900, link: 'detail-accessories.html', hot: 0 }, { name: '寶可夢水晶保護殼', path: '../img/demo-img/estore/accessories-7.png', price: 890, sales: 800, link: 'detail-accessories.html', hot: 1 }, { name: '寶可夢水晶保護殼', path: '../img/demo-img/estore/accessories-7.png', price: 890, sales: 800, link: 'detail-accessories.html', hot: 0 }];
          combinationAccessorieDOM(dataArray, target); // 執行重組配件商品(#twm-estore-accessories-product) 列表
        });
      }
    });
  });
})(window, jQuery, _);