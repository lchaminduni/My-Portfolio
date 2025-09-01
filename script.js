// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');
            }
        });
    }

    // Scroll animations for elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add fade-in class to elements that should animate
    function addFadeInClasses() {
        const elementsToAnimate = [
            '.about-content',
            '.skill-category',
            '.project-card',
            '.achievement-card',
            '.contact-content'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }

    // Initialize animations
    addFadeInClasses();
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        animateSkillBars();
        animateOnScroll();
    });

    // Trigger animations on load
    animateSkillBars();
    animateOnScroll();

    // Contact form handling
// In script.js, replace the existing contactForm event listener

const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]'); // Get the submit button

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Change button text to show it's sending
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Send the email using EmailJS
    emailjs.sendForm('service_1r07y1a', 'template_44dgtub', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset(); // Clear the form
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        })
        .finally(function() {
            // Restore button text and state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

// You can keep your existing isValidEmail and showNotification functions as they are.


    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Typing animation for hero title
    function typeWriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = "Hi, I'm Lihini Senevirathna";
        const highlightText = "Lihini Senevirathna";
        
        // Reset content
        heroTitle.innerHTML = '';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (i === text.indexOf(highlightText)) {
                    // Start highlight span
                    heroTitle.innerHTML += '<span class="highlight">';
                }
                heroTitle.innerHTML += char;
                if (i === text.indexOf(highlightText) + highlightText.length - 1) {
                    // End highlight span
                    heroTitle.innerHTML += '</span>';
                }
                i++;
                setTimeout(type, 100);
            }
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // Initialize typing animation
    typeWriter();

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Achievement cards animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Smooth reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(function() {
            animateSkillBars();
            animateOnScroll();
        }, 500);
    });

    // Preload images
    function preloadImages() {
        const images = [
            'img/profile.jpg',
            'img/about.jpg',
            'img/project1.jpg',
            'img/project2.jpg',
            'img/project3.jpg'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();

    // Add custom cursor effect (optional)
    function addCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });

        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .achievement-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize custom cursor on desktop only
    if (window.innerWidth > 768) {
        addCustomCursor();
    }
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can go here
}, 10);

// Certificate slider for 4th achievement
const slider = document.querySelector('.achievement-slider .slides');
const prevBtn = document.querySelector('.achievement-slider .prev');
const nextBtn = document.querySelector('.achievement-slider .next');
const slides = document.querySelectorAll('.achievement-slider img');

let currentIndex = 0;

function updateSlider() {
  const width = slides[0].clientWidth;
  slider.style.transform = `translateX(${-currentIndex * width}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

window.addEventListener('resize', updateSlider);

// Modal logic
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".img-modal .close");
const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");

const certImages = document.querySelectorAll(".achievement-card img");
let modalIndex = 0;

function openModal(index) {
  modal.style.display = "block";
  modalImg.src = certImages[index].src;
  captionText.innerHTML = certImages[index].alt;
  modalIndex = index;
}

certImages.forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

modalPrev.addEventListener("click", () => {
  modalIndex = (modalIndex - 1 + certImages.length) % certImages.length;
  openModal(modalIndex);
});
modalNext.addEventListener("click", () => {
  modalIndex = (modalIndex + 1) % certImages.length;
  openModal(modalIndex);
});

window.addEventListener('scroll', optimizedScrollHandler);

