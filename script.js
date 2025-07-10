
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '1652624');

document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideCount = slides.length;

    function updateSlider() {
        if (slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (slider && slides.length > 0) {
        updateSlider();
        var slideInterval = setInterval(nextSlide, 5000);
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateSlider();
                    resetInterval();
                });
            });
        }
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    }

    // Lightbox + Accordion + Gallery
    const lightbox = document.querySelector('.lightbox-overlay');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function openLightbox(src, alt, images = [], startIndex = 0) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.focus();
        currentLightboxImages = images;
        currentLightboxIndex = startIndex;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        lightboxImg.alt = '';
        currentLightboxImages = [];
        currentLightboxIndex = 0;
    }

    function showLightboxImage(index) {
        if (!currentLightboxImages.length) return;
        if (index < 0) index = currentLightboxImages.length - 1;
        if (index >= currentLightboxImages.length) index = 0;
        currentLightboxIndex = index;
        lightboxImg.src = currentLightboxImages[index].src;
        lightboxImg.alt = currentLightboxImages[index].alt;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    let touchStartX = 0, touchStartY = 0;
    lightbox.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });

    lightbox.addEventListener('touchend', e => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 50) {
            deltaX > 0 ? showLightboxImage(currentLightboxIndex - 1) : showLightboxImage(currentLightboxIndex + 1);
        } else if (deltaY > 80 && Math.abs(deltaX) < 50) closeLightbox();
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const largeImage = item.querySelector('.large-image');
        const thumbnails = Array.from(item.querySelectorAll('.thumbnail-container img'));
        const prevBtn = item.querySelector('.prev-btn');
        const nextBtn = item.querySelector('.next-btn');
        let currentIndex = 0;

        header.addEventListener('click', () => {
            const isOpen = content.classList.contains('open');
            accordionItems.forEach(i => {
                i.querySelector('.accordion-content').classList.remove('open');
                i.querySelector('.accordion-header').classList.remove('active');
            });
            if (!isOpen) {
                content.classList.add('open');
                header.classList.add('active');
            }
        });

        function updateLargeImage(index) {
            currentIndex = index;
            largeImage.src = thumbnails[index].src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[index].classList.add('active');
        }

        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => updateLargeImage(idx));
        });

        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = thumbnails.length - 1;
            updateLargeImage(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= thumbnails.length) newIndex = 0;
            updateLargeImage(newIndex);
        });

        largeImage.addEventListener('click', () => {
            openLightbox(largeImage.src, largeImage.alt, thumbnails, currentIndex);
        });

        updateLargeImage(0);
    });

    if (accordionItems.length) {
        accordionItems[0].querySelector('.accordion-content').classList.add('open');
        accordionItems[0].querySelector('.accordion-header').classList.add('active');
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
            nameError.style.display = emailError.style.display = messageError.style.display = 'none';

            if (nameInput.value.trim() === '') { nameError.style.display = 'block'; isValid = false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) { emailError.style.display = 'block'; isValid = false; }
            if (messageInput.value.trim() === '') { messageError.style.display = 'block'; isValid = false; }

            if (isValid) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });

        nameInput.addEventListener('input', () => { if (nameInput.value.trim()) nameError.style.display = 'none'; });
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value.trim())) emailError.style.display = 'none';
        });
        messageInput.addEventListener('input', () => { if (messageInput.value.trim()) messageError.style.display = 'none'; });
    }

    // Scroll to top button
    window.onscroll = function () {
        let btn = document.getElementById("scrollTopBtn");
        if (btn) {
            btn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
        }
    };
    const topBtn = document.getElementById("scrollTopBtn");
    if (topBtn) {
        topBtn.onclick = function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
