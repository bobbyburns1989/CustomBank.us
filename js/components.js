// ===================================
// HTML Component Templates
// Reusable navbar and footer components
// ===================================

// ===================================
// Logo Component
// ===================================
export function createLogo(type = 'image') {
    if (type === 'image') {
        // Used in index.html
        return `
            <div class="logo">
                <img src="/assets/images/app-icon-256.png" alt="CustomBank - Banking Simulator App Icon" width="32" height="32" class="logo-icon">
                <span class="logo-text">CustomBank</span>
            </div>
        `;
    } else {
        // Used in privacy.html and terms.html
        return `
            <a href="index.html" class="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#3B82F6"/>
                    <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 16L12 14V18L16 20L20 18V14L16 16Z" fill="white"/>
                </svg>
                <span class="logo-text">CustomBank</span>
            </a>
        `;
    }
}

// ===================================
// Navbar Component
// ===================================
export function createNavbar(pageType = 'landing') {
    if (pageType === 'landing') {
        // For index.html
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="nav-content">
                        ${createLogo('image')}
                        <div class="nav-links">
                            <a href="#features">Features</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#faq">FAQ</a>
                            <a href="#download" class="btn-primary-small">Download</a>
                        </div>
                        <button class="mobile-menu-toggle" aria-label="Toggle menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;
    } else {
        // For privacy.html and terms.html
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="nav-content">
                        ${createLogo('svg')}
                        <div class="nav-links">
                            <a href="index.html">Home</a>
                            <a href="index.html#features">Features</a>
                            <a href="index.html#pricing">Pricing</a>
                            <a href="index.html#download" class="btn-primary-small">Download</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

// ===================================
// Footer Component
// ===================================
export function createFooter(pageType = 'landing') {
    if (pageType === 'landing') {
        // For index.html - full footer with grid
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-column">
                            <div class="footer-logo">
                                <img src="/assets/images/app-icon-256.png" alt="CustomBank - Banking Simulator App Icon" width="32" height="32" class="logo-icon">
                                <span>CustomBank</span>
                            </div>
                            <p class="footer-tagline">Your Banking Simulator</p>
                            <div class="social-links">
                                <a href="https://www.instagram.com/custombankapp/" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                        <circle cx="12" cy="12" r="4"/>
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                                    </svg>
                                </a>
                                <a href="https://www.tiktok.com/@custombankapp" aria-label="Follow us on TikTok" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                    </svg>
                                </a>
                                <a href="https://apps.apple.com/us/app/custombank/id6738460636" aria-label="Download on App Store" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div class="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="https://apps.apple.com/us/app/custombank/id6738460636" target="_blank" rel="noopener noreferrer">Download iOS</a></li>
                                <li><a href="https://play.google.com/store/apps/details?id=com.custombankapp.app" target="_blank" rel="noopener noreferrer">Download Android</a></li>
                                <li><a href="#">Roadmap</a></li>
                            </ul>
                        </div>

                        <div class="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="mailto:bobby@custombank.us">Support</a></li>
                                <li><a href="#faq">FAQs</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="privacy.html">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div class="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="mailto:bobby@custombank.us">Contact</a></li>
                                <li><a href="terms.html">Terms of Service</a></li>
                                <li><a href="#">Status Page</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p class="copyright">© 2025 CustomBank. All rights reserved.</p>
                        <p class="disclaimer">Banking simulation for educational purposes only. No real money involved.</p>
                    </div>
                </div>
            </footer>
        `;
    } else {
        // For privacy.html and terms.html - simplified footer
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-bottom" style="text-align: center; padding: 2rem 0;">
                        <p class="copyright">© 2025 CustomBank. All rights reserved.</p>
                        <p class="disclaimer">Banking simulation for educational purposes only. No real money involved.</p>
                        <div style="margin-top: 1rem;">
                            <a href="privacy.html" style="color: var(--gray-400); margin: 0 1rem;">Privacy Policy</a>
                            <a href="terms.html" style="color: var(--gray-400); margin: 0 1rem;">Terms of Service</a>
                            <a href="index.html" style="color: var(--gray-400); margin: 0 1rem;">Home</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// ===================================
// Inject Components (Helper Function)
// ===================================
export function injectNavbar(pageType = 'landing') {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar(pageType);
    }
}

export function injectFooter(pageType = 'landing') {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter(pageType);
    }
}
