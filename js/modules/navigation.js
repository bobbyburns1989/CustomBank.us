// ===================================
// Navigation Module
// Mobile menu, smooth scroll, navbar effects
// ===================================

import { NAVBAR_CONFIG } from '../config.js';

// ===================================
// Mobile Menu Toggle
// ===================================
export function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    return { mobileMenuToggle, navLinks };
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
export function initSmoothScroll() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

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
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
}

// ===================================
// Navbar Background on Scroll
// ===================================
export function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > NAVBAR_CONFIG.scrollThreshold) {
            navbar.style.boxShadow = NAVBAR_CONFIG.shadowScrolled;
        } else {
            navbar.style.boxShadow = NAVBAR_CONFIG.shadowDefault;
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// Initialize all navigation features
// ===================================
export function initNavigation() {
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
}
