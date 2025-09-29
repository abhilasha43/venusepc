document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll Animation for Service Boxes ---
    const serviceBoxes = document.querySelectorAll('.service-box');
    if (serviceBoxes.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1
        });
        serviceBoxes.forEach(box => {
            observer.observe(box);
        });
    }

    // --- Achievements Carousel ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.achievement-slide');
    if (slides.length > 0) {
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (index + totalSlides) % totalSlides; // Loop through slides
            slides[currentSlide].classList.add('active');
        }

        // Initialize first slide
        showSlide(currentSlide);

        // Auto-slide every 3.5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 3500);
    }


    // --- Mobile Navigation (Hamburger Menu) ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
            // Toggle icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            // But don't close it if the link is for a dropdown
            if (link.parentElement.classList.contains('has-dropdown')) return;

            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-active')) {
                    mainNav.classList.remove('nav-active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Dropdown Toggle on Mobile ---
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only run on smaller screens where the hamburger is visible
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent link from navigating
                const parentLi = e.target.parentElement;
                parentLi.classList.toggle('open');
            }
        });
    });
});