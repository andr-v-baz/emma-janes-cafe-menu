const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        navMenu.classList.toggle("show");
    });

    navMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
        });
    });

    document.addEventListener("click", function () {
        navMenu.classList.remove("show");
    });
}

/* Story popup */

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

/* Ingredients popup */

const openIngredientsBtn = document.getElementById("openIngredientsBtn");
const closeIngredientsBtn = document.getElementById("closeIngredientsBtn");
const ingredientsModal = document.getElementById("ingredientsModal");

function openIngredients() {
    if (!ingredientsModal) {
        return;
    }

    ingredientsModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (navMenu) {
        navMenu.classList.remove("show");
    }
}

function closeIngredients() {
    if (!ingredientsModal) {
        return;
    }

    ingredientsModal.classList.remove("active");
    document.body.style.overflow = "";
}

if (openIngredientsBtn) {
    openIngredientsBtn.addEventListener("click", openIngredients);
}

if (closeIngredientsBtn) {
    closeIngredientsBtn.addEventListener("click", closeIngredients);
}

if (ingredientsModal) {
    ingredientsModal.addEventListener("click", function (event) {
        if (event.target === ingredientsModal) {
            closeIngredients();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeStory();
        closeIngredients();
    }
});