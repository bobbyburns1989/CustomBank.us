// ===================================
// CustomBank Website JavaScript
// Interactions, animations, and functionality
// ===================================

// Global variables
let premiumButtonInterval = null;

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    // Mobile sticky CTA (show after scrolling past hero)
    if (window.innerWidth <= 768) {
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const stickyCTA = document.querySelector('.mobile-sticky-cta');

            if (!stickyCTA) {
                createMobileStickyCTA();
            } else {
                if (currentScroll > heroBottom) {
                    stickyCTA.classList.add('show');
                } else {
                    stickyCTA.classList.remove('show');
                }
            }
        }
    }

    lastScroll = currentScroll;
});

// ===================================
// Create Mobile Sticky CTA
// ===================================
function createMobileStickyCTA() {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-sticky-cta')) {
        const stickyCTA = document.createElement('div');
        stickyCTA.className = 'mobile-sticky-cta';
        stickyCTA.innerHTML = `
            <a href="https://apps.apple.com/us/app/custombank/id6738460636" class="btn-primary" style="width: 100%; justify-content: center;" target="_blank" rel="noopener noreferrer">
                Download CustomBank
            </a>
        `;
        document.body.appendChild(stickyCTA);
    }
}


// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current FAQ
        if (isActive) {
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===================================
// Animated Statistics Counter
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                stat.removeAttribute('data-target'); // Prevent re-animation
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    statsObserver.observe(statsRow);
}

// ===================================
// Scroll Animation for Elements
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Animate use case items on scroll
const useCaseItems = document.querySelectorAll('.use-case-item');
useCaseItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(item);
});

// Animate testimonial cards on scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    fadeInObserver.observe(card);
});

// ===================================
// Button Pulse Animation for Premium CTA
// ===================================
const premiumButton = document.querySelector('.pricing-card-featured .btn-primary-full');
if (premiumButton) {
    premiumButtonInterval = setInterval(() => {
        premiumButton.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            premiumButton.style.animation = '';
        }, 500);
    }, 5000);
}

// Add pulse keyframe animation dynamically (only if not already added)
if (!document.getElementById('pulse-animation-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation-style';
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Form Validation
// ===================================
// Newsletter form code removed - form not present in HTML
// Add back if newsletter signup feature is implemented

// ===================================
// Keyboard Navigation Enhancements
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ===================================
// Performance: Lazy Load Images (if real images added)
// ===================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// Track Download Button Clicks (Analytics placeholder)
// ===================================
const downloadButtons = document.querySelectorAll('a[href*="apple.com"], a[href*="play.google.com"]');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const platform = button.href.includes('apple') ? 'iOS' : 'Android';

        // Analytics tracking placeholder
        // Example: gtag('event', 'download_click', { platform: platform });

        // If href is "#", prevent default and show coming soon message
        if (button.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Coming soon! CustomBank will be available on the App Store and Google Play.');
        }
    });
});

// ===================================
// Console Welcome Message (Development Only)
// ===================================
// Uncomment for development:
// console.log('%c👋 Welcome to CustomBank!', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
// console.log('%cInterested in the code? Check out our GitHub: https://github.com/custombank', 'font-size: 14px; color: #6B7280;');

// ===================================
// Detect if user prefers reduced motion
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Reduce animation durations
    document.documentElement.style.setProperty('--transition-base', '50ms');
}

// ===================================
// Scroll Progress Bar
// ===================================
function createScrollProgressBar() {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
}

window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// ===================================
// Page Load Performance Tracking
// ===================================
window.addEventListener('load', () => {
    // Create scroll progress bar
    createScrollProgressBar();

    // Performance tracking (placeholder)
    // Uncomment for development:
    // if ('performance' in window) {
    //     const perfData = performance.getEntriesByType('navigation')[0];
    //     if (perfData) {
    //         console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    //     }
    // }
});

// ===================================
// Easter Egg: Konami Code
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        // Add rainbow animation (only if not already added)
        if (!document.getElementById('rainbow-animation-style')) {
            const rainbowStyle = document.createElement('style');
            rainbowStyle.id = 'rainbow-animation-style';
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }

        alert('🎉 You found the secret! Premium unlocked! (Just kidding)');
    }
});

// ===================================
// Cleanup on Page Unload
// ===================================
window.addEventListener('beforeunload', () => {
    // Clear all intervals to prevent memory leaks
    if (premiumButtonInterval) {
        clearInterval(premiumButtonInterval);
    }
});

