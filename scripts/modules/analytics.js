// ===================================
// Analytics Module
// Handles download tracking and analytics events
// ===================================

export function initAnalytics() {
    // Track Download Button Clicks
    const downloadButtons = document.querySelectorAll('a[href*="apple.com"], a[href*="play.google.com"]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = button.href.includes('apple') ? 'iOS' : 'Android';

            // Analytics tracking placeholder
            // Example: gtag('event', 'download_click', { platform: platform });
            console.log(`[Analytics] Download button clicked: ${platform}`);

            // If href is "#", prevent default and show coming soon message
            if (button.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Coming soon! CustomBank will be available on the App Store and Google Play.');
            }
        });
    });
}
