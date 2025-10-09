// ===================================
// CustomBank - Main JavaScript Entry Point
// Modular architecture for better maintainability
// ===================================

// Import all modules
import { initNavigation } from './modules/navigation.js';
import { initCarousel } from './modules/carousel.js';
import { initFAQ } from './modules/faq.js';
import { initAnimations } from './modules/animations.js';
import { initAnalytics } from './modules/analytics.js';

// ===================================
// Initialize Application
// ===================================
function init() {
    // Initialize all modules
    initNavigation();
    initCarousel();
    initFAQ();
    initAnimations();
    initAnalytics();

    // Log initialization in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c✅ CustomBank Initialized', 'color: #10B981; font-weight: bold; font-size: 14px;');
        console.log('%cModules loaded: Navigation, Carousel, FAQ, Animations, Analytics', 'color: #6B7280; font-size: 12px;');
    }
}

// ===================================
// Run initialization when DOM is ready
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded
    init();
}

// ===================================
// Export for debugging (development only)
// ===================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.CustomBank = {
        version: '2.0.0',
        modules: {
            navigation: initNavigation,
            carousel: initCarousel,
            faq: initFAQ,
            animations: initAnimations,
            analytics: initAnalytics
        }
    };
}
