var sliders = new Array();

$(window).scroll(function() {
  if ($(document).scrollTop() < $(window).height()) {
    $('nav').removeClass('shrink').css("background", "rgba(255,255,255,0.9)");
  } else {
    $('nav').addClass('shrink').css("background", "rgba(255,255,255,1)");
  }
});

jQuery(document).ready(function () {
  jQuery.waitForImages.hasImgProperties = ['background','backgroundImage'];
    jQuery('body').waitForImages(function() {
        jQuery(".page-mask").delay(1200).fadeOut('slow');
        jQuery('body').css('overflowY','auto');
    });

/*-------------------------------------------------*/
/* =  Static Heights on Portrait and Home Slider
/*-------------------------------------------------*/

    var heights = $(".frame").map(function() {
        return $(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    $(".frame").height(maxHeight);
    $(".frameh").height($(window).height());


/*-------------------------------------------------*/
/* =  Animated content
/*-------------------------------------------------*/

    wow = new WOW(
        {
            animateClass: 'animated',
            offset:       100
        }
    );

    wow.init();

/*==========================*/
/* Sticky Navigation
/*==========================*/
$(".nav a[href^='#']").on('click', function(e) {
   // prevent default anchor click behavior
   e.preventDefault();
   // store hash
   var hash = this.hash;
   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 1200, function(){
       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});
$(".nav a").on("click", function(){
   $(".nav").children(".active").removeClass("active");
   $(".nav").children(".current").removeClass("current");
});
    jQuery("#navigation").sticky({topSpacing:0});
    $("body").scrollspy({ target: "#navigation" });



/* ==============================================
/* Drop Down Menu Fade Effect
/*=============================================== */

    $('.nav-toggle').hover(function() {
        'use strict';
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
        }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(250)
     });



/*==========================*/
/* Navigation Scrolling
/*==========================*/



    var navigationHeight = jQuery("#navigation").outerHeight();

    jQuery('.align-center a, .caption-inside a, .top-logo a').click(function(){
        jQuery('html, body').animate({
            scrollTop: jQuery( $.attr(this, 'href') ).offset().top - navigationHeight + 44
        }, 800, 'easeInQuad');

        /* Fix jumping of navigation. */
        setTimeout(function() {
            jQuery(window).trigger('scroll');
        }, 900);

        return false;
    });

/*----------------------------------------------------*/
/*  Parallax section
/*----------------------------------------------------*/
    //Calculating page width
    pageWidth = jQuery(window).width();

    //Parallax
    jQuery(window).bind('load', function () {
        if(pageWidth > 980) {
            parallaxInit();
        }
    });

    function parallaxInit() {

        jQuery('.product-wrap').parallax("30%", 0.1);
        jQuery('.subscription-wrap').parallax("30%", 0.1);

    }

/*----------------------------------------------------*/
/*  Scroll To Top Section
/*----------------------------------------------------*/
    jQuery(document).ready(function () {

        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.scrollup').fadeIn();
            } else {
                jQuery('.scrollup').fadeOut();
            }
        });

        jQuery('.scrollup').click(function () {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

    });



/*----------------------------------------------------*/
/*  PrettyPhoto
/*----------------------------------------------------*/

    jQuery(function(){
        jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
              opacity: 0.5,
              social_tools: "",
              deeplinking: false
        });

        jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
    });

    jQuery("#horizontal-tabs").tytabs({
        tabinit: "1",
        fadespeed: "fast"
    });


/*----------------------------------------------------*/
/*  Carousel Section
/*----------------------------------------------------*/


    jQuery('.testimonials-carousel').carousel({interval: false, wrap: false});
    jQuery('.testimonials-carousel-widget').carousel({interval: 5000, pause: "hover"});

});


/*----------------------------------------------------*/
/*  BxSlider
/* -preIndex, curIndex and futIndex are the index of the slides that identifies categories Previous  and Future on bxSlider5
    these must be consistent with the HTML layout of the slides*/
/*----------------------------------------------------*/


