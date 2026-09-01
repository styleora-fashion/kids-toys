```javascript
"use strict";

/* =========================================================
   KIDDOPLAY - MAIN JAVASCRIPT
   Compatible with the supplied KiddoPlay HTML
========================================================= */


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

    const categoryCards =
        document.querySelectorAll(".category-card");

    const noResults =
        document.getElementById("noResults");

    const productButtons =
        document.querySelectorAll(".toy-card .toy-btn");

    const copyright =
        document.querySelector(".copyright");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!navLinks || !menuBtn) {
            return;
        }

        navLinks.classList.remove("active");

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


    function toggleMobileMenu() {

        if (!navLinks || !menuBtn) {
            return;
        }

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
    }


    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navItems =
        document.querySelectorAll(".nav-links a");

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* =====================================================
       TOY FILTER SYSTEM
    ===================================================== */

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

                visibleToys++;

                /*
                   Restart animation
                */

                card.classList.remove("filter-show");

                /*
                   Force browser reflow
                   so animation can restart
                */

                void card.offsetWidth;

                card.classList.add("filter-show");

            } else {

                card.style.display = "none";

                card.classList.remove("filter-show");

            }

        });


        /* No results message */

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

                filterButtons.forEach((btn) => {

                    btn.classList.remove("active");

                });


                button.classList.add("active");


                const selectedFilter =
                    button.dataset.filter;


                if (selectedFilter) {

                    filterToys(
                        selectedFilter
                    );

                }

            }
        );

    });


    /* =====================================================
       CATEGORY CARDS
    ===================================================== */

    categoryCards.forEach((categoryCard) => {

        categoryCard.addEventListener(
            "click",
            () => {

                const selectedCategory =
                    categoryCard.dataset.categoryLink;


                if (!selectedCategory) {
                    return;
                }


                const matchingButton =
                    document.querySelector(
                        `.filter-btn[data-filter="${selectedCategory}"]`
                    );


                if (matchingButton) {

                    matchingButton.click();

                    /*
                       Scroll user back to toys section
                    */

                    const toysSection =
                        document.getElementById("toys");

                    if (toysSection) {

                        toysSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });


    /* =====================================================
       TOYS NAV LINK
    ===================================================== */

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


    /* =====================================================
       AFFILIATE LINKS
    ===================================================== */

    const affiliateLinks =
        document.querySelectorAll(
            "a.affiliate-link"
        );


    affiliateLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        /*
           Only modify valid external URLs.
        */

        if (
            href &&
            (
                href.startsWith("https://") ||
                href.startsWith("http://")
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


        /*
           Track affiliate click
        */

        link.addEventListener(
            "click",
            () => {

                const store =
                    link.dataset.store ||
                    "Unknown Store";

                const product =
                    link.dataset.product ||
                    "Unknown Product";


                console.log(
                    "Affiliate Click",
                    {
                        store: store,
                        product: product,
                        url: href
                    }
                );


                /*
                   Optional Google Analytics support.
                   Works only if gtag exists.
                */

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "affiliate_click",
                        {
                            store: store,
                            product: product
                        }
                    );

                }

            }
        );

    });


    /* =====================================================
       PREVENT EMPTY PRODUCT LINKS
    ===================================================== */

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

                    event.preventDefault();

                    console.warn(
                        "Affiliate URL is missing:",
                        button
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
            ".toy-card, .category-card, .why-card, .affiliate-notice, .store-card"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
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

    } else {

        /*
           Fallback for older browsers
        */

        revealElements.forEach((element) => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinks ||
                !menuBtn ||
                !navLinks.classList.contains("active")
            ) {
                return;
            }


            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedMenuButton =
                menuBtn.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} KiddoPlay. All rights reserved.`;

    }


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterToys("all");


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    console.log(
        "KiddoPlay loaded successfully."
    );

    console.log(
        "Affiliate-ready product system active."
    );

});
```
