const popularSlides = document.querySelectorAll(".popular-slide");
const popularDots = document.querySelectorAll(".popular-dot");

const prevPopularBtn = document.getElementById("prevPopularBtn");
const nextPopularBtn = document.getElementById("nextPopularBtn");

let currentPopularSlide = 0;
let popularInterval;

/* =========================
   Show slide
========================= */

function showPopularSlide(index) {

    popularSlides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    popularDots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    popularSlides[index].classList.add("active");

    if (popularDots[index]) {
        popularDots[index].classList.add("active");
    }
}

/* =========================
   Next slide
========================= */

function nextPopularSlide() {

    currentPopularSlide++;

    if (currentPopularSlide >= popularSlides.length) {
        currentPopularSlide = 0;
    }

    showPopularSlide(currentPopularSlide);
}

/* =========================
   Previous slide
========================= */

function prevPopularSlide() {

    currentPopularSlide--;

    if (currentPopularSlide < 0) {
        currentPopularSlide = popularSlides.length - 1;
    }

    showPopularSlide(currentPopularSlide);
}

/* =========================
   Auto carousel
========================= */

function startPopularCarousel() {
    popularInterval = setInterval(nextPopularSlide, 3500);
}

function restartPopularCarousel() {
    clearInterval(popularInterval);
    startPopularCarousel();
}

/* =========================
   Init carousel
========================= */

if (popularSlides.length > 0) {

    showPopularSlide(currentPopularSlide);

    startPopularCarousel();

    /* next button */

    if (nextPopularBtn) {

        nextPopularBtn.addEventListener("click", function () {

            nextPopularSlide();

            restartPopularCarousel();

        });
    }

    /* prev button */

    if (prevPopularBtn) {

        prevPopularBtn.addEventListener("click", function () {

            prevPopularSlide();

            restartPopularCarousel();

        });
    }

    /* dots */

    popularDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            currentPopularSlide = index;

            showPopularSlide(currentPopularSlide);

            restartPopularCarousel();

        });
    });
}

/* =========================
   Swipe support mobile
========================= */

let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector(".popular-carousel-inner");

if (carousel) {

    carousel.addEventListener("touchstart", function (e) {

        touchStartX = e.changedTouches[0].screenX;

    });

    carousel.addEventListener("touchend", function (e) {

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    });

    function handleSwipe() {

        const swipeDistance = touchEndX - touchStartX;

        /* swipe left */

        if (swipeDistance < -50) {

            nextPopularSlide();

            restartPopularCarousel();
        }

        /* swipe right */

        if (swipeDistance > 50) {

            prevPopularSlide();

            restartPopularCarousel();
        }
    }
}