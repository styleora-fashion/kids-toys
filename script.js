```javascript
/* =========================================================
   KIDDOPLAY - MAIN JAVASCRIPT
   Affiliate Kids Toys Website
   Updated: Affiliate Stores + Tracking + Filters
========================================================= */

"use strict";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu() {

    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("active");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-label", "Open menu");
    menuBtn.setAttribute("aria-expanded", "false");
}


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* =========================================================
   CLOSE MENU AFTER NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* =========================================================
   TOY FILTER SYSTEM
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const toyCards =
    document.querySelectorAll(".toy-card");

const noResults =
    document.getElementById("noResults");


function filterToys(filter) {

    let visibleToys = 0;

    toyCards.forEach((card) => {

        const category =
            card.dataset.category || "";

        const shouldShow =
            filter === "all" ||
            category === filter;

        if (shouldShow) {

            card.style.display = "";

            card.style.opacity = "0";
            card.style.transform =
                "translateY(12px)";

            requestAnimationFrame(() => {

                card.style.opacity = "1";
                card.style.transform =
                    "translateY(0)";

            });

            visibleToys++;

        } else {

            card.style.display = "none";

        }

    });


    if (noResults) {

        noResults.style.display =
            visibleToys === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter =
            button.dataset.filter || "all";

        filterToys(selectedFilter);

    });

});


/* =========================================================
   CATEGORY CARD FILTERING
========================================================= */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach((categoryCard) => {

    categoryCard.addEventListener("click", () => {

        const selectedCategory =
            categoryCard.dataset.categoryLink;

        if (!selectedCategory) return;

        const matchingButton =
            document.querySelector(
                `.filter-btn[data-filter="${selectedCategory}"]`
            );

        if (matchingButton) {

            matchingButton.click();

        }

    });

});


/* =========================================================
   TOYS NAVIGATION
   Reset filter to ALL
========================================================= */

const toysNavLink =
    document.querySelector(
        '.nav-links a[href="#toys"]'
    );


if (toysNavLink) {

    toysNavLink.addEventListener("click", () => {

        const allButton =
            document.querySelector(
                '.filter-btn[data-filter="all"]'
            );

        if (allButton) {
            allButton.click();
        }

    });

}


/* =========================================================
   AFFILIATE STORE DATA
========================================================= */

const affiliateStores = {

    "justforkids.pk": {
        name: "JustForKids.pk",
        commission: "Up to 20%",
        cookie: "Application details",
        market: "Pakistan",
        tracking: "Affiliate tracking"
    },

    "montessorigeneration.com": {
        name: "Montessori Generation",
        commission: "25%",
        cookie: "30 days",
        market: "International",
        tracking: "Affiliate tracking"
    },

    "tobouy.com": {
        name: "Tobouy",
        commission: "Up to 15%",
        cookie: "Program details",
        market: "International",
        tracking: "Affiliate tracking"
    },

    "tumama-kids.com": {
        name: "Tumama Kids",
        commission: "10–15%",
        cookie: "30 days",
        market: "International",
        tracking: "Affiliate tracking"
    },

    "thebestkidstoys.com": {
        name: "Best Kids Toys",
        commission: "10%",
        cookie: "Program details",
        market: "International",
        tracking: "Affiliate tracking"
    },

    "sainsmartjr.com": {
        name: "SainSmart Jr.",
        commission: "6%",
        cookie: "Program details",
        market: "International",
        tracking: "Affiliate tracking"
    },

    "schoolcrafts.com.pk": {
        name: "School Crafts Pakistan",
        commission: "5%",
        cookie: "Program details",
        market: "Pakistan",
        tracking: "Affiliate tracking"
    },

    "goto.com.pk": {
        name: "Goto Pakistan",
        commission: "2% Baby/Toys & Kids",
        cookie: "Affiliate tracking",
        market: "Pakistan",
        tracking: "Affiliate tracking"
    }

};


/* =========================================================
   GET STORE INFORMATION
========================================================= */

function getStoreInfo(url) {

    if (!url) return null;

    try {

        const hostname =
            new URL(url).hostname
                .replace("www.", "")
                .toLowerCase();

        for (const domain in affiliateStores) {

            if (hostname.includes(domain)) {

                return affiliateStores[domain];

            }

        }

    } catch (error) {

        console.warn(
            "Invalid affiliate URL:",
            url
        );

    }

    return null;

}


/* =========================================================
   STORE CARDS
   Automatically add affiliate information
========================================================= */

const storeCards =
    document.querySelectorAll(".store-card");


storeCards.forEach((card) => {

    const href =
        card.getAttribute("href");

    const store =
        getStoreInfo(href);

    if (!store) return;


    /*
       Add data attributes so CSS/analytics
       can identify each affiliate store.
    */

    card.dataset.store =
        store.name;

    card.dataset.commission =
        store.commission;

    card.dataset.market =
        store.market;


    /*
       Add affiliate details if they don't
       already exist in HTML.
    */

    let meta =
        card.querySelector(".affiliate-meta");


    if (!meta) {

        meta =
            document.createElement("div");

        meta.className =
            "affiliate-meta";

        meta.innerHTML = `
            <span class="commission-badge">
                ${store.commission} commission
            </span>

            <span class="tracking-badge">
                ${store.cookie}
            </span>
        `;

        const storeInfo =
            card.querySelector(".store-info");

        if (storeInfo) {

            const storeLink =
                storeInfo.querySelector(".store-link");

            if (storeLink) {

                storeInfo.insertBefore(
                    meta,
                    storeLink
                );

            } else {

                storeInfo.appendChild(meta);

            }

        }

    }

});


/* =========================================================
   EXTERNAL LINK SECURITY
========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    );


externalLinks.forEach((link) => {

    link.setAttribute(
        "target",
        "_blank"
    );

    link.setAttribute(
        "rel",
        "nofollow sponsored noopener noreferrer"
    );

});


/* =========================================================
   STORE CLICK TRACKING
========================================================= */

storeCards.forEach((card) => {

    card.addEventListener("click", () => {

        const storeName =
            card.dataset.store ||
            card.querySelector("h3")?.textContent.trim() ||
            "Unknown Store";

        const commission =
            card.dataset.commission ||
            "Unknown";

        console.log(
            "Affiliate store clicked:",
            storeName
        );

        console.log(
            "Commission:",
            commission
        );


        /*
           Google Analytics 4 support.

           If GA4 is installed, this event
           will automatically be sent.
        */

        if (typeof window.gtag === "function") {

            window.gtag(
                "event",
                "affiliate_store_click",
                {
                    store_name: storeName,
                    commission: commission
                }
            );

        }

    });

});


/* =========================================================
   PRODUCT CLICK TRACKING
========================================================= */

const productButtons =
    document.querySelectorAll(
        ".toy-card .toy-btn"
    );


productButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const href =
            button.getAttribute("href");


        /*
           Stop empty # links.
        */

        if (
            !href ||
            href === "#"
        ) {

            event.preventDefault();

            console.warn(
                "Affiliate product URL not added yet:",
                button
            );

            return;

        }


        const card =
            button.closest(".toy-card");

        if (!card) return;


        const productName =
            card.querySelector("h3")?.textContent.trim() ||
            "Unknown Product";

        const productCategory =
            card.querySelector(".product-category")?.textContent.trim() ||
            "Unknown Category";

        const productAge =
            card.querySelector(".age")?.textContent.trim() ||
            "Unknown Age";


        console.log(
            "Affiliate product clicked:",
            productName
        );

        console.log(
            "Category:",
            productCategory
        );

        console.log(
            "Age:",
            productAge
        );


        /*
           Google Analytics 4
        */

        if (typeof window.gtag === "function") {

            window.gtag(
                "event",
                "affiliate_product_click",
                {
                    product_name: productName,
                    category: productCategory,
                    age_group: productAge,
                    destination: href
                }
            );

        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".toy-card, .category-card, .why-card, .affiliate-notice, .store-card"
    );


if (
    "IntersectionObserver" in window &&
    revealElements.length
) {

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal-element"
        );

        observer.observe(element);

    });

}


/* =========================================================
   SMOOTH SCROLL FOR HASH LINKS
========================================================= */

const hashLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


hashLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   ESC KEY
   Close mobile menu
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navLinks?.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.textContent =
        "© " +
        new Date().getFullYear() +
        " KiddoPlay. All rights reserved.";

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeKiddoPlay() {

    /*
       Show all toys initially.
    */

    filterToys("all");


    /*
       Make first filter active.
    */

    filterButtons.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.filter === "all"
        );

    });


    console.log(
        "KiddoPlay loaded successfully."
    );

    console.log(
        "Affiliate store tracking active."
    );

    console.log(
        "Registered affiliate stores:",
        Object.keys(affiliateStores).length
    );

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeKiddoPlay
    );

} else {

    initializeKiddoPlay();

}
```
