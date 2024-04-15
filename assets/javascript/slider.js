$(document).ready(function(){
  $('.homepage_slider-second-part').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    speed: 300,
    infinite: true,
    autoplaySpeed: 3000,
    autoplay: true,
    prevArrow: '<img src="./assets/images/icon_ left arrow.svg" alt="" class="left_arrow">',
     nextArrow: '<img src="./assets/images/icon_ right arrow.svg" alt="" class="right_arrow">',
    responsive: [
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }
]
  });
});

$(document).ready(function(){
  $('.slider_second-part').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    speed: 300,
    infinite: true,
    autoplaySpeed: 3000,
    autoplay: true,
    prevArrow: '<img src="./assets/images/icon_ left arrow.svg" alt="" class="left_arrow">',
     nextArrow: '<img src="./assets/images/icon_ right arrow.svg" alt="" class="right_arrow">',
    responsive: [
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 1,
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
    }
  }
]
  });
});
