/*!
 * Lightbox v2.8.1
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}(this, function ($) {
  var shoeApp = angular.module('shoeApp', []);
  function replaceAt(s, n, t) {
      return s.substring(0, n) + t + s.substring(n + 1);
  }
  function Lightbox(options) {
    this.album = [];
    this.currentImageIndex = void 0;
    this.init();

    //ERASMO PAGANO VARIABLES
    this.shoesview = [];

    // options
    this.options = $.extend({}, this.constructor.defaults);
    this.option(options);
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  Lightbox.defaults = {
    albumLabel: 'Picture %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 500,
    fitImagesInViewport: true,
    // maxWidth: 800,
    // maxHeight: 600,
    positionFromTop: 10,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false
  };

  Lightbox.prototype.option = function(options) {
    $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
    return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function() {
    this.enable();
    this.build();
  };

  // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
  // that contain 'lightbox'. When these are clicked, start lightbox.
  Lightbox.prototype.enable = function() {
    var self = this;
    $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
      self.start($(event.currentTarget));
      return false;
    });
  };

  // Build html for the lightbox and the overlay.
  // Attach event handlers to the new DOM elements. click click click
  Lightbox.prototype.build = function() {
    var self = this;
    shoeApp.controller('shoeDescriptionCtrl',['$scope', function (sc) {
      sc.shoes = [
        {'category':'Ballerina',
         'model': 'Darring Medanos',
         'style': 'EP1104',
         'description': 'Low cut ballerina. Round toe shape. Draped fabric with a bow holding a silver metal lock and key accessory. Tonal piping. Goat Leather lining. Leather sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP1104/c0.jpg','img/portfolio/fu/EP1104/c1.jpg','img/portfolio/fu/EP1104/c2.jpg']},
        {'category':'Ballerina',
         'model': 'Acarigua Lights',
         'style': 'EP0201',
         'description': 'High cut ballerina. Almond-shaped toe. Printed leather in a colored mosaic-like with leather piping. Goat leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0201/c0.jpg','img/portfolio/fu/EP0201/c1.jpg']},
        {'category':'Loafer',
         'model': 'Parada di Cera',
         'style': 'EP0102',
         'description': 'Loafer with a sparkle Cameo accessory. Velvet fabric with a solid  tonal or colored piping. Goat leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0102/c0.jpg','img/portfolio/fu/EP0102/c1.jpg','img/portfolio/fu/EP0102/c2.jpg']},
        {'category':'Loafer',
         'model': 'Orinoco del Venti',
         'style': 'EP0101',
         'description': 'Loafer with a cravate accessory. Zebra/Leopard hair leather with a solid tonal or colored piping. Goat leather lining. Man made sole. Comfortable insole',
         'colors': ['img/portfolio/fu/EP0101/c0.jpg','img/portfolio/fu/EP0101/c1.jpg','img/portfolio/fu/EP0101/c2.jpg']},
        {'category':'Wedge Ballerina',
         'model': 'Glaring Tepuy',
         'style': 'EP0302',
         'description': 'High cut wedge ballerina. Lightweight. Suede with Crocodile/Snake printed fabric toe cap and piping. Goat leather lining. EVA Tepuy style sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0302/c0.jpg','img/portfolio/fu/EP0302/c1.jpg','img/portfolio/fu/EP0302/c2.jpg']},
        {'category':'Wedge Ballerina',
         'model': 'Glaring Tepuy',
         'style': 'EP0301',
         'description': 'High cut wedge ballerina. Lightweight. Holographic metallic upper with a grosgrain lace and tonal piping. Goat leather lining. EVA Tepuy style sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0301/c0.jpg','img/portfolio/fu/EP0301/c1.jpg','img/portfolio/fu/EP0301/c2.jpg']},
        {'category':'Loafer',
         'model': 'Tempting Warao',
         'style': 'EP0104',
         'description': 'Plain loafer. Round toe shape. Indian pattern fabric with a colored solid piping. Goat leather lining. Leather sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0104/c0.jpg']},
        {'category':'Loafer',
         'model': 'Tempting Warao',
         'style': 'EP0103',
         'description': 'Plain loafer. Almond - shaped. Indian pattern fabric with a colored/beige solid piping or Black perforated laser leather with Goat leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0103/c0.jpg','img/portfolio/fu/EP0103/c1.jpg','img/portfolio/fu/EP0103/c2.jpg']},
        {'category':'Loafer',
         'model': 'Caballo Vecchio',
         'style': 'EP0602',
         'description': 'Loafer with 2 cm heel. Almond - shaped toe. Soft suede with patent/leather piping or Blue Jean suede with leather piping, and tassels accessory. Leather lining. Rubber sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0602/c0.jpg','img/portfolio/fu/EP0602/c1.jpg','img/portfolio/fu/EP0602/c2.jpg']},
        {'category':'Ballerina',
         'model': 'Aqua di Andes',
         'style': 'EP1102',
         'description': 'Low cut ballerina. Round toe shape. Soft suede with a  foggy effect  printed fabric toe cap. Tonal piping. Goat leather lining. Leather sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP1102/c0.jpg','img/portfolio/fu/EP1102/c1.jpg']},
        {'category':'Ballerina',
         'model': 'Aqua di Andes',
         'style': 'EP1103',
         'description': 'Low cut ballerina. Round toe shape. Shiny suede with a sparkly black suede toe cap. Tonal piping. Goat leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP1103/c0.jpg']},
        {'category':'Ballerina',
         'model': 'Llano di Miele',
         'style': 'EP0202',
         'description': 'High cut ballerina. Almond - shaped toe. Three leather colours upper and piping or suede upper with snake embossed leather, toe cap. Goat leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0202/c0.jpg','img/portfolio/fu/EP0202/c1.jpg','img/portfolio/fu/EP0202/c2.jpg']},
        {'category':'Oxford',
         'model': 'Mochima Specchio',
         'style': 'EP1701',
         'description': 'Mirror effect material with lace-up. Natural leather lining. Sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP1701/c0.jpg']},
        {'category':'Oxford',
         'model': 'Mochima Specchio',
         'style': 'EP1702',
         'description': 'Leather material with lace-up. Natural leather lining. Sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP1702/c0.jpg']},
        {'category':'Ballerina',
         'model': 'Dolce Avila',
         'style': 'EP0402',
         'description': 'Low cut ballerina. Round toe shape. Soft suede with a patent toe cap and spotted bow. Goat Leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0402/c0.jpg']},
        {'category':'Ballerina',
         'model': 'Dolce Avila',
         'style': 'EP0401',
         'description': 'Low cut ballerina. Round toe shape. Patterned suede with a gold metal leopard accessory held by a tonal velvet ribbon. Goat Leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0401/c0.jpg']},
        {'category':'Ballerina',
         'model': 'Dolce Avila',
         'style': 'EP0204',
         'description': 'High cut ballerina. Almond-shaped  toe. Patterned suede with a solver metal leopard accessory held by a tonal velvet ribbon. Goat Leather lining. Man made sole. Comfortable insole.',
         'colors': ['img/portfolio/fu/EP0204/c0.jpg']}
      ];
      sc.$watch('shoe', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log('Shoe updated:', newValue);
        }
      }, true);

      sc.updateTemp= function( color){ //pick new id and replace current id on views - ez way to swap
        console.log(sc.shoe);
        var id= color[color.length-5];
        sc.shoe.lview= replaceAt(sc.shoe.lview,sc.shoe.lview.length-5,id);
        sc.shoe.bview= replaceAt(sc.shoe.bview,sc.shoe.bview.length-5,id);
        sc.shoe.sview= replaceAt(sc.shoe.sview,sc.shoe.sview.length-5,id);
        sc.shoe.hview= replaceAt(sc.shoe.hview,sc.shoe.hview.length-5,id);
        sc.shoe.pview= replaceAt(sc.shoe.pview,sc.shoe.pview.length-5,id);
        var zoomImage=$(".lb-image");
        var newImg=sc.shoe.pview;
        console.log(newImg);

        $('.zoomContainer').remove();
        zoomImage.removeData('elevateZoom');
        // Update source for images
        zoomImage.attr('src', newImg);
        zoomImage.data('zoom-image', newImg);
        // Reinitialize EZ
        zoomImage.elevateZoom(zoomConfig);
      }

    }]);

    $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox angular" ng-controller="shoeDescriptionCtrl"><div class="lb-outerContainer "><div class="table-responsive"><table class="table table-bordered"><tbody><tr><td>European [EU]</td><td>35</td><td>35.5</td><td>36</td><td>37</td><td>37.5</td><td>38</td><td>38.5</td><td>39</td><td>39.5</td><td>40</td></tr><tr><td>United Kingdom [UK]</td><td>2.5</td><td>3</td><td>3.5</td><td>4</td><td>4.5</td><td>5</td><td>5.5</td><td>6</td><td>6.5</td><td>7</td></tr><tr><td>United States of America [US]</td><td>5</td><td>5.5</td><td>6</td><td>6.5</td><td>7</td><td>7.5</td><td>8</td><td>8.5</td><td>9</td><td>9.5</td></tr></tbody></table></div><div class="lb-container row"><div id="gallery_01" class="col-lg-2 col-md-2"><a  href="#" class="elevatezoom-gallery active" data-image={{shoe.lview}} data-zoom-image={{shoe.lview}}><img src={{shoe.lview}} height="70"  /></a><a  href="#" class="elevatezoom-gallery" data-update="" data-image={{shoe.hview}} data-zoom-image={{shoe.hview}}><img src={{shoe.hview}} width="100"  /></a><a  href="#" class="elevatezoom-gallery" data-image={{shoe.sview}} data-zoom-image={{shoe.sview}}><img src={{shoe.sview}} width="100"  /></a></div><div class="col-lg-7 col-md-7"><img class="lb-image" data-image="" data-zoom-image="" src={{shoe.pview}} /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="col-lg-3 col-md-3 lb-info"><div class="lb-title lines-r"><h2>{{shoe.category}}</h2></div><div class="lb-group"><h3>{{shoe.model}}</h3><h3>Style Number {{shoe.style}}</h3></div><div class="lb-description"><p>{{shoe.description}}</p><h3>Collection F/W 2016</h3></div><div class="lb-color"><h3>Colour: </h3><ul class=""><li ng-repeat="color in shoe.colors"><img src={{color}} height="50" width="50" ng-click="updateTemp(color)"/></li></ul></div><div class="lb-size"><div class="lb-size"><select name="EU SIZE"><option value="" disabled selected>EU SIZE</option><option value="35">35/UK Size 2.5</option><option value="35.5">35.5/UK Size 3</option><option value="36">36/UK Size 3.5</option><option value="37">37/UK Size 4</option><option value="37.5">37.5/UK Size 4.5</option><option value="38">38/UK Size 5</option><option value="38.5">38.5/UK Size 5.5</option><option value="39">39/UK Size 6</option><option value="39.5">39.5/UK Size 6.5</option><option value="40">40/UK Size 7</option></select><a href="#" class="lb-button">SIZE CHART</a><div class="share"></div></div></div></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close "></a></div></div></div></div>').appendTo($('body'));

  // Cache jQuery objects
    this.$lightbox       = $('#lightbox');
    this.$overlay        = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container      = this.$lightbox.find('.lb-container');

    // Store css values for future lookup
    this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
    this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
    this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
    this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', function() {
      self.end();
      return false;
    });

    this.$lightbox.hide().on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$outerContainer.on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', function() {
      if (self.currentImageIndex === 0) {
        self.changeImage(self.album.length - 1);
      } else {
        self.changeImage(self.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', function() {
      if (self.currentImageIndex === self.album.length - 1) {
        self.changeImage(0);
      } else {
        self.changeImage(self.currentImageIndex + 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
      self.end();
      return false;
    });
  };

// Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  Lightbox.prototype.start = function($link) {
    var self    = this;
//Angular Management for information loading on Template --------START
    var ctrlSc=jQuery('#lightbox').scope(); //Scope of angular
    srcParts= $link.attr('href').split('/');  //imgSrc viewImage

    var result = $.grep(ctrlSc.shoes, function(e){ return e.style == srcParts[3]; }); //look for shoe style number on database
    if (result.length == 0) {
      console.log('there isnt any match with '+srcParts[3]);
    } else if (result.length == 1) {

      ctrlSc.$apply(function() {  //update src of views and load information on template

        ctrlSc.shoe= result[0];
        var uriShoe=srcParts[0]+'/'+srcParts[1]+'/'+srcParts[2]+'/'+srcParts[3];
        ctrlSc.shoe.lview = uriShoe+'/l0.jpg';
        ctrlSc.shoe.hview = uriShoe+'/h0.jpg';
        ctrlSc.shoe.sview = uriShoe+'/s0.jpg';
        ctrlSc.shoe.bview = uriShoe+'/b0.jpg';
        ctrlSc.shoe.pview = uriShoe+'/p0.jpg';

      });


    } else {
      // multiple items found
      console.log('hue');
    }

// --- END

    var $window = $(window);

    $window.on('resize', $.proxy(this.sizeOverlay, this));


    this.sizeOverlay();

    this.album = [];
    var imageNumber = 0;

    function addToAlbum($link) {
      self.album.push({
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title')
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    var dataLightboxValue = $link.attr('data-lightbox');
    var $links;

    if (dataLightboxValue) {
      $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
      for (var i = 0; i < $links.length; i = ++i) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (var j = 0; j < $links.length; j = ++j) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    var top  = $window.scrollTop() + this.options.positionFromTop;
    var left = $window.scrollLeft();
    this.$lightbox.css({
      top: top + 'px',
      left: left + 'px'
    }).fadeIn(this.options.fadeDuration);

    this.changeImage(imageNumber);
  };

  // Hide most UI elements in preparation for the animated resizing of the lightbox.
  Lightbox.prototype.changeImage = function(imageNumber) {
    var self = this;

    this.disableKeyboardNav();
    var $image = this.$lightbox.find('.lb-image');

    this.$overlay.fadeIn(this.options.fadeDuration);

    $('.lb-loader').fadeIn('slow');
    this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    var preloader = new Image();
    preloader.onload = function() {
      var $preloader;
      var imageHeight;
      var imageWidth;
      var maxImageHeight;
      var maxImageWidth;
      var windowHeight;
      var windowWidth;
      var imgfolder;
      var srcParts;

      $image.attr('src', self.album[imageNumber].link);
      $preloader = $(preloader);

      $image.width(preloader.width);
      $image.height(preloader.height);

      if (self.options.fitImagesInViewport) {
        // Fit image inside the viewport.
        // Take into account the border around the image and an additional 10px gutter on each side.

        windowWidth    = $(window).width();
        windowHeight   = $(window).height();
        maxImageWidth  = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20;
        maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - 120;

        // Check if image size is larger then maxWidth|maxHeight in settings
        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
          maxImageWidth = self.options.maxWidth;
        }
        if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
          maxImageHeight = self.options.maxHeight;
        }

        // Is there a fitting issue?
        if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
          if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
            imageWidth  = maxImageWidth;
            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          } else {
            imageHeight = maxImageHeight;
            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          }
        }
      }
      self.sizeContainer($image.width(), $image.height()+100);
    };

    preloader.src          = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  };

  // Stretch overlay to fit the viewport
  Lightbox.prototype.sizeOverlay = function() {
    this.$overlay
      .width($(window).width())
      .height($(document).height());
  };

  // Animate the size of the lightbox to fit the image we are showing
  Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
    var self = this;

    var oldWidth  = this.$outerContainer.outerWidth();
    var oldHeight = this.$outerContainer.outerHeight();
    var newWidth  = imageWidth + this.containerLeftPadding + this.containerRightPadding;
    var newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;

    function postResize() {
      self.$lightbox.find('.lb-dataContainer').width(newWidth);
      self.$lightbox.find('.lb-prevLink').height(newHeight);
      self.$lightbox.find('.lb-nextLink').height(newHeight);
      self.showImage();
    }

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate({
        width: $(window).width()-20,
        height: $(window).height()-20
      }, this.options.resizeDuration, 'swing', function() {
        postResize();
      });
    } else {
      postResize();
    }
  };

  // Display the image and its details and begin preload neighboring images.
  Lightbox.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn('slow');

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  };

  // Display previous and next navigation if appropriate.
  Lightbox.prototype.updateNav = function() {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    var alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  };

  // Display caption, image number, and closing button.
  Lightbox.prototype.updateDetails = function() {
    var self = this;

    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== '') {
      this.$lightbox.find('.lb-caption')
        .html(this.album[this.currentImageIndex].title)
        .fadeIn('fast')
        .find('a').on('click', function(event) {
          if ($(this).attr('target') !== undefined) {
            window.open($(this).attr('href'), $(this).attr('target'));
          } else {
            location.href = $(this).attr('href');
          }
        });
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return self.sizeOverlay();
    });
  };

  // Preload previous and next images in set.
  Lightbox.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      var preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      var preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  };

  Lightbox.prototype.enableKeyboardNav = function() {
    $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
  };

  Lightbox.prototype.disableKeyboardNav = function() {
    $(document).off('.keyboard');
  };

  Lightbox.prototype.keyboardAction = function(event) {
    var KEYCODE_ESC        = 27;
    var KEYCODE_LEFTARROW  = 37;
    var KEYCODE_RIGHTARROW = 39;

    var keycode = event.keyCode;
    var key     = String.fromCharCode(keycode).toLowerCase();
    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
      $(".lb-container img").data('elevateZoom').changeState('disable');
      $(".lb-container img").data('elevateZoom').closeAll();
      this.end();
    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  };

  // Closing time. :-(
  Lightbox.prototype.end = function() {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);
    $('select, object, embed').css({
      visibility: 'visible'
    });
  };

  return new Lightbox();
}));
