// ===================================
// Animations Module
// Scroll animations, stats counter, button effects
// ===================================

import { ANIMATION_CONFIG, OBSERVER_CONFIG, A11Y_CONFIG } from '../config.js';

let premiumButtonInterval = null;

// ===================================
// Animated Statistics Counter
// ===================================
function animateCounter(element, target, duration = ANIMATION_CONFIG.counterDuration) {
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
}

// ===================================
// Initialize Stats Counter Animation
// ===================================
export function initStatsCounter() {
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;

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
    }, OBSERVER_CONFIG.stats);

    statsObserver.observe(statsRow);
}

// ===================================
// Scroll-triggered Fade-in Animations
// ===================================
export function initScrollAnimations() {
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, OBSERVER_CONFIG.fadeIn);

    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all ${ANIMATION_CONFIG.transitionDuration}ms ease ${index * ANIMATION_CONFIG.staggerDelay}ms`;
        fadeInObserver.observe(card);
    });

    // Animate use case items
    const useCaseItems = document.querySelectorAll('.use-case-item');
    useCaseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all ${ANIMATION_CONFIG.transitionDuration}ms ease`;
        fadeInObserver.observe(item);
    });

    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all ${ANIMATION_CONFIG.transitionDuration}ms ease ${index * 150}ms`;
        fadeInObserver.observe(card);
    });
}

// ===================================
// Button Pulse Animation
// ===================================
export function initPremiumButtonPulse() {
    const premiumButton = document.querySelector('.pricing-card-featured .btn-primary-full');
    if (!premiumButton) return;

    // Add pulse keyframe animation (only if not already added)
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

    premiumButtonInterval = setInterval(() => {
        premiumButton.style.animation = `pulse ${ANIMATION_CONFIG.pulseDuration}ms ease`;
        setTimeout(() => {
            premiumButton.style.animation = '';
        }, ANIMATION_CONFIG.pulseDuration);
    }, ANIMATION_CONFIG.pulseInterval);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (premiumButtonInterval) {
            clearInterval(premiumButtonInterval);
        }
    });
}

// ===================================
// Lazy Load Images
// ===================================
export function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, OBSERVER_CONFIG.lazyImages);

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Reduced Motion Support
// ===================================
export function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Reduce animation durations
        document.documentElement.style.setProperty('--transition-base', A11Y_CONFIG.reducedMotionTransition);

        // Note: Carousel auto-scroll is handled in carousel.js via visibility API
    }
}

// ===================================
// Easter Egg: Konami Code
// ===================================
export function initKonamiCode() {
    let konamiCode = [];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === A11Y_CONFIG.konamiPattern.join(',')) {
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

            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, ANIMATION_CONFIG.rainbowDuration);

            alert('🎉 You found the secret! Premium unlocked! (Just kidding)');
        }
    });
}

// ===================================
// Initialize all animations
// ===================================
export function initAnimations() {
    initStatsCounter();
    initScrollAnimations();
    initPremiumButtonPulse();
    initLazyImages();
    initReducedMotion();
    initKonamiCode();
}
