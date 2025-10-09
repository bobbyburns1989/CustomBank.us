// ===================================
// Analytics Module
// Event tracking and performance monitoring
// ===================================

import { ANALYTICS_CONFIG, APP_STORE_CONFIG } from '../config.js';

// ===================================
// Track Download Button Clicks
// ===================================
export function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('a[href*="apple.com"], a[href*="play.google.com"]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = button.href.includes('apple') ? 'iOS' : 'Android';

            // Analytics tracking placeholder
            // Example: gtag('event', ANALYTICS_CONFIG.downloadClick, { platform: platform });
            console.log(`[Analytics] Download click: ${platform}`);

            // If href is "#", prevent default and show coming soon message
            if (button.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Coming soon! CustomBank will be available on the App Store and Google Play.');
            }
        });
    });
}

// ===================================
// Page Load Performance Tracking
// ===================================
export function trackPagePerformance() {
    window.addEventListener('load', () => {
        // Performance tracking (placeholder)
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
                console.log(`[Performance] Page loaded in ${loadTime}ms`);

                // Example: Send to analytics
                // gtag('event', 'page_load_time', { value: loadTime });
            }
        }
    });
}

// ===================================
// Custom Event Tracking Helper
// ===================================
export function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics integration
    console.log(`[Analytics] Event: ${eventName}`, eventData);

    // Example integrations:
    // Google Analytics: gtag('event', eventName, eventData);
    // Plausible: plausible(eventName, { props: eventData });
    // Custom: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event: eventName, data: eventData }) });
}

// ===================================
// Console Welcome Message (Development)
// ===================================
export function showWelcomeMessage() {
    if (process.env.NODE_ENV === 'development') {
        console.log('%c👋 Welcome to CustomBank!', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
        console.log('%cInterested in the code? Check out our GitHub: https://github.com/custombank', 'font-size: 14px; color: #6B7280;');
    }
}

// ===================================
// Initialize all analytics features
// ===================================
export function initAnalytics() {
    initDownloadTracking();
    trackPagePerformance();
    // showWelcomeMessage(); // Uncomment for development
}
