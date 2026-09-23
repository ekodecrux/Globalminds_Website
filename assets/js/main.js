/*--------------------------
    Project Name: Amarou
    Version: 1.0
    Author: 7oorof
    Devloped by: Ahmed Abdallah (a.abdallah999@gmail.com)
    Relase Date: August 2020
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Search Popup 
    05- Scroll Top Button
    06-  Scroll Top Button
    07- Set Background-img to section 
    08- Add active class to accordions
    09- Load More Items
    10- Slick Carousel
    11- Popup Video
    12- CounterUp
    13- NiceSelect Plugin
     
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    function removePreloader() {
        $(".preloader").fadeOut(300, function () {
            $(this).remove();
        });
    }
    if (document.readyState === "complete") {
        removePreloader();
    } else {
        $(window).on("load", removePreloader);
        setTimeout(removePreloader, 600);
    }

    /*==========   Mobile Menu   ==========*/
    var $navToggler = $('.navbar-toggler');
    $navToggler.on('click', function () {
        $(this).toggleClass('actived');
    })
    $navToggler.on('click', function () {
        $('.navbar-collapse').toggleClass('menu-opened');
    })

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $navbar = $('.navbar');
            if ($win.scrollTop() > 50) {
                $navbar.addClass('is-sticky');
            } else {
                $navbar.removeClass('is-sticky');
            }
        }
    });

    /*==========  Search Popup  ==========*/
    $('.action-btn__search').on('click', function (e) {
        e.preventDefault();
        $('.search-popup').toggleClass('active', 'inActive').removeClass('inActive');
    });
    // Close Module Search
    $('.search-popup__close').on('click', function () {
        $('.search-popup').removeClass('active').addClass('inActive');
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var $img = $(this).children('img');
        if ($img.length > 0) {
            var imgSrc = $img.attr('src');
            if (imgSrc) {
                $(this).parent().css({
                    'background-image': 'url(' + imgSrc + ')',
                    'background-size': 'cover',
                    'background-position': 'center center'
                });
                if ($(this).hasClass('background-size-auto')) {
                    $(this).parent().addClass('background-size-auto');
                }
                $(this).remove();
            }
        }
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__item-header').on('click', function () {
        $(this).parent('.accordion-item').addClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion__item-title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }
    loadMore('.loadMoreportfolio', '.portfolio-hidden > .portfolio-item');

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    if (contactForm.length && typeof contactForm.validate === 'function') {
        contactForm.validate({
            debug: false,
            submitHandler: function (contactForm) {
                $(contactResult, contactForm).html('Please Wait...');
                $.ajax({
                    type: "POST",
                    url: "assets/php/contact.php",
                    data: $(contactForm).serialize(),
                    timeout: 20000,
                    success: function (msg) {
                        $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                    },
                    error: $('.thanks').show()
                });
                return false;
            }
        });
    }

    /*==========   Slick Carousel ==========*/
    if ($('.slick-carousel').length && typeof $.fn.slick === 'function') {
        $('.slick-carousel').each(function () {
            var $carousel = $(this);
            var $track = $carousel.find('.slick-track');
            if ($track.length > 0) {
                $track.find('.slick-cloned').remove();
                $carousel.find('.slick-arrow').remove();
                $carousel.find('.slick-dots').remove();
                var $slides = $track.children();
                $slides.removeClass('slick-slide slick-current slick-active slick-visible')
                       .removeAttr('data-slick-index aria-hidden tabindex role id aria-describedby style');
                $carousel.find('.slick-list').remove();
                $carousel.append($slides);
                $carousel.removeClass('slick-initialized slick-slider slick-dotted');
            }
            try {
                $carousel.slick();
            } catch (err) {
                console.warn("Slick initialization error:", err);
            }
        });
    }

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========   counterUp  ==========*/
    if ($(".counter").length && typeof $.fn.counterUp === 'function') {
        try {
            $(".counter").counterUp({
                delay: 10,
                time: 4000
            });
        } catch (err) {
            console.warn("counterUp initialization skipped:", err);
        }
    }

    /*==========  NiceSelect Plugin  ==========*/
    if ($('select').length && typeof $.fn.niceSelect === 'function') {
        $('select').niceSelect();
    }
});