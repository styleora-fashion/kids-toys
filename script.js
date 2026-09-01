```javascript
/* =========================================================
   KIDDOPLAY - MAIN JAVASCRIPT
   Affiliate Kids Toys Website
========================================================= */

"use strict";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        /* Change hamburger icon */

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

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
            card.dataset.category;


        const shouldShow =
            filter === "all" ||
            category === filter;


        if (shouldShow) {

            card.style.display = "";

            /* Small animation reset */

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


    /* No results */

    if (noResults) {

        noResults.style.display =
            visibleToys === 0
                ? "block"
                : "none";

    }

}


/* Filter button events */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        /* Add active class */

        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;


        filterToys(selectedFilter);

    });

});


/* =========================================================
   CATEGORY CARD FILTERING
========================================================= */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach((categoryCard) => {

    categoryCard.addEventListener(
        "click",
        () => {

            const selectedCategory =
                categoryCard.dataset.categoryLink;


            if (!selectedCategory) {
                return;
            }


            /* Find matching filter */

            const matchingButton =
                document.querySelector(
                    `.filter-btn[data-filter="${selectedCategory}"]`
                );


            if (matchingButton) {

                matchingButton.click();

            }

        }
    );

});


/* =========================================================
   RESET TO ALL TOYS WHEN "TOYS" NAV IS CLICKED
========================================================= */

const toysNavLink =
    document.querySelector(
        '.nav-links a[href="#toys"]'
    );


if (toysNavLink) {

    toysNavLink.addEventListener(
        "click",
        () => {

            const allButton =
                document.querySelector(
                    '.filter-btn[data-filter="all"]'
                );

            if (allButton) {
                allButton.click();
            }

        }
    );

}


/* =========================================================
   AFFILIATE LINK TRACKING
========================================================= */

/*
   IMPORTANT:

   Replace href="#" in your HTML with your
   real affiliate URLs.

   Example:

   https://example.com/product?ref=YOUR-ID

   The code below automatically detects
   affiliate links and opens them safely.
*/

const affiliateLinks =
    document.querySelectorAll(
        'a[href]:not([href^="#"])'
    );


affiliateLinks.forEach((link) => {

    const href =
        link.getAttribute("href");


    if (
        href &&
        href !== "#" &&
        (
            href.startsWith("http://") ||
            href.startsWith("https://")
        )
    ) {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "nofollow sponsored noopener"
        );

    }

});


/* =========================================================
   PRODUCT CLICK TRACKING
========================================================= */

/*
   This gives you a simple way to see
   which product was clicked in the browser console.

   Later, this can be connected to Google Analytics.
*/

const productButtons =
    document.querySelectorAll(
        ".toy-card .toy-btn"
    );


productButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(".toy-card");


            if (!card) {
                return;
            }


            const productName =
                card.querySelector("h3");


            const productCategory =
                card.querySelector(
                    ".product-category"
                );


            console.log(
                "Affiliate product clicked:",
                productName
                    ? productName.textContent.trim()
                    : "Unknown product"
            );


            console.log(
                "Category:",
                productCategory
                    ? productCategory.textContent.trim()
                    : "Unknown category"
            );

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".toy-card, .category-card, .why-card, .affiliate-notice"
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
   ESC KEY - CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove(
                "active"
            );

            if (menuBtn) {

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   PREVENT EMPTY AFFILIATE LINKS
========================================================= */

productButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            const href =
                button.getAttribute("href");


            if (
                !href ||
                href === "#"
            ) {

                /*
                   During development, prevent the
                   page from jumping to the top.
                */

                event.preventDefault();

                console.warn(
                    "Affiliate link not added yet:",
                    button
                );

            }

        }
    );

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Show all toys initially */

        filterToys("all");


        console.log(
            "KiddoPlay loaded successfully."
        );

        console.log(
            "Affiliate-ready product system active."
        );

    }
);
```
