# CustomBank Website Changelog

All notable changes to the CustomBank website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed - 2025-10-10

#### Button Size Consistency Fix (AGGRESSIVE FIX - FINAL)
**Problem:** App Store and Google Play download buttons displayed at different sizes despite both having `height="56"` attributes in HTML. This was caused by multiple conflicting factors:
- App Store badge (SVG): 120×40 pixels (3:1 ratio)
- Google Play badge (PNG): 646×250 pixels (2.58:1 ratio)
- Inline HTML `height="56"` attributes conflicting with CSS
- Global `img {height: auto}` rule interfering with button sizing
- CSS specificity issues preventing consistent rendering

**Solution Evolution:**

**Attempt 1 (Commit `a6f2f16`):**
- Added `!important` flags to CSS
- Set fixed width (168px) to match 3:1 aspect ratio
- Added `object-fit: contain` to prevent distortion
- **Result:** Partial success, but inline attributes still caused issues

**Attempt 2 - AGGRESSIVE FIX (Commit `b9eb2e6`):**
1. **Removed ALL inline `height="56"` attributes** from HTML (6 buttons total)
   - Eliminated inline attribute conflicts
   - Gave CSS complete control over sizing
2. **Added fixed-size parent containers:**
   ```css
   .store-badge {
     width: 168px;
     height: 56px;
   }
   ```
3. **Applied aggressive multi-constraint CSS:**
   ```css
   .store-badge img {
     height: 56px !important;
     width: 168px !important;
     min-height: 56px;
     min-width: 168px;
     max-height: 56px;
     max-width: 168px;
     object-fit: contain;
     display: block !important;
   }
   ```
4. **Applied across all responsive breakpoints:**
   - **Desktop:** 168px × 56px
   - **Mobile (≤768px):** 144px × 48px
   - **Small Mobile (≤480px):** 132px × 44px

**Technical Details:**
- Parent container acts as fixed-size box constraining child images
- Multiple min/max constraints prevent any size escape
- `!important` flags override all competing CSS rules
- `object-fit: contain` prevents image distortion
- Images must fit into exact dimensions at all breakpoints

**Files Modified:**
- `index.html` (removed inline height from 4 buttons: lines 111, 114, 1044, 1047)
- `use-cases.html` (removed inline height from 2 buttons: lines 259, 262)
- `styles.css` (added container sizing + aggressive constraints: lines 302-319, 1857-1869, 2051-2063)

**Affected Locations:**
- `index.html` - Hero section (top of homepage)
- `index.html` - Bottom CTA section (blue gradient)
- `use-cases.html` - Hero section

**Result:** Both buttons now render at EXACTLY the same dimensions across all screen sizes and locations.

**Commits:**
- `a6f2f16` - Initial fix attempt (CSS only)
- `b9eb2e6` - AGGRESSIVE FIX (removed HTML attributes + enhanced CSS)

---

### Changed - 2025-10-10

#### Legal Compliance - Trademark Removal
**Problem:** Website contained specific trademarked brand names that could create legal liability.

**Changes:**
1. **Feature Card (index.html:263)**
   - **Before:** "66 receipt presets (Walmart, Chase, Shell, United Airlines)"
   - **After:** "66 receipt presets for retail, banking, gas, and travel scenarios"

2. **Testimonial Section (index.html:560-564)**
   - **Before:** "I create TikTok finance content for Gen Z" / "TikTok Creator, @MoneyWithLisa"
   - **After:** "I create finance content for Gen Z on social media" / "Social Media Creator, @MoneyWithLisa"

**Rationale:** Removed specific brand names to avoid trademark infringement while maintaining the same value proposition with generic industry terms.

**Files Modified:**
- `index.html`

**Commit:** `52b6fce` - Remove trademarked brand names for legal compliance

---

### Added - 2025-10-10

#### CustomBank Favicon Implementation
**Description:** Created and implemented a professional CustomBank logo favicon across all platforms and devices.

**Files Created:**
- `favicon-source.svg` - Source SVG file (512×512, dark theme with "CUSTOM" vertical in box, "BANK" horizontal)
- `favicon.ico` - Multi-resolution browser icon (16×16, 32×32) - 5.3KB
- `apple-touch-icon.png` - iOS home screen icon (180×180) - 7.1KB
- `assets/images/android-chrome-192x192.png` - Android icon - 7.5KB
- `assets/images/android-chrome-512x512.png` - High-res Android icon - 11KB

**Design Specifications:**
- Background: Dark (#2C2C2C)
- "CUSTOM" text: Vertical orientation in bordered box on left
- "BANK" text: Horizontal orientation on right
- Font: Bold, professional, optimized for small sizes

**Platform Support:**
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS devices (iPhone, iPad) - home screen & bookmarks
- ✅ Android devices - home screen & PWA
- ✅ Progressive Web App (PWA) - installation & splash screens

**Configuration:**
- `site.webmanifest` - Already configured for PWA support

**Commit:** `3f62b56` - Update favicon with CustomBank logo

---

## Previous Changes

### Priority 1 Website Improvements - 2025-10-08
- Professional polish and documentation updates
- Image optimization (15-26% file size reduction)
- Cache management improvements
- **Commits:** `814b847`, `1d3abd2`, `6b4d33e`, `4245da7`

### BetTrndz Legal Pages - 2025-10-08
- Added Privacy Policy and Terms of Service for BetTrndz
- **Commit:** `57beb9f`

---

## Project Overview

**Website:** CustomBank - Banking Simulator
**URL:** https://www.custombank.us
**Repository:** https://github.com/bobbyburns1989/CustomBank.us
**Deployment:** Vercel (auto-deploy on push to main)

### Key Features
- 9 professional receipt templates
- 43 authentic bank themes
- 138+ transaction/bill/receipt presets
- Multi-language support (5 languages)
- CSV export functionality
- Complete privacy (local storage only)
- Zero registration required

### Tech Stack
- HTML5, CSS3 (with CSS custom properties)
- Vanilla JavaScript
- Google Fonts (Inter)
- Responsive design (mobile-first)
- Progressive Web App (PWA) capable
- Vercel hosting with CDN

---

## Development Notes

### CSS Architecture
- Custom properties for consistent theming
- Mobile-first responsive design
- Three breakpoints: 992px (tablet), 768px (mobile), 480px (small mobile)
- Accessibility-first (WCAG AA compliant)
- Reduced motion support
- High contrast mode support

### Git Workflow
- Main branch: `main`
- Auto-deployment: Vercel on push
- Commit format: Detailed messages with problem/solution/files
- Co-authorship: All commits co-authored with Claude Code

### Contact
- **Support Email:** bobby@customapps.us
- **Instagram:** @custombankapp
- **TikTok:** @custombankapp

---

*Last Updated: October 10, 2025*
