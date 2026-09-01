```javascript
/* =========================================================
   KIDDOPLAY - MAIN JAVASCRIPT
   FIXED VERSION
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const toyCards =
        document.querySelectorAll(".toy-card");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const noResults =
        document.getElementById("noResults");

    const storeCards =
        document.querySelectorAll(".store-card");

    const productButtons =
        document.querySelectorAll(".toy-card .toy-btn");



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMenu() {

        if (!navLinks || !menuBtn) return;

        navLinks.classList.remove("active");

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


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const opened =
                navLinks.classList.toggle("active");

            menuBtn.textContent =
                opened ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                opened
                    ? "Close menu"
                    : "Open menu"
            );

        });

    }


    /* Close mobile menu after navigation */

    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });



    /* =====================================================
       TOY FILTER
    ===================================================== */

    function filterToys(category) {

        let visibleCount = 0;


        toyCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;


            const show =
                category === "all" ||
                cardCategory === category;


            if (show) {

                card.style.display = "";

                visibleCount++;


                /* Re-trigger animation */

                card.classList.remove(
                    "filter-show"
                );

                void card.offsetWidth;

                card.classList.add(
                    "filter-show"
                );

            } else {

                card.style.display = "none";

            }

        });


        /* No result message */

        if (noResults) {

            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }



    /* =====================================================
       FILTER BUTTON CLICK
    ===================================================== */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selected =
                    button.dataset.filter;

                if (!selected) return;


                /* Active button */

                filterButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                /* Filter toys */

                filterToys(selected);


                /*
                   Update URL hash without
                   creating unnecessary page jump.
                */

                if (
                    window.history &&
                    window.history.replaceState
                ) {

                    const hash =
                        selected === "all"
                            ? "#toys"
                            : "#toys-" + selected;

                    window.history.replaceState(
                        null,
                        "",
                        hash
                    );

                }

            }
        );

    });



    /* =====================================================
       CATEGORY CARD CLICK
    ===================================================== */

    categoryCards.forEach((categoryCard) => {

        categoryCard.addEventListener(
            "click",
            (event) => {

                const category =
                    categoryCard.dataset.categoryLink;

                if (!category) return;


                const matchingButton =
                    document.querySelector(
                        `.filter-btn[data-filter="${category}"]`
                    );


                if (matchingButton) {

                    /*
                       Prevent default anchor
                       jump so filter happens first.
                    */

                    event.preventDefault();

                    matchingButton.click();


                    const toysSection =
                        document.getElementById(
                            "toys"
                        );


                    if (toysSection) {

                        setTimeout(() => {

                            toysSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }, 50);

                    }

                }

            }
        );

    });



    /* =====================================================
       TOYS NAV LINK
       Always reset to ALL
    ===================================================== */

    const toysNav =
        document.querySelector(
            '.nav-links a[href="#toys"]'
        );


    if (toysNav) {

        toysNav.addEventListener(
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
       AFFILIATE STORE INFORMATION
    ===================================================== */

    const affiliateStores = {

        "justforkids.pk": {
            name: "JustForKids.pk",
            commission: "Up to 20%",
            cookie: "Application details",
            market: "Pakistan"
        },

        "montessorigeneration.com": {
            name: "Montessori Generation",
            commission: "25%",
            cookie: "30 days",
            market: "International"
        },

        "tobouy.com": {
            name: "Tobouy",
            commission: "Up to 15%",
            cookie: "Program details",
            market: "International"
        },

        "tumama-kids.com": {
            name: "Tumama Kids",
            commission: "10–15%",
            cookie: "30 days",
            market: "International"
        },

        "thebestkidstoys.com": {
            name: "Best Kids Toys",
            commission: "10%",
            cookie: "Program details",
            market: "International"
        },

        "sainsmartjr.com": {
            name: "SainSmart Jr.",
            commission: "6%",
            cookie: "Program details",
            market: "International"
        },

        "schoolcrafts.com.pk": {
            name: "School Crafts Pakistan",
            commission: "5%",
            cookie: "Program details",
            market: "Pakistan"
        },

        "goto.com.pk": {
            name: "Goto Pakistan",
            commission: "2% Baby/Toys & Kids",
            cookie: "Affiliate tracking",
            market: "Pakistan"
        }

    };



    /* =====================================================
       FIND STORE
    ===================================================== */

    function getStore(url) {

        if (!url) return null;

        try {

            const hostname =
                new URL(url)
                    .hostname
                    .replace(/^www\./, "")
                    .toLowerCase();


            const domain =
                Object.keys(affiliateStores)
                    .find((item) =>
                        hostname === item ||
                        hostname.endsWith("." + item)
                    );


            return domain
                ? affiliateStores[domain]
                : null;

        } catch (error) {

            return null;

        }

    }



    /* =====================================================
       ADD STORE META
    ===================================================== */

    storeCards.forEach((card) => {

        const url =
            card.getAttribute("href");

        const store =
            getStore(url);


        if (!store) return;


        /* Store data */

        card.dataset.store =
            store.name;

        card.dataset.commission =
            store.commission;

        card.dataset.cookie =
            store.cookie;

        card.dataset.market =
            store.market;


        /*
           Don't duplicate metadata
           if HTML already contains it.
        */

        if (
            card.querySelector(
                ".affiliate-meta"
            )
        ) {
            return;
        }


        const storeInfo =
            card.querySelector(
                ".store-info"
            );


        if (!storeInfo) return;


        const meta =
            document.createElement("div");

        meta.className =
            "affiliate-meta";


        meta.innerHTML = `
            <span class="commission-badge">
                ${store.commission}
            </span>

            <span class="tracking-badge">
                ${store.cookie}
            </span>
        `;


        const storeLink =
            storeInfo.querySelector(
                ".store-link"
            );


        if (storeLink) {

            storeInfo.insertBefore(
                meta,
                storeLink
            );

        } else {

            storeInfo.appendChild(meta);

        }

    });



    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        )
        .forEach((link) => {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "nofollow sponsored noopener noreferrer"
            );

        });



    /* =====================================================
       STORE CLICK TRACKING
    ===================================================== */

    storeCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                const storeName =
                    card.dataset.store ||
                    "Unknown Store";


                const commission =
                    card.dataset.commission ||
                    "Unknown";


                console.log(
                    "KiddoPlay Affiliate Store:",
                    storeName
                );

                console.log(
                    "Commission:",
                    commission
                );


                /*
                   Google Analytics 4
                   works automatically if
                   gtag is installed.
                */

                if (
                    typeof window.gtag ===
                    "function"
                ) {

                    window.gtag(
                        "event",
                        "affiliate_store_click",
                        {
                            store_name:
                                storeName,

                            commission:
                                commission
                        }
                    );

                }

            }
        );

    });



    /* =====================================================
       PRODUCT CLICK TRACKING
    ===================================================== */

    productButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                const url =
                    button.getAttribute(
                        "href"
                    );


                /*
                   Prevent empty links.
                */

                if (
                    !url ||
                    url === "#"
                ) {

                    event.preventDefault();

                    const card =
                        button.closest(
                            ".toy-card"
                        );


                    const name =
                        card?.querySelector(
                            "h3"
                        )?.textContent.trim()
                        || "Unknown Product";


                    console.warn(
                        "KiddoPlay: Add affiliate URL for:",
                        name
                    );

                    return;

                }


                const card =
                    button.closest(
                        ".toy-card"
                    );


                if (!card) return;


                const productName =
                    card.querySelector(
                        "h3"
                    )?.textContent.trim()
                    || "Unknown Product";


                const category =
                    card.querySelector(
                        ".product-category"
                    )?.textContent.trim()
                    || "Unknown";


                console.log(
                    "Affiliate Product:",
                    productName
                );

                console.log(
                    "Category:",
                    category
                );


                /*
                   Google Analytics 4
                */

                if (
                    typeof window.gtag ===
                    "function"
                ) {

                    window.gtag(
                        "event",
                        "affiliate_product_click",
                        {
                            product_name:
                                productName,

                            category:
                                category,

                            destination:
                                url
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
            ".affiliate-notice, " +
            ".store-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerObject) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );


                                observerObject.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal-element"
                );

                observer.observe(
                    element
                );

            }
        );

    } else {

        /*
           Fallback for older browsers.
        */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }



    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const copyright =
        document.querySelector(
            ".copyright"
        );


    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} KiddoPlay. All rights reserved.`;

    }



    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterToys("all");


    filterButtons.forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );

        }
    );


    /* =====================================================
       CONSOLE STATUS
    ===================================================== */

    console.log(
        "KiddoPlay JS initialized successfully."
    );

    console.log(
        `Affiliate stores detected: ${storeCards.length}`
    );

});
```
   
   
  
