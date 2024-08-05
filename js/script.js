function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        setTimeout(() => {
            navMenu.style.display = 'none';
        }, 500);
        hamburgerBtn.classList.remove('active');
    } else {
        navMenu.style.display = 'flex';
        setTimeout(() => {
            navMenu.classList.add('show');
        }, 10);
        hamburgerBtn.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Content toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceItem = this.closest('.service-item');
            const content = serviceItem.querySelector('.service-content');
            const contentInner = content.querySelector('p');
            
            // Close all other open items
            serviceItems.forEach(item => {
                if (item !== serviceItem && item.querySelector('.service-content').classList.contains('active')) {
                    const itemContent = item.querySelector('.service-content');
                    const itemContentInner = itemContent.querySelector('p');
                    itemContent.classList.remove('active');
                    item.querySelector('.toggle-btn').classList.remove('active');
                    gsap.to(itemContentInner, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            gsap.to(itemContent, {
                                height: 0,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        }
                    });
                }
            });

            // Toggle the clicked item
            this.classList.toggle('active');
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                gsap.to(contentInner, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(content, {
                            height: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            } else {
                content.classList.add('active');
                gsap.set(content, { height: 'auto' });
                gsap.from(content, {
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(contentInner, {
                            opacity: 1,
                            duration: 0.2
                        });
                    }
                });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let startX, currentTranslate, prevTranslate = 0, isDragging = false, animationID;

    function setPositionByIndex() {
        currentTranslate = currentIndex * -testimonials[0].offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function setSliderPosition() {
        testimonialsWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateTestimonials() {
        setPositionByIndex();
        updateDots();
    }

    function moveTestimonial(direction) {
        currentIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
        updateTestimonials();
    }

    prevBtn.addEventListener('click', () => moveTestimonial(-1));
    nextBtn.addEventListener('click', () => moveTestimonial(1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonials();
        });
    });

    // Dragging functionality
    function touchStart(event) {
        startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        testimonialsWrapper.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (isDragging) {
            const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = prevTranslate + diff;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        testimonialsWrapper.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        if (Math.abs(movedBy) > testimonials[0].offsetWidth / 4) {
            if (movedBy < 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
        }

        currentIndex = Math.max(0, Math.min(currentIndex, testimonials.length - 1));
        updateTestimonials();
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    testimonialsWrapper.addEventListener('mousedown', touchStart);
    testimonialsWrapper.addEventListener('touchstart', touchStart);
    testimonialsWrapper.addEventListener('mousemove', touchMove);
    testimonialsWrapper.addEventListener('touchmove', touchMove);
    testimonialsWrapper.addEventListener('mouseup', touchEnd);
    testimonialsWrapper.addEventListener('touchend', touchEnd);
    testimonialsWrapper.addEventListener('mouseleave', touchEnd);

    // Handle window resize
    window.addEventListener('resize', updateTestimonials);

    // Initial setup
    updateTestimonials();

    // Optional: Auto-scroll functionality
    function autoScroll() {
        if (!isDragging) moveTestimonial(1);
    }

    let autoScrollInterval = setInterval(autoScroll, 5000);

    // Pause auto-scroll on user interaction
    testimonialsWrapper.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    testimonialsWrapper.addEventListener('mouseleave', () => autoScrollInterval = setInterval(autoScroll, 2500));
});


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}