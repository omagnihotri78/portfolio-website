/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("open");

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".section, .hero-content, .hero-image"
    );


const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.12
    }

);


animatedElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const whatsappNumber = "918349994418";

        const whatsappMessage =
            "Hello, Om.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Subject: " + subject + "\n" +
            "Message: " + message;

        const whatsappURL ="https://wa.me/" +whatsappNumber +"?text=" +encodeURIComponent(whatsappMessage);

            window.open(whatsappURL, "_blank");

            contactForm.reset();
    });
}


/* =========================================================
   INITIAL HERO ANIMATION
========================================================= */

window.addEventListener("load", function () {

    const heroContent =
        document.querySelector(".hero-content");

    const heroImage =
        document.querySelector(".hero-image");


    if (heroContent) {

        setTimeout(function () {

            heroContent.classList.add("show");

        }, 200);

    }


    if (heroImage) {

        setTimeout(function () {

            heroImage.classList.add("show");

        }, 500);

    }

});