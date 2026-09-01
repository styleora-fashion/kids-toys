```javascript
/* =========================================================
   KIDDOPLAY
   MAIN JAVASCRIPT
   Version: 2026
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const toyCards =
        document.querySelectorAll(".toy-card");

    const noResults =
        document.getElementById("noResults");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const toysNavLink =
        document.querySelector(
            '.nav-links a[href="#toys"]'
        );

    const copyright =
        document.querySelector(".copyright");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!navLinks) return;

        navLinks.classList.remove("active");

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }


    function toggleMobileMenu() {

        if (!navLinks) return;

        const isOpen =
            navLinks.classList.toggle("active");

        if (menuBtn) {

            menuBtn.textContent =
                isOpen ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }

    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* Close menu when navigation link is clicked */

    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* Close menu with Escape */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       TOY FILTER SYSTEM
    ===================================================== */

    function showToy(card) {

        card.style.display = "";

        /*
         * Force browser to notice the animation
         */

        card.classList.remove("filter-show");

        void card.offsetWidth;

        card.classList.add("filter-show");

    }


    function hideToy(card) {

        card.classList.remove("filter-show");

        card.style.display = "none";

    }


    function filterToys(selectedFilter = "all") {

        let visibleToys = 0;

        toyCards.forEach((card) => {

            const category =
                card.dataset.category || "";

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;


            if (shouldShow) {

                showToy(card);

                visibleToys++;

            } else {

                hideToy(card);

            }

        });


        /* ---------------------------------------------
           NO RESULTS MESSAGE
        --------------------------------------------- */

        if (noResults) {

            noResults.style.display =
                visibleToys === 0
                    ? "block"
                    : "none";

        }

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter || "all";


                /* Active button */

                filterButtons.forEach((btn) => {

                    btn.classList.remove("active");

                    btn.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                });


                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );


                /* Filter products */

                filterToys(selectedFilter);

            }
        );

    });


    /* =====================================================
       CATEGORY CARDS
    ===================================================== */

    categoryCards.forEach((categoryCard) => {

        categoryCard.addEventListener(
            "click",
            (event) => {

                /*
                 * Prevent accidental double navigation
                 * from nested elements.
                 */

                const selectedCategory =
                    categoryCard.dataset.categoryLink;


                if (!selectedCategory) {
                    return;
                }


                const matchingButton =
                    document.querySelector(
                        `.filter-btn[data-filter="${selectedCategory}"]`
                    );


                if (!matchingButton) {
                    return;
                }


                /*
                 * Activate category filter
                 */

                matchingButton.click();


                /*
                 * Scroll to toys section
                 */

                const toysSection =
                    document.getElementById("toys");


                if (toysSection) {

                    setTimeout(() => {

                        toysSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 50);

                }

            }
        );

    });


    /* =====================================================
       TOYS NAVIGATION
       Reset filter to ALL
    ===================================================== */

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


    /* =====================================================
       AFFILIATE LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        );


    externalLinks.forEach((link) => {

        /*
         * Do not modify internal GitHub Pages links.
         */

        const href =
            link.getAttribute("href");


        if (!href) return;


        try {

            const url =
                new URL(href);

            const currentHost =
                window.location.hostname;


            /*
             * External website
             */

            if (
                url.hostname !== currentHost
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

        } catch (error) {

            console.warn(
                "Invalid external URL:",
                href
            );

        }

    });


    /* =====================================================
       PRODUCT CLICK TRACKING
    ===================================================== */

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


                if (!card) return;


                const productName =
                    card.querySelector("h3");


                const category =
                    card.dataset.category || "";


                const product =
                    productName
                        ? productName.textContent.trim()
                        : "Unknown product";


                /*
                 * Console tracking
                 */

                console.log(
                    "KiddoPlay affiliate click:",
                    {
                        product: product,
                        category: category,
                        url: button.href
                    }
                );


                /*
                 * Google Analytics support
                 *
                 * If GA4 is installed, this event
                 * will automatically be sent.
                 */

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "affiliate_click",
                        {
                            product_name: product,
                            product_category: category,
                            destination: button.href
                        }
                    );

                }

            }
        );

    });


    /* =====================================================
       STORE CLICK TRACKING
    ===================================================== */

    const storeLinks =
        document.querySelectorAll(
            ".store-card"
        );


    storeLinks.forEach((store) => {

        store.addEventListener(
            "click",
            () => {

                const storeName =
                    store.querySelector("h3");


                const name =
                    storeName
                        ? storeName.textContent.trim()
                        : "Unknown store";


                console.log(
                    "KiddoPlay store click:",
                    name
                );


                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "store_click",
                        {
                            store_name: name,
                            destination: store.href
                        }
                    );

                }

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".toy-card, " +
            ".category-card, " +
            ".why-card, " +
            ".store-card, " +
            ".affiliate-notice, " +
            ".deals-section, " +
            ".about"
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
                    threshold: 0.08,
                    rootMargin: "0px 0px -30px 0px"
                }
            );


        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(element);

        });

    } else {

        /*
         * Fallback for old browsers
         */

        revealElements.forEach((element) => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =====================================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbar =
                        document.querySelector(
                            ".navbar"
                        );


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });


                    /*
                     * Update browser URL
                     */

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                }
            );

        });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} KiddoPlay. All rights reserved.`;

    }


    /* =====================================================
       INITIALIZE FILTERS
    ===================================================== */

    filterButtons.forEach((button) => {

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active")
                ? "true"
                : "false"
        );

    });


    /*
     * IMPORTANT:
     * Initial state must NEVER show
     * "No toys found".
     */

    if (toyCards.length) {

        filterToys("all");

    } else if (noResults) {

        noResults.style.display = "none";

    }


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * Close mobile menu when switching
             * to desktop width.
             */

            if (
                window.innerWidth > 700 &&
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       PAGE LOAD COMPLETE
    ===================================================== */

    console.log(
        "KiddoPlay initialized successfully."
    );

    console.log(
        `Products loaded: ${toyCards.length}`
    );

    console.log(
        `Stores loaded: ${storeLinks.length}`
    );

});
```
