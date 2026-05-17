const popularSlides = document.querySelectorAll(".popular-slide");
const popularDots = document.querySelectorAll(".popular-dot");
const prevPopularBtn = document.getElementById("prevPopularBtn");
const nextPopularBtn = document.getElementById("nextPopularBtn");

let currentPopularSlide = 0;
let popularInterval;

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

function nextPopularSlide() {
    currentPopularSlide++;

    if (currentPopularSlide >= popularSlides.length) {
        currentPopularSlide = 0;
    }

    showPopularSlide(currentPopularSlide);
}

function prevPopularSlide() {
    currentPopularSlide--;

    if (currentPopularSlide < 0) {
        currentPopularSlide = popularSlides.length - 1;
    }

    showPopularSlide(currentPopularSlide);
}

function startPopularCarousel() {
    popularInterval = setInterval(nextPopularSlide, 3500);
}

function restartPopularCarousel() {
    clearInterval(popularInterval);
    startPopularCarousel();
}

if (popularSlides.length > 0) {
    showPopularSlide(currentPopularSlide);
    startPopularCarousel();

    if (nextPopularBtn) {
        nextPopularBtn.addEventListener("click", function () {
            nextPopularSlide();
            restartPopularCarousel();
        });
    }

    if (prevPopularBtn) {
        prevPopularBtn.addEventListener("click", function () {
            prevPopularSlide();
            restartPopularCarousel();
        });
    }

    popularDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            currentPopularSlide = index;
            showPopularSlide(currentPopularSlide);
            restartPopularCarousel();
        });
    });
}