document.addEventListener("DOMContentLoaded", function () {
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuPanel = document.getElementById("menuPanel");
    const menuEmpty = document.getElementById("menuEmpty");

    const productModal = document.getElementById("productModal");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalBadge = document.getElementById("modalBadge");
    const modalImage = document.getElementById("modalImage");

    let menuCategories = [];
    let currentDrinkSubTab = "drinks";

    const jsonPaths = [
        "../assets/data/menu.json",
        "assets/data/menu.json",
        "./assets/data/menu.json",
        "../data/menu.json",
        "./data/menu.json"
    ];

    const milkItems = [
        { name: "Regular Milk", price: "Included" },
        { name: "Skinny Milk", price: "Free" },
        { name: "Oat Milk", price: "€0.50" },
        { name: "Coconut Milk", price: "€0.50" }
    ];

    const syrupItems = [
        { name: "Caramel Syrup", price: "€0.50" },
        { name: "Vanilla Syrup", price: "€0.50" },
        { name: "Gingerbread Syrup", price: "€0.50" },
        { name: "Hazelnut Syrup", price: "€0.50" },
        { name: "Dubai Chocolate Syrup", price: "€0.50" },
        { name: "Mint Syrup", price: "€0.50" },
        { name: "Pumpkin Spice Syrup", price: "€0.50" },
        { name: "Praline Syrup", price: "€0.50" },
        { name: "Honeycomb Syrup", price: "€0.50" },
        { name: "Winter Spice Syrup", price: "€0.50" }
    ];

    const icedTeaItems = [
        { name: "Lemon Iced Tea", price: "€3.50" },
        { name: "Peach Iced Tea", price: "€3.50" },
        { name: "Passion Fruit Iced Tea", price: "€3.50" }
    ];

    loadMenuJson();

    function loadMenuJson() {
        tryLoadJson(0);
    }

    function tryLoadJson(index) {
        if (index >= jsonPaths.length) {
            if (menuEmpty) {
                menuEmpty.innerHTML = "<p>Menu could not be loaded. Check menu.json path.</p>";
            }

            return;
        }

        fetch(jsonPaths[index])
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Wrong path");
                }

                return response.json();
            })
            .then(function (data) {
                menuCategories = data.categories;

                const params = new URLSearchParams(window.location.search);
                const categoryFromUrl = params.get("category");

                if (categoryFromUrl) {
                    openCategory(categoryFromUrl, true);
                } else {
                    openCategory("pancakes", false);
                }
            })
            .catch(function () {
                tryLoadJson(index + 1);
            });
    }

    function openCategory(categoryId, shouldScroll = true) {
        const category = menuCategories.find(function (item) {
            return item.id === categoryId;
        });

        if (!category) {
            return;
        }

        if (categoryId === "cold-drinks") {
            currentDrinkSubTab = "iced-coffee";
        } else {
            currentDrinkSubTab = "drinks";
        }

        menuTabs.forEach(function (tab) {
            tab.classList.remove("active");
        });

        const activeButton = document.querySelector(`.menu-tab[data-category="${categoryId}"]`);

        if (activeButton) {
            activeButton.classList.add("active");
        }

        showCategory(category);

        if (shouldScroll) {
            scrollToCategoryTitle();
        }
    }

    function scrollToCategoryTitle() {
        setTimeout(function () {
            const title = menuPanel.querySelector(".menu-panel-text");

            if (title) {
                const headerOffset = 215;
                const titleTop = title.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: titleTop - headerOffset,
                    behavior: "smooth"
                });
            }
        }, 250);
    }

    function isDrinkCategory(categoryId) {
        return categoryId === "hot-drinks" || categoryId === "cold-drinks";
    }

    function getCategoryPhoto(categoryId) {
        if (categoryId === "hot-drinks") {
            return "../assets/images/drinks/hot-drinks.jpg";
        }

        if (categoryId === "cold-drinks") {
            return "../assets/images/drinks/cold-drinks.jpg";
        }

        return "";
    }

    function shouldShowAllergens(categoryId) {
        return categoryId === "pancakes" ||
               categoryId === "cakes" ||
               categoryId === "gluten-free" ||
               categoryId === "vegan";
    }

    function getAllergenNumbers(categoryId, itemName) {
        const name = itemName.toLowerCase();

        if (categoryId === "pancakes") {
            return "(1,2,3)";
        }

        if (categoryId === "cakes") {
            if (name.includes("biscuit")) return "(1,6,7)";
            if (name.includes("gingerbread")) return "(1,3,7)";
            if (name.includes("cookie")) return "(1,3,6,7)";
            if (name.includes("brownie")) return "(1,3,6,7)";
            if (name.includes("carrot")) return "(1,3,4,7,8)";
            if (name.includes("cheesecake")) return "(1,3,7,8)";
            if (name.includes("apple")) return "(1,3,7)";
            return "(1,3)";
        }

        if (categoryId === "gluten-free") {
            if (name.includes("lemon")) return "(0,3,7,8)";
            if (name.includes("flapjack")) return "(0,7)";
            if (name.includes("caramel")) return "(0,6,7)";
            if (name.includes("friand")) return "(0,3,7,8)";
            if (name.includes("macaroon")) return "(3,7)";
            if (name.includes("protein")) return "(0,5,6,7,8)";
            if (name.includes("granola")) return "(0,7,8,11)";
            if (name.includes("scone")) return "(0,7,8,11)";
        }

        if (categoryId === "vegan") {
            if (name.includes("oat")) return "(8,11)";
            if (name.includes("peanut")) return "(5,7)";
        }

        return "";
    }

    function createAllergenKey() {
        return `
            <aside class="allergen-key">
                <div class="allergen-key-header">
                    <h3>Allergen Key ♡</h3>
                    <p>Use the numbers beside desserts and pancakes to check allergens.</p>
                </div>

                <div class="allergen-list">
                    <div class="allergen-item"><span class="allergen-icon">1</span><span>Milk</span></div>
                    <div class="allergen-item"><span class="allergen-icon">2</span><span>Eggs</span></div>
                    <div class="allergen-item"><span class="allergen-icon">3</span><span>Gluten</span></div>
                    <div class="allergen-item"><span class="allergen-icon">4</span><span>Nuts</span></div>
                    <div class="allergen-item"><span class="allergen-icon">5</span><span>Soy</span></div>
                    <div class="allergen-item"><span class="allergen-icon">6</span><span>Sesame</span></div>
                    <div class="allergen-item"><span class="allergen-icon">7</span><span>Peanuts</span></div>
                    <div class="allergen-item"><span class="allergen-icon">8</span><span>Tree nuts</span></div>
                    <div class="allergen-item"><span class="allergen-icon">11</span><span>Oats</span></div>
                </div>

                <p class="allergen-note">
                    Please speak to a team member if you need more information.
                </p>
            </aside>
        `;
    }

    function createBadge(item) {
        if (!item.badge) {
            return "";
        }

        if (item.badge === "VG") {
            return `<span class="vegan-badge">VG</span>`;
        }

        return `<span class="gf-badge">GF</span>`;
    }

    function openModal(item) {
        if (!productModal) {
            return;
        }

        modalTitle.textContent = item.name;
        modalDescription.textContent = item.ingredients || item.description || "";
        modalPrice.textContent = item.price;

        if (modalImage) {
            if (item.image) {
                modalImage.classList.remove("placeholder-image");
                modalImage.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            } else {
                modalImage.classList.add("placeholder-image");
                modalImage.innerHTML = `<span>Photo here</span>`;
            }
        }

        modalBadge.classList.remove("gf-modal-badge", "vegan-modal-badge");

        if (item.badge === "GF") {
            modalBadge.textContent = "GF";
            modalBadge.classList.add("gf-modal-badge");
            modalBadge.classList.remove("hidden");
        } else if (item.badge === "VG") {
            modalBadge.textContent = "VG";
            modalBadge.classList.add("vegan-modal-badge");
            modalBadge.classList.remove("hidden");
        } else {
            modalBadge.classList.add("hidden");
        }

        productModal.classList.remove("hidden");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        productModal.classList.add("hidden");
        document.body.classList.remove("modal-open");
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    function createFoodCard(item, categoryId, photoText) {
        const allergenNumbers = shouldShowAllergens(categoryId)
            ? getAllergenNumbers(categoryId, item.name)
            : "";

        return `
            <article class="modern-menu-card" data-name="${item.name}">
                <div class="modern-menu-photo ${item.image ? "" : "placeholder-image"}">
                    ${
                        item.image
                            ? `<img src="${item.image}" alt="${item.name}">`
                            : `<span>${photoText}</span>`
                    }
                </div>

                <div class="modern-menu-body">
                    <div class="modern-menu-title-row">
                        <h3>${item.name}</h3>
                        <strong>${item.price}</strong>
                    </div>

                    <div class="featured-menu-tags">
                        ${createBadge(item)}
                        ${allergenNumbers ? `<span class="inline-allergens">${allergenNumbers}</span>` : ""}
                    </div>
                </div>
            </article>
        `;
    }

    function createDrinkRow(item) {
        return `
            <article class="drink-row">
                <h3>${item.name}</h3>
                <strong>${item.price}</strong>
            </article>
        `;
    }

    function createDrinkSubTabs(category) {
        if (!isDrinkCategory(category.id)) {
            return "";
        }

        if (category.id === "cold-drinks") {
            return `
                <div class="drink-subtabs">
                    <button class="drink-subtab ${currentDrinkSubTab === "iced-coffee" ? "active" : ""}" data-drink-tab="iced-coffee">
                        Iced Coffee
                    </button>

                    <button class="drink-subtab ${currentDrinkSubTab === "iced-tea" ? "active" : ""}" data-drink-tab="iced-tea">
                        Iced Tea
                    </button>

                    <button class="drink-subtab ${currentDrinkSubTab === "milk" ? "active" : ""}" data-drink-tab="milk">
                        Milk
                    </button>

                    <button class="drink-subtab ${currentDrinkSubTab === "syrups" ? "active" : ""}" data-drink-tab="syrups">
                        Syrups
                    </button>
                </div>
            `;
        }

        return `
            <div class="drink-subtabs">
                <button class="drink-subtab ${currentDrinkSubTab === "drinks" ? "active" : ""}" data-drink-tab="drinks">
                    Drinks
                </button>

                <button class="drink-subtab ${currentDrinkSubTab === "milk" ? "active" : ""}" data-drink-tab="milk">
                    Milk
                </button>

                <button class="drink-subtab ${currentDrinkSubTab === "syrups" ? "active" : ""}" data-drink-tab="syrups">
                    Syrups
                </button>
            </div>
        `;
    }

    function getItemsForCategory(category) {
        if (!isDrinkCategory(category.id)) {
            return category.items;
        }

        if (currentDrinkSubTab === "milk") {
            return milkItems;
        }

        if (currentDrinkSubTab === "syrups") {
            return syrupItems;
        }

        if (category.id === "cold-drinks" && currentDrinkSubTab === "iced-tea") {
            return icedTeaItems;
        }

        return category.items;
    }

    function getPhotoText(categoryId) {
        if (categoryId === "pancakes") return "Pancake photo here";
        if (categoryId === "cakes") return "Cake photo here";
        if (categoryId === "gluten-free") return "Gluten free photo here";
        if (categoryId === "scones") return "Scone photo here";
        if (categoryId === "vegan") return "Vegan photo here";

        return "Photo here";
    }

    function showCategory(category) {
        menuEmpty.classList.add("hidden");
        menuPanel.classList.remove("hidden");
        menuPanel.dataset.category = category.id;

        const showAllergenSidebar = shouldShowAllergens(category.id);
        const itemsToShow = getItemsForCategory(category);
        const showCategoryPhoto = category.id === "hot-drinks" || category.id === "cold-drinks";
        const categoryPhoto = getCategoryPhoto(category.id);

        let html = `
            <div class="menu-panel-top ${showCategoryPhoto ? "" : "without-photo"}">
               <div class="menu-panel-text">
    <p class="section-label">${category.title}</p>
    <h2>${category.subtitle}</h2>
    ${category.note ? `<p class="category-note">${category.note}</p>` : ""}
</div>

                ${
                    showCategoryPhoto
                        ? `
                            <div class="menu-photo">
                                <img src="${categoryPhoto}" alt="${category.title}">
                            </div>
                        `
                        : ""
                }
            </div>

            ${createDrinkSubTabs(category)}

            <div class="menu-content-layout ${showAllergenSidebar ? "" : "without-sidebar"}">
                <div class="menu-main-card">
        `;

        if (isDrinkCategory(category.id)) {
            html += `<div class="drink-list">`;

            itemsToShow.forEach(function (item) {
                html += createDrinkRow(item);
            });

            html += `</div>`;

            if (category.note && currentDrinkSubTab !== "milk" && currentDrinkSubTab !== "syrups") {
                html += `<div class="menu-extra-note">${category.note}</div>`;
            }
        } else if (category.id === "scones") {
    html += `
        <div class="scones-layout">
            <div class="scones-list">
                ${itemsToShow.map(function (item) {
                    return createFoodCard(item, category.id, getPhotoText(category.id));
                }).join("")}
            </div>

            <div class="scones-offer">
                <div class="scones-offer-photo scones-offer-photo-top">
                    <img src="../assets/images/menu/scones/scone-offer-top.jpg" alt="Fresh scones with jam">
                </div>

                <div class="scones-offer-content">
                    <p>All scones</p>
                    <strong>€3 each</strong>
                    <span>Cream, jam and butter included</span>
                    <div>♡ Buy 4, get the 5th free</div>
                </div>

                <div class="scones-offer-photo scones-offer-photo-bottom">
                    <img src="../assets/images/menu/scones/scone-offer-bottom.jpg" alt="Homemade scones">
                </div>
            </div>
        </div>
    `;
}else {
            html += `<div class="modern-menu-grid">`;

            itemsToShow.forEach(function (item) {
                html += createFoodCard(item, category.id, getPhotoText(category.id));
            });

            html += `</div>`;

            if (category.id === "pancakes" && category.extras) {
                html += `
                    <div class="pancake-note">
                        ♡ Choose any <strong>3</strong> sauces or toppings with your pancakes.
                    </div>

                    <div class="choice-box">
                        <div>
                            <h3>Sauces</h3>
                            <ul>
                                ${category.extras.sauces.map(function (sauce) {
                                    return `<li>${sauce}</li>`;
                                }).join("")}
                            </ul>
                        </div>

                        <div>
                            <h3>Toppings</h3>
                            <ul>
                                ${category.extras.toppings.map(function (topping) {
                                    return `<li>${topping}</li>`;
                                }).join("")}
                            </ul>
                        </div>
                    </div>
                `;
            }
        }

        html += `
                    <div class="menu-ribbon">
                        ♡ Made fresh to order with quality ingredients.
                    </div>
                </div>

                ${showAllergenSidebar ? createAllergenKey() : ""}
            </div>
        `;

        menuPanel.innerHTML = html;
const mobileAllergenBtn = document.getElementById("mobileAllergenBtn");

if (mobileAllergenBtn) {
    if (showAllergenSidebar) {
        mobileAllergenBtn.classList.remove("hidden");
    } else {
        mobileAllergenBtn.classList.add("hidden");
    }
}
        menuPanel.querySelectorAll(".drink-subtab").forEach(function (button) {
            button.addEventListener("click", function () {
                currentDrinkSubTab = button.dataset.drinkTab;
                showCategory(category);
            });
        });

        menuPanel.querySelectorAll(".modern-menu-card").forEach(function (card) {
            card.addEventListener("click", function () {
                const itemName = card.dataset.name;

                const selectedItem = category.items.find(function (item) {
                    return item.name === itemName;
                });

                if (selectedItem) {
                    openModal(selectedItem);
                }
            });
        });
    }

    menuTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            openCategory(tab.dataset.category);
        });
    });
const mobileAllergenBtn = document.getElementById("mobileAllergenBtn");
const mobileAllergenModal = document.getElementById("mobileAllergenModal");
const mobileAllergenClose = document.getElementById("mobileAllergenClose");

function closeMobileAllergens() {
    if (!mobileAllergenModal) {
        return;
    }

    mobileAllergenModal.classList.add("hidden");
    document.body.style.overflow = "";
}

if (mobileAllergenBtn && mobileAllergenModal) {
    mobileAllergenBtn.addEventListener("click", function () {
        mobileAllergenModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
}

if (mobileAllergenClose) {
    mobileAllergenClose.addEventListener("click", closeMobileAllergens);
}

if (mobileAllergenModal) {
    mobileAllergenModal.addEventListener("click", function (event) {
        if (event.target === mobileAllergenModal) {
            closeMobileAllergens();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMobileAllergens();
    }
});
});