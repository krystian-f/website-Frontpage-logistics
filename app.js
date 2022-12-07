"use strict"
import reviews from './profiles/reviews.json' assert {type: 'json'};
// DOM 
// Navigation
const navContainer = document.querySelector('.main-navigation');
const navHamburger = document.querySelector('.navigation__hamburger-js');
const navList = document.querySelector('.navigation__list-js');
const navLinks = document.querySelectorAll('.navigation-link');

// Slider
const slides = document.querySelectorAll('.slide');
const btnSlide = document.querySelectorAll('.btn-slide');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.bnt-next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let maxSlides = slides.length -1;

// About
const aboutCategories = document.querySelectorAll('.about__category');
const categoriesContent = document.querySelectorAll('[data-tab-content]');
const aboutContent = document.querySelectorAll('.about__img-modal');

// Pricing
const pricingSize = document.querySelectorAll('.pricing__size');
const pricingSpeed = document.querySelectorAll('.speed__box');
const pricingDisplayBox = document.querySelector('.pricing__price');
const pricingDisplay = document.querySelector('.pricing__sum');
const pricingSubmit = document.querySelector('.pricing__submit');
let boxSize;
let boxSpeed; 


// Reviews
const reviewBtns = document.querySelectorAll('.reviews__btn');
const reviewsContainer = document.querySelector('.reviews__container');
let currentReview = 0;



// Functions Expressions
const navDisplay = function navDisplayHide() {
  navHamburger.classList.toggle('active');
  navList.classList.toggle('active');
  navContainer.classList.toggle('active');
}

const navLinksDisplay = function navHideOnLinkClick() {
  navContainer.classList.remove('active');
  navHamburger.classList.remove('active');
  navList.classList.remove('active');
}

// Calls
// Navigation
navHamburger.addEventListener('click', () =>{
  navDisplay();
})

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinksDisplay();
  })
})

const displaySlide = function displayCurrentSlide(){
  slides.forEach ((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    displayDot(currentSlide);        
  })
}

const displayDot = function displayActiveDotNavigationBtns(currSlide){
  dots.forEach((dot) =>{
    dot.classList.remove('active');
  })
  dots[currSlide].classList.add('active');
}

const dotNavigation = function changeSlideByDotClick(){
  dots.forEach((dot, index) =>{
    dot.addEventListener('click', () => {
      currentSlide = index;
      displaySlide();
    })
  })
}

const reviewsCarouselMovement = function calculateTransformationOfCarousel(reviewBoxes){
  reviewBoxes.forEach((review) => {
    review.style.transform = `translateX(calc(${(currentReview * 100) * -1}% - ${(currentReview * -2) * -1}rem)`;      
  }) 
}

const reviewsScore = function generateStarsIconsFromReview(review){
  let scoreTemplate = `<span class="material-symbols-outlined score-design">star</span>`
  let score = scoreTemplate.repeat(review.score);
  return score;
}


// Slider
slides.forEach ((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
})

displayDot(currentSlide);
dotNavigation();

btnSlide.forEach((btn) => {
  if (btn.classList.contains('btn-prev')) {
    btn.addEventListener('click', ()=>{

      if (currentSlide === 0) {
        currentSlide = maxSlides;
      } else {
        currentSlide -= 1;        
      }
      console.log(currentSlide);

      displaySlide()
    }) 
  } else if (btn.classList.contains('btn-next')) {
    btn.addEventListener('click', () =>{

      if (currentSlide === maxSlides) {
        currentSlide = 0;
      } else {
        currentSlide += 1;        
      }
      displaySlide();
    })   
  }
})

// About
aboutCategories.forEach((category) =>{
  category.addEventListener('click', () =>{
    aboutCategories.forEach((category) => {
      category.classList.remove('active');
    })
    category.classList.add('active');
    const target = document.querySelector(category.dataset.tabTarget);

    aboutContent.forEach((content) => {
      content.classList.remove('active');
    })
    target.classList.add('active');
  })
})

// Pricing
pricingSize.forEach((btn) => {
  btn.addEventListener('click', () => {
    pricingSize.forEach((btn) => {
      btn.classList.remove('active');
    })
    btn.classList.add('active');
    boxSize = btn;
  })
})

pricingSpeed.forEach((btn) => {
  btn.addEventListener('click', () => {
    pricingSpeed.forEach((btn) => {
      btn.classList.remove('active');
    })
    btn.classList.add('active');
    boxSpeed = btn;
  })
})

pricingSubmit.addEventListener('click', () => {
  let box = undefined;
  let boxSpeedPrice = 0;
  let standardPrice = 10;
  let finalPrice = 0;
  let displayFinalPrice = '';
  pricingDisplay.innerText = '';

  if(boxSize.classList.contains('active') && boxSpeed.classList.contains('active')) {
    pricingSize.forEach((item) => {
      if(item.classList.contains('active')) {
        if(item.classList.contains('pricing__size-s')) {
          box = 1
        } else if (item.classList.contains('pricing__size-m')) {
          box = 1.5;
        } else if (item.classList.contains('pricing__size-l')) {
          box = 2;
        } else if (item.classList.contains('pricing__size-xl')) {
          box = 2.5;
        }
      }
    })

    pricingSpeed.forEach((item) => {
      if(item.classList.contains('active')) {
        if(item.classList.contains('speed__normal')){
          boxSpeedPrice = 10;
        } else if (item.classList.contains('speed__fast')) {
          boxSpeedPrice = 20;
        }
      }
    })

    finalPrice = (standardPrice * box) + boxSpeedPrice;
    displayFinalPrice = `${finalPrice}.00 $`;
    pricingDisplayBox.classList.add('active');
    pricingDisplay.insertAdjacentHTML('afterbegin', displayFinalPrice);
  }
})

// Reviews
// Review template generator 
reviews.reviews.reverse().forEach((review) =>{
  let score = reviewsScore(review);
  let reviewTemplate = `
  <div class="review__box review">
    <img src=${review.profileImg} class="review__img" alt="profile image">
    <div class="review__name">${review.name}</div>
    <div class="review__score">${score}</div>
    <div class="review__text">${review.review}</div>
  </div>
  `;
  reviewsContainer.insertAdjacentHTML('afterbegin', reviewTemplate);
})


// Add calculation of width and depending on that -3 or more less
reviewBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // box width
    const reviewSingleBox = document.querySelectorAll('.review__box')[0];
    let carouselOffset = 0;
    let reviewBoxWidth = reviewSingleBox.offsetWidth;

    if(reviewBoxWidth <= 214) {
      carouselOffset = 2;
    } else if (reviewBoxWidth >=215) {
      carouselOffset = 3;
    }

    let reviewBoxes = document.querySelectorAll('.review__box');
    let maxReviews = reviewBoxes.length;

    if(btn.classList.contains('reviews__prev')) {
      // Previous btn
      if(currentReview <= 0){
        currentReview = maxReviews - carouselOffset;
        reviewsCarouselMovement(reviewBoxes);
      } else if (currentReview > 0) {
        currentReview -= 1;
        reviewsCarouselMovement(reviewBoxes);    
      }
    }
    // Next btn
    if(btn.classList.contains('reviews__next')) {
      if(currentReview >= (maxReviews - carouselOffset)) {
        currentReview = 0;
        reviewsCarouselMovement(reviewBoxes);
      } else if(currentReview < (maxReviews - carouselOffset)) {
        currentReview += 1;
        reviewsCarouselMovement(reviewBoxes);
      }
    }
  })
})


