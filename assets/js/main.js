const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
        });
    });
}

const openStoryBtn = document.getElementById("openStoryBtn");
const openStoryNav = document.getElementById("openStoryNav");
const closeStoryBtn = document.getElementById("closeStoryBtn");
const storyTransition = document.getElementById("storyTransition");

function openStory(event) {
    if (event) {
        event.preventDefault();
    }

    if (!storyTransition) {
        return;
    }

    storyTransition.classList.add("active");
    document.body.style.overflow = "hidden";

    if (navMenu) {
        navMenu.classList.remove("show");
    }
}

function closeStory() {
    if (!storyTransition) {
        return;
    }

    storyTransition.classList.remove("active");
    document.body.style.overflow = "";
}

if (storyTransition) {
    if (openStoryBtn) {
        openStoryBtn.addEventListener("click", openStory);
    }

    if (openStoryNav) {
        openStoryNav.addEventListener("click", openStory);
    }

    if (closeStoryBtn) {
        closeStoryBtn.addEventListener("click", closeStory);
    }

    storyTransition.addEventListener("click", function (event) {
        if (event.target === storyTransition) {
            closeStory();
        }
    });

    if (window.location.hash === "#story-paper") {
        setTimeout(function () {
            openStory();
        }, 300);
    }
}