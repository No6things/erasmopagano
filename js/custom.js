var sliders = new Array(),
    hue = true,
    portHeight,
    orientationChange=true,
    slidersIndex = new Array(), //array of the sliders
    sliderIndex=0, //current index of the slider array
    lastIndex=0, //current index of the slide, locale to the slider, it should be updated on bxprev, bxnext and every time slides changes
    zoomConfig={
       easing: true,
       zoomType: "inner",
       cursor: "crosshair"
    };

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
        jQuery(".page-mask").delay(1000).fadeOut('slow');
        jQuery('body').css('overflowY','auto');

    });

/*-------------------------------------------------*/
/* Keep same Heights on Portraits and Home Slider
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

    $(".form-control").focusin( function(){
        $(this).css("border-color","#334378");
        var nextIndex= $(".form-control").index(this)+1;
        nextElement=$(".form-control")[nextIndex];
        $(nextElement).css("border-top-color","#334378");
        return;
    });
    $(".form-control").focusout(function(){
        $(this).css("border-color","#828282");
        var nextIndex= $(".form-control").index(this)+1;
        nextElement=$(".form-control")[nextIndex];
        $(nextElement).css("border-top-color","#828282");
        return;
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

        jQuery('.subscription-wrap').parallax("30%", 0.01);
        jQuery('.product-wrap').parallax("30%", 0.01);

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
/*  Lightbox
/*----------------------------------------------------*/

    jQuery(function(){
      lightbox.option({
        'postitionFromTop':10,
        'resizeDuration': 200,
        'wrapAround': true
    })

/*----------------------------------------------------*/
/*  Portfolio Lens - elevateZoom
/*----------------------------------------------------*/
      $('.RoundBg a').on('click', function  (){
            sliders[sliderIndex].stopAuto();
            var zoomImage=$(".lb-image");
            var newImg=$(this).closest('.overlay-effect').siblings('img').attr("src");
            if(hue) { //if first time load original image
              console.log("1-"+newImg);
              zoomImage.data('zoom-image', newImg).elevateZoom(zoomConfig);
              hue=false;
              return;
            } // else, swap
            console.log("2-"+newImg);
            zoomImage.data('elevateZoom').changeState('enable');
            $('.zoomContainer').remove();
            zoomImage.removeData('elevateZoom');
            // Update source for images
            zoomImage.attr('src', newImg);
            zoomImage.data('zoom-image', newImg);
            // Reinitialize EZ
            zoomImage.elevateZoom(zoomConfig);
      });
      $('#gallery_01 a').on('click', function(){
            var zoomImage=$(".lb-image");
            // Remove old instance od EZ
            $('.zoomContainer').remove();
            zoomImage.removeData('elevateZoom');
            // Update source for images
            zoomImage.attr('src', $(this).data('image'));
            zoomImage.data('zoom-image', $(this).data('zoom-image'));
            // Reinitialize EZ
            zoomImage.elevateZoom(zoomConfig);
      });

    });
});


/*----------------------------------------------------*/
/*  BxSlider
/*----------------------------------------------------*/


jQuery(document).ready(function(){
    var onMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }
     slidersIndex[0]='.pr';
     slidersIndex[1]='.cu';
     slidersIndex[2]='.fu';

    jQuery('.bxslider').bxSlider({
      slideWidth: 300,
      slideMargin: 97,
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
      speed:700,
      infiniteLoop: true,
      easing: 'ease-in-out'
    });

    jQuery('.bxslider3').bxSlider({
      auto:true,
      autoDirection: 'next',
      controls:false,
      pager: false,
      speed:700,
      infiniteLoop: true,
      easing: 'ease-in-out'
    });

    jQuery('.bxslidert').bxSlider({
      auto:true,
      controls:false,
      autoHover: true,
      pager: false,
      speed:700,
      infiniteLoop: true,
      easing: 'ease-in-out'
    });

    $('.bxslider5').each(function(i, slider) {
        sliders[i] = $(slider).bxSlider({
          auto: true,
          autoHover: true,
          infiniteLoop: false,
          mode: 'fade',
          pager: false,
          slideSelector: '.slide',
          nextText: '<img src="img/right-arrow.png" />',
          prevText: '<img src="img/left-arrow.png" />',
          onSlideAfter: function($slideElement, oldIndex, newIndex){
            console.log(sliderIndex);
            var amount=sliders[sliderIndex].getSlideCount();
            if ((newIndex > oldIndex) && (newIndex== amount-1)) {
              lastIndex+=1;
            }else if (  (newIndex < oldIndex) && (newIndex==0) ){
              lastIndex-=1;
            }
          }
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
                }, 1000);
            }
            var bnext= function(){ //salta entre sliders un vez se presiona en el ultimo slide
                $('.bx-next').on('click', function (){
                  var i = $(this).index();
                  var slideQty = sliders[sliderIndex].getSlideCount();
                  console.log(i+'/'+lastIndex);
                  console.log("slides:"+slideQty+"/index:"+i);
                  if (lastIndex == slideQty-1){
                      lastIndex=0;
                      console.log("ese indice esta repetido, debe ser el ultimo slide, despertare el siguiente slider sliderIndex-"+sliderIndex+1);
                      $('#portfolio-wrap').isotope({ filter: slidersIndex[sliderIndex+1] }, refreshWaypoints());
                      sliders[sliderIndex+1].reloadSlider();
                      $("#filters a[data-filter='"+slidersIndex[sliderIndex]+"']").removeClass('active');
                      $("#filters a[data-filter='"+slidersIndex[sliderIndex+1]+"']").addClass('active');
                      setPortfolio();
                      sliderIndex++;
                  }
                });
            };
            var bprev= function(){ //salta entre sliders un vez se presiona en el primer slide
                $('.bx-prev').on('click', function (){
                  var i = $(this).index();
                  var slideQty = sliders[sliderIndex].getSlideCount();
                  console.log($(this));
                  console.log("slides:"+slideQty+"/index:"+i);
                  if (lastIndex!=i){
                      lastIndex=i;
                      console.log("ese indice no esta repetido");
                  }else if ( i == 0 && sliderIndex!=0){
                      lastIndex=0;
                      console.log("ese indice esta repetido, debe ser el primer slide, despertare el siguiente slider sliderIndex-"+sliderIndex+1);
                      $('#portfolio-wrap').isotope({ filter: slidersIndex[sliderIndex-1] }, refreshWaypoints());
                      sliders[sliderIndex+1].reloadSlider();
                      $("#filters a[data-filter='"+slidersIndex[sliderIndex]+"']").removeClass('active');
                      $("#filters a[data-filter='"+slidersIndex[sliderIndex-1]+"']").addClass('active');
                      setPortfolio();
                      sliderIndex--;
                  }
                });
            };
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


            $( window ).on( "orientationchange", function( event ) {
                /*portHeight= $("#portfolio-wrap").height();
                console.log(portHeight);
                if ((orientationchange==false) && (portHeight != 0)) {$("#portfolio-wrap").css({height:portHeight});console.log(portHeight);}*/
                sliders[sliderIndex].reloadSlider();
                setPortfolio();
                //orientationchange= !orientationchange;

            });

            $('#filters a').on('click', function() {
                    $('#portfolio-wrap').show();
                    jQuery("html, body").animate({
                        scrollTop: 1450
                    }, 600);
                    var selector = $(this).attr('data-filter');
                    $container.isotope({ filter: selector }, refreshWaypoints());
                    if (selector == '.pr') {
                      lastIndex=0;
                      sliders[0].reloadSlider();
                      bnext();
                      bprev();
                      sliderIndex=0;
                    } else if ( selector == '.cu'){
                      lastIndex=0;
                      sliders[1].reloadSlider();
                      bnext();
                      bprev();
                      sliderIndex=1;
                    } else{
                      lastIndex=0;
                      sliders[2].reloadSlider();
                      bnext();
                      bprev();
                      sliderIndex=2;
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
    /*  Portfolio Close Button
    /*----------------------------------------------------*/
    $('.lb-close').on('click', function() {
        $(".lb-image").data('elevateZoom').changeState('disable');
        $(".lb-image").data('elevateZoom').closeAll();
        $('.zoomContainer').remove();
    });

    $('.portfolio-close').on('click', function() {
            $('#filters a').removeClass('active');
            sliderIndex=-1;
            //this might be deleted
            $('.zoomWindow').css('z-index',1);
            $('.zoomWindowContainer').css('z-index',1);
            $('.zoomContainer').css('z-index',1);
            $('#portfolio-wrap').hide(500);
            jQuery("html, body").animate({
                scrollTop: 1520
            }, 600);
            return false;
    });
/*----------------------------------------------------*/
/*  Contact Form Section
/*----------------------------------------------------*/
   $('input').on('input',function(){
     $(this).css('color','rgb(82, 82, 82)');
   });


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
