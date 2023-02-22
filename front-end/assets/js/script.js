(function($) { 
"use strict";
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
/*================================================================= 
    pre loader 
==================================================================*/
$('.js-preloader').preloadinator({
  animation: 'fadeOut',
  animationDuration: 400
});

/*================================================================= 
    Isotope initialization 
==================================================================*/
var $grid = $('.grid').isotope({
  // options
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
}); 

// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

/* checking active filter */
// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
var buttonGroup = buttonGroups[i];
radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
buttonGroup.addEventListener( 'click', function( event ) {
// only work with buttons
if ( !matchesSelector( event.target, 'button' ) ) {
  return;
}
buttonGroup.querySelector('.active').classList.remove('active');
event.target.classList.add('active');
});
}


/*================================================================= 
    Testimonial carousel
==================================================================*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  breakpoints: {
    1200:{
      slidesPerView: 3,
    },
    992:{
      slidesPerView: 2, 
    },
    576:{
      slidesPerView: 1
    },
   },
  //slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
  autoplay: {
     delay: 5000,
   },
   

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

});


/*================================================================= 
    Partner carousel
==================================================================*/
const swiper2 = new Swiper('.partnerCarousel', {
  // Optional parameters
  breakpoints: {
    1200:{
      slidesPerView: 6,
    },
    992:{
      slidesPerView: 4, 
    },
    576:{
      slidesPerView: 3
    },
    320:{
      slidesPerView: 2
    },
   },
  //slidesPerView: 6,
  spaceBetween: 24,
  loop: true,
  autoplay: {
     delay: 5000,
   },

});


/*================================================================= 
    Map
==================================================================*/
var map = L.map('mapwrapper').setView([-37.817160, 144.955937], 12);

L.tileLayer('../../../../%7bs%7d.tile.openstreetmap.org/%7bz%7d/%7bx%7d/%7by%7d.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var greenIcon = L.icon({
    iconUrl: "image/location.png",

    iconSize:     [48, 48], // size of the icon
});

L.marker([-37.817160, 144.955937], {icon: greenIcon}).addTo(map);



/*================================================================= 
    Navbar fixed top
==================================================================*/
$(document).ready(function () {

    var menu = $('.site-header nav');
    var origOffsetY = $('.hero-area').height();

    function scroll() {
        if ($(window).scrollTop() >= origOffsetY) {
            $('.site-header nav').addClass('fixed-top');
            
        } else {
            $('.site-header nav').removeClass('fixed-top');
           
        }
    }

    document.onscroll = scroll;

});


/*================================================================= 
    Contact form 
==================================================================*/
$(function() {
    // Here is the form
    var form = $('#fungi-contact');

    // Getting the messages div
    var formMessages = $('.form-message p');


    // Setting up an event listener for the contact form
  $(form).submit(function(event) {
      // Stopping the browser to submit the form
      event.preventDefault();
      
      // Serializing the form data
    var formData = $(form).serialize();

    // Submitting the form using AJAX
    $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
    }).done(function(response) {
      
        // Making the formMessages div to have the 'success' class
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Setting the message text
        $(formMessages).text(response);

        // Clearing the form after successful submission 
        $('#inputName').val('');
        $('#inputEmail').val('');
        $('#inputPhone').val('');
        $('#inputMessage').val('');
    }).fail(function(data) {
      
        // Making the formMessages div to have the 'error' class
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Setting the message text
        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
    });

  });

});

/*================================================================= 
    Animating numbers
==================================================================*/
$('.counter').counterUp({
    delay: 10,
    time: 3000
});


/*================================================================= 
    Progress bar animation
==================================================================*/
var waypoint = new Waypoint({
  element: document.getElementById('skill-section'),
  handler: function() {
    $('.progress .progress-bar').css("width",function() {
      return $(this).attr("aria-valuenow") + "%";
  })
  },
  //offset: 'bottom-in-view',
  offset: 700,
})


/*================================================================= 
    Animate on scroll initialization
==================================================================*/
AOS.init({
  once: true,
});

})(jQuery);








function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    else(magnify)
    
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}



magnify("myimage", 3);
