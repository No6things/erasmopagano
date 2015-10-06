

jQuery(document).ready(function () {
  var sliderf;

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
/* =  Static Heights on Portrait and Home Slider
/*-------------------------------------------------*/


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
/*  Portfolio Isotope
/*----------------------------------------------------*/




    jQuery(document).ready(function(){

        // Portfolio
        (function($) {
            "use strict";

            function refreshWaypoints() {
                setTimeout(function() {}, 1000);
            }

            $('#filters a').on('click', function() {

            });

            function getColumnNumber() {
                var winWidth = $(window).width(),
                    columnNumber = 6;
                return columnNumber;
            }

            function setColumns() {
                var winWidth = $(window).width()-100,
                    columnNumber = getColumnNumber(),
                    itemWidth = Math.floor(winWidth / columnNumber);

                $container.find('.one-four').each(function() {
                    $(this).css({
                      width : itemWidth + 'px',
                      height: itemWidth + 'px'
                    });
                });
            }

            function setPortfolio() {
                setColumns();
                $container.isotope('layout');
            }

            var $container = $('#portfolio-wrap'),
                portfolioLayout = 'masonry';
            $('#portfolio-wrap').show();
            sliderf.reloadSlider();
            setColumns();
            $container.isotope({
                animationEngine: 'best-available',
                layoutMode: portfolioLayout,
                animationOptions: {
                  duration: 75000,
                  easing: 'linear',
                  queue: false
                },
                masonry: {
                  gutter: 1
                }
            }, refreshWaypoints());
            $container.isotope({ filter: '.pr' }, refreshWaypoints());
            $container.isotope('layout');


            $container.imagesLoaded(function () {
                setPortfolio();
            });
        })(jQuery);

    });



/*----------------------------------------------------*/
/*  BxSlider
/*----------------------------------------------------*/


jQuery(document).ready(function(){

    var onMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }


    sliderf = jQuery('.bxslider5').bxSlider({
      infiniteLoop: false,
      autoHover: true,
      controls: false,
      mode: 'fade',
      pager: false,
      slideSelector: '.slide'
    });


});
