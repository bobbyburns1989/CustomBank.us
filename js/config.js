// ===================================
// CustomBank Configuration
// Centralized settings and constants
// ===================================

export const CONFIG = {
    // Carousel Settings
    carousel: {
        scrollAmount: 332,        // 300px width + 32px gap
        autoScrollInterval: 5000, // Auto-scroll every 5 seconds
        pauseOnHover: true
    },

    // Animation Settings
    animation: {
        transitionDuration: 600,  // Default transition in ms
        staggerDelay: 100,        // Stagger delay between elements in ms
        counterDuration: 2000,    // Stats counter animation duration
        pulseDuration: 500,       // Button pulse duration
        pulseInterval: 5000,      // Button pulse interval
        rainbowDuration: 5000     // Easter egg rainbow duration
    },

    // Intersection Observer Settings
    observers: {
        fadeIn: {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        },
        stats: {
            threshold: 0.5
        },
        lazyImages: {
            threshold: 0.01,
            rootMargin: '50px'
        }
    },

    // Navbar Settings
    navbar: {
        scrollThreshold: 50,      // Scroll distance to trigger shadow
        shadowDefault: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        shadowScrolled: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },

    // Accessibility Settings
    accessibility: {
        reducedMotionTransition: '50ms',
        konamiPattern: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    },

    // Analytics Event Names (placeholders)
    analytics: {
        downloadClick: 'download_click',
        faqToggle: 'faq_toggle',
        carouselNavigation: 'carousel_navigation'
    },

    // App Store URLs (when available)
    appStores: {
        ios: '#',  // Replace with actual App Store URL
        android: '#'  // Replace with actual Play Store URL
    }
};

// Export individual configs for convenience
export const {
    carousel: CAROUSEL_CONFIG,
    animation: ANIMATION_CONFIG,
    observers: OBSERVER_CONFIG,
    navbar: NAVBAR_CONFIG,
    accessibility: A11Y_CONFIG,
    analytics: ANALYTICS_CONFIG,
    appStores: APP_STORE_CONFIG
} = CONFIG;
