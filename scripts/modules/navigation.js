// ===================================
// Navigation Module
// Handles mobile menu, smooth scroll, navbar effects
// ===================================

export function initNavigation() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
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

    // Navbar Background on Scroll
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

    // ESC key closes mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Create Mobile Sticky CTA
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
