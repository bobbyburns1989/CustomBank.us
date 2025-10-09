// ===================================
// Carousel Module
// Screenshot carousel functionality
// ===================================

import { CAROUSEL_CONFIG } from '../config.js';

let autoScrollInterval = null;

// ===================================
// Auto-scroll Logic
// ===================================
function autoScroll(screenshotTrack) {
    const maxScroll = screenshotTrack.scrollWidth - screenshotTrack.clientWidth;

    if (screenshotTrack.scrollLeft >= maxScroll) {
        screenshotTrack.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        screenshotTrack.scrollBy({
            left: CAROUSEL_CONFIG.scrollAmount,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Start Auto-scroll
// ===================================
function startAutoScroll(screenshotTrack) {
    if (autoScrollInterval) return; // Already running

    autoScrollInterval = setInterval(() => {
        autoScroll(screenshotTrack);
    }, CAROUSEL_CONFIG.autoScrollInterval);
}

// ===================================
// Stop Auto-scroll
// ===================================
function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// ===================================
// Initialize Carousel
// ===================================
export function initCarousel() {
    const screenshotTrack = document.querySelector('.screenshot-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!screenshotTrack || !prevBtn || !nextBtn) return;

    // Manual navigation buttons
    prevBtn.addEventListener('click', () => {
        screenshotTrack.scrollBy({
            left: -CAROUSEL_CONFIG.scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        screenshotTrack.scrollBy({
            left: CAROUSEL_CONFIG.scrollAmount,
            behavior: 'smooth'
        });
    });

    // Start auto-scroll
    startAutoScroll(screenshotTrack);

    // Pause on hover
    if (CAROUSEL_CONFIG.pauseOnHover) {
        screenshotTrack.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });

        screenshotTrack.addEventListener('mouseleave', () => {
            startAutoScroll(screenshotTrack);
        });
    }

    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll(screenshotTrack);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement === screenshotTrack) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoScroll();
    });

    return { screenshotTrack, prevBtn, nextBtn, stopAutoScroll, startAutoScroll };
}

// Export cleanup function
export { stopAutoScroll };
