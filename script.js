```javascript
/* =========================================================
   KIDDO PLAY - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuBtn.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu after clicking a navigation link */

        const navigationItems = navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.textContent = "☰";
            });

        });

    }


    /* =====================================================
       TOY FILTER SYSTEM
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const toyCards =
        document.querySelectorAll(".toy-card");

    const noResults =
        document.getElementById("noResults");


    function filterToys(category) {

        let visibleCount = 0;

        toyCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;

            const shouldShow =
                category === "all" ||
                cardCategory === category;

            if (shouldShow) {

                card.classList.remove("hidden");

                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (noResults) {

            noResults.hidden = visibleCount !== 0;

            noResults.style.display =
                visibleCount === 0 ? "block" : "none";
        }

    }


    /* Filter button click */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.filter;

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterToys(category);

        });

    });


    /* =====================================================
       CATEGORY CARDS
       ===================================================== */

    const categoryCards =
        document.querySelectorAll(".category-card");

    categoryCards.forEach((card) => {

        card.addEventListener("click", () => {

            const category =
                card.dataset.categoryLink;

            /* Update active filter button */

            filterButtons.forEach((button) => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === category
                );

            });


            /* Apply filter */

            filterToys(category);


            /* Scroll to toys */

            const toysSection =
                document.getElementById("toys");

            if (toysSection) {

                toysSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       AFFILIATE LINK TRACKING
       ===================================================== */

    const affiliateLinks =
        document.querySelectorAll(".affiliate-link");

    affiliateLinks.forEach((link) => {

        link.addEventListener("click", () => {

            const store =
                link.dataset.store || "Unknown Store";

            const product =
                link.dataset.product || "Unknown Product";

            /*
             * Simple console tracking.
             * Later you can connect this with Google Analytics
             * or another analytics platform.
             */

            console.log(
                `Affiliate click: ${store} - ${product}`
            );

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navLinks || !menuBtn) {
            return;
        }

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);

        if (
            navLinks.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navLinks.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuBtn.textContent = "☰";
        }

    });


    /* =====================================================
       ESC KEY - CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && navLinks) {

            navLinks.classList.remove("open");

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.textContent = "☰";
            }

        }

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    filterToys("all");

});
```