jQuery(document).ready(function(){
    var onMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }
    var preIndex= 2,
        curIndex= 3,
        futIndex= 4;


    jQuery('.bxslider').bxSlider({
      slideWidth: 300,
      slideMargin: 95,
      minSlides: 3,
      maxSlides: 3,
      moveSlides: 2,
      captions:true,
      autoHover: true,
      controls:false,
      infiniteLoop: false
    });

    jQuery('.bxslider2').bxSlider({
      auto:true,
      autoDirection: 'prev',
      controls:false,
      pager: false,
      speed:100,
      infiniteLoop: true,
      easing: 'ease-in-out'
    });

    jQuery('.bxslider3').bxSlider({
      auto:true,
      autoDirection: 'next',
      controls:false,
      pager: false,
      speed:100,
      infiniteLoop: true,
      easing: 'ease-in-out'

    });

    $('.bxslider5').each(function(i, slider) {
        sliders[i] = $(slider).bxSlider({
          autoHover: true,
          infiniteLoop: false,
          mode: 'fade',
          pager: false,
          slideSelector: '.slide',
          nextText: '<i class="fa fa-angle-right"></i>',
          prevText: '<i class="fa fa-angle-left"></i>'/*until here, */
        });
    });



    jQuery('.bx-wrapper .bx-controls-direction a').attr('data-500','top:83%; opacity: 0;').attr('data-start','top:50%; opacity: 1;');


    if( onMobile === false )  {

        skrollr.init({
            edgeStrategy: 'set',
            smoothScrolling: false,
            forceHeight: false
        });

    }


    jQuery('.text-slide').bxSlider({
        controls: false,
        adaptiveHeight: true,
        pager: false,
        auto:true,
        mode:'fade',
        pause: 3000,
    });


});

/*----------------------------------------------------*/
/*  Portfolio Close Button
/*----------------------------------------------------*/

$('.portfolio-close').on('click', function() {
        $('#filters a').removeClass('active');
        $('#portfolio-wrap').hide(500);
        jQuery("html, body").animate({
            scrollTop: 1520
        }, 600);
        return false;
});
/*----------------------------------------------------*/
/*  Portfolio Isotope
/*----------------------------------------------------*/
    jQuery(document).ready(function(){

        // Portfolio
        (function($) {
            "use strict";
            var $container = $('#portfolio-wrap');

            function refreshWaypoints() {
                setTimeout(function() {
                }, 1);
            }

            function getColumnNumber() {
                var winWidth = $(window).width(),
                    columnNumber = 1;

                if (winWidth > 1200) {
                    columnNumber = 4;
                } else if (winWidth > 950) {
                    columnNumber = 3;
                } else if (winWidth > 600) {
                    columnNumber = 3;
                } else if (winWidth > 400) {
                    columnNumber = 3;
                } else if (winWidth > 250) {
                    columnNumber = 2;
                }
                    return columnNumber;
            }

            function setColumns() {
                var winWidth = $(window).width()-$(window).width()*0.33333333-200,
                    columnNumber = getColumnNumber(),
                    itemWidth = Math.floor(winWidth / columnNumber);

                $container.find('.one-four').each(function() {
                    $(this).css( {
                      width : itemWidth + 'px',
                      height: itemWidth + 'px'
                    });
                });
            }

            function setPortfolio() {
                setColumns();
                $container.isotope('layout');
            }

            $container.imagesLoaded(function () {
                setPortfolio();
            });

            $(window).on('resize', function () {
                setPortfolio();
            });

            $('#filters a').on('click', function() {
                    $('#portfolio-wrap').show();
                    jQuery("html, body").animate({
                        scrollTop: 1450
                    }, 600);
                    var selector = $(this).attr('data-filter');
                    $container.isotope({ filter: selector }, refreshWaypoints());
                    if (selector == '.pr') {
                      sliders[0].reloadSlider();
                    } else if ( selector == '.cu'){
                      sliders[1].reloadSlider();
                    }
                    $('#filters a').removeClass('active');
                    $(this).addClass('active');

                    setPortfolio();
                    return false;
            });

            $container.isotope({
                animationEngine: 'best-available',
                layoutMode: 'masonry',
                animationOptions: {
                  duration: 75000,
                  easing: 'linear',
                  queue: false
                },
                masonry: {
                }
            }, refreshWaypoints());
        })(jQuery);

    });


/*----------------------------------------------------*/
/*  Contact Form Section
/*----------------------------------------------------*/
    $("#contact").submit(function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var text = $("#text").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&text=' + text;


        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (isValidEmail(email) && (text.length > 100) && (name.length > 1)) {
            $.ajax({
                type: "POST",
                url: "ajax/process.php",
                data: dataString,
                success: function () {
                    $('.success').fadeIn(1000).delay(3000).fadeOut(1000);
                    $('#contact')[0].reset();
                }
            });
        } else {
            $('.error').fadeIn(1000).delay(5000).fadeOut(1000);

        }

        return false;
    });



 /* ==============================================
Firefox anchor fix
=============================================== */
    $(document).ready(function(){
        if ( $.browser.mozilla ) {
        var h = window.location.hash;
        if (h) {
            var headerH = $('#navigation').outerHeight();
            $('html, body').stop().animate({
                scrollTop : $(h).offset().top - headerH + "px"
            }, 1200, 'easeInOutExpo');

                event.preventDefault();
        }

    }
    });
