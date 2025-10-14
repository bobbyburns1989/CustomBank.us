// ===================================
// Utils Module
// Helper functions, performance tracking, accessibility
// ===================================

export function initUtils() {
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Reduce animation durations
        document.documentElement.style.setProperty('--transition-base', '50ms');
    }

    // Scroll Progress Bar
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

    // Page Load Performance Tracking
    window.addEventListener('load', () => {
        // Create scroll progress bar
        createScrollProgressBar();

        // Performance tracking (placeholder)
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`[Performance] Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }
        }
    });

    // Easter Egg: Konami Code
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

    // Console Welcome Message
    console.log('%c👋 Welcome to CustomBank!', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
    console.log('%cInterested in the code? This website uses modern ES6 modules!', 'font-size: 14px; color: #6B7280;');
}

// Cleanup on Page Unload
export function cleanup() {
    // Clear all intervals to prevent memory leaks
    if (window.premiumButtonInterval) {
        clearInterval(window.premiumButtonInterval);
    }
}
