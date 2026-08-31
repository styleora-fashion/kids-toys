```javascript
/* =========================
   KIDS TOYS - MAIN JS
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

    });

}


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );
        }

    });

});


/* =========================
   TOY FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const toyCards =
    document.querySelectorAll(".toy-card");

const noResults =
    document.getElementById("noResults");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Remove active state */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active state */

        button.classList.add("active");


        /* Get selected category */

        const filter =
            button.dataset.filter;


        let visibleToys = 0;


        /* Filter cards */

        toyCards.forEach(function (card) {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

                visibleToys++;

            } else {

                card.style.display = "none";

            }

        });


        /* No results message */

        if (noResults) {

            if (visibleToys === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    });

});


/* =========================
   CATEGORY CARDS
========================= */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        const selectedCategory =
            category.dataset.categoryLink;


        if (!selectedCategory) {
            return;
        }


        /* Find matching filter */

        filterButtons.forEach(function (button) {

            if (
                button.dataset.filter ===
                selectedCategory
            ) {

                button.click();

            }

        });

    });

});


/* =========================
   CURRENT YEAR
========================= */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.innerHTML =
        "© " +
        new Date().getFullYear() +
        " Kids Toys. All rights reserved.";

}


/* =========================
   SCROLL REVEAL
========================= */

const cards =
    document.querySelectorAll(
        ".toy-card, .category-card"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    cards.forEach(function (card) {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(15px)";

        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        observer.observe(card);

    });

}


/* =========================
   WEBSITE LOADED
========================= */

console.log(
    "Kids Toys website loaded successfully!"
);
```
