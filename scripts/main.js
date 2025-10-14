// ===================================
// CustomBank Website - Main JavaScript Entry Point
// ES6 Modules Architecture
// ===================================

// Import all modules
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initInteractions } from './modules/interactions.js';
import { initAnalytics } from './modules/analytics.js';
import { initUtils, cleanup } from './modules/utils.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[CustomBank] Initializing modules...');

    // Initialize each module
    initNavigation();
    initAnimations();
    initInteractions();
    initAnalytics();
    initUtils();

    console.log('[CustomBank] All modules initialized successfully!');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    cleanup();
});

/*
 * Module Structure:
 *
 * modules/navigation.js - Mobile menu, smooth scroll, navbar effects
 * modules/animations.js - Intersection observers, scroll animations, counters
 * modules/interactions.js - FAQ accordion, interactive elements
 * modules/analytics.js - Download tracking, analytics events
 * modules/utils.js - Helper functions, performance, accessibility, easter eggs
 */
