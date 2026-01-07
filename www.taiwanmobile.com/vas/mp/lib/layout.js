// gotop
 $('.btnTop').click(function(){
    $('html,body').animate({scrollTop:0},300);return false;
});
// btn subsribe
$('.btnSubscribe').click(function(){
    $('html,body').animate({},300);return false;
});
// toast
$(document).on('click', '.btn-cart,.add-cart', function(event) {
    event.preventDefault();
    showToast.show('已加入購物車',2000)
});
// collapse fix
$(function(){
    $('.navbar-collapse').on('show.bs.collapse', function(e) {
        $('.navbar-collapse').not(this).collapse('hide');
    });
});

// var DW;
// // Document.Ready() _________________________________________________________________________
// $(function () {
//     // Windows Resize
//     resizeHandler();
//     $(window).on("resize", function () {
//         resizeHandler();
//     });
//     //leftRecord.list slimScroll
//     if ($('.side-recorded .side-container').length > 0) {
//         $('.side-recorded .side-container').slimScroll({
//             height: '300px',
//             width: '100%'
//         });
//     }

// });

function resizeHandler() {}


//function resizeHandler() {

    // DW = $(window).width();
    //$('nav .dropdown').removeClass('open');
    // menu 
    // if (DW >= 768) {
    //     $('nav .dropdown').on('mouseover', function () {
    //         $('nav .dropdown').removeClass('open');
    //         $(this).toggleClass('open');
    //     });

    //     $('nav .dropdown-menu,.nav .dropdown-menu a').on('mouseout', function () {
    //         $('nav .dropdown').removeClass('open');
    //     });
        
    //     // iPad Event
    //     $('nav .dropdown.active').on('touchend ', function () {            
    //         $(this).toggleClass('open');
    //     });

    //     $('nav .dropdown.active a').on('blur', function () {
    //         $('nav .dropdown.active').toggleClass('open');
    //     });


    // } else {        
    //     $('nav .dropdown.active a').on('touchend', function () {
    //         $('nav .dropdown.active').toggleClass('open');
    //     });
    //     $('nav .dropdown.active a').on('blur', function () {
    //         $('nav .dropdown.active').toggleClass('open');
    //     });
    // }
//}

// read more
$(".btn_more").on('click', function (e) {
    e.preventDefault();
    this.expand = !this.expand;
    $(this).text(this.expand?"\uE15B":"\uE145");
    // $(this).toggleClass(this.expand?'btn_clips':'btn_expand');
    $(this).closest('.book-info, .panel-body').find('.clips, .expand').toggleClass('clips expand');
    
});


// footer
$('.info_title').click(function() {
    if ($(window).width() <= 753) {
        var this_ = $(this);
        this_.parent().children('ul').toggle(500);
        if (this_.hasClass('info_title_open')) this_.removeClass('info_title_open').addClass('info_title_close');
        else
            this_.removeClass('info_title_close').addClass('info_title_open');
    }
});
$(window).resize(function() {
    if ($(window).width() >= 753) {
        $('.footer-info .info .info_list ul').show();
    } else {
        $('.footer-info .info .info_list .info_title').removeClass('info_title_close').addClass('info_title_open');
        $('.footer-info .info .info_list ul').hide();
    }
});





// video modal
var videoSrc1 = $("#top-vid-1 iframe").attr("src");

$('#top-vid-1').on('show.bs.modal', function () { // on opening the modal
  // set the video to autostart
  $("#top-vid-1 iframe").attr("src", videoSrc1+"?autoplay=1");
});

$("#top-vid-1").on('hidden.bs.modal', function (e) { // on closing the modal
  // stop the video
  $("#top-vid-1 iframe").attr("src", videoSrc1+"?autoplay=0");
});

var videoSrc2 = $("#mid-vid-1 iframe").attr("src");

$('#mid-vid-1').on('show.bs.modal',  function () { // on opening the modal
  // set the video to autostart
  $("#mid-vid-1 iframe").attr("src", videoSrc2+"?autoplay=1");
});

$("#mid-vid-1").on('hidden.bs.modal', function (e) { // on closing the modal
  // stop the video
  $("#mid-vid-1 iframe").attr("src", videoSrc2+"?autoplay=0");
});




