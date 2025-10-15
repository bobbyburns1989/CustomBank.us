# CustomBank Website Changelog

All notable changes to the CustomBank website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed - 2025-10-15

#### Complete Use Cases Section Removal
**Problem:** Use cases page (use-cases.html) was deleted in commit `1d0d61b`, but remnants remained in CSS, JavaScript, sitemap, and documentation files.

**Solution:**
1. **CSS Cleanup**
   - Removed `.use-cases` section styling from `styles.css` (68 lines removed)
   - Removed `.use-case-item` styling from `styles/04-sections.css` (68 lines removed)
   - Removed responsive media query references from `styles/06-responsive.css` (6 lines removed)
   - Total CSS reduction: 142 lines

2. **JavaScript Cleanup**
   - Removed `.use-case-item` animation code from `script.js` (lines 262-269)
   - Removed Intersection Observer registration for use case items

3. **Sitemap Cleanup**
   - Removed `use-cases.html` entry from `sitemap.xml`
   - Updated SEO sitemap to reflect current site structure

4. **Documentation Cleanup**
   - Deleted `USE_CASES_REVAMP_PLAN.md` file
   - Updated CHANGELOG.md with removal documentation

**Status:** All use cases references completely removed from codebase. Navigation now shows: Features, FAQ, Privacy, Terms.

**Files Modified:**
- `styles.css` (removed lines 1188-1255, removed media query references)
- `styles/04-sections.css` (removed lines 207-274)
- `styles/06-responsive.css` (removed lines 36-41)
- `script.js` (removed lines 262-269)
- `sitemap.xml` (removed lines 11-17)
- `CHANGELOG.md` (documented removal)

**Files Deleted:**
- `USE_CASES_REVAMP_PLAN.md`

**Related Commit:**
- `1d0d61b` - Remove use cases page and simplify navigation (HTML deletion)

---

#### Complete Pricing Section Removal
**Problem:** Pricing section was removed from the website in commit `56b125f` to create a cleaner conversion flow, but remnants remained in CSS, JavaScript, and documentation files.

**Solution:**
1. **CSS Cleanup (Main Stylesheet)**
   - Removed `.pricing-card` component styles from `styles.css` (95 lines removed)
   - Removed `.pricing` section styling from `styles.css` (15 lines removed)
   - Removed responsive pricing styles from `styles.css` tablet breakpoint (3 lines removed)
   - Removed responsive pricing styles from `styles.css` mobile breakpoint (8 lines removed)
   - Total main stylesheet reduction: 121 lines

2. **CSS Cleanup (Modular Files)**
   - Removed `.pricing-card` components from `styles/03-components.css` (95 lines removed)
   - Removed `.pricing` section from `styles/04-sections.css` (16 lines removed)
   - Removed responsive pricing grid from `styles/06-responsive.css` tablet breakpoint (3 lines removed)
   - Removed responsive pricing cards from `styles/06-responsive.css` mobile breakpoint (8 lines removed)
   - Updated comment in `styles/main.css` to remove pricing reference
   - Updated animation comment in `styles/05-animations.css` from "pricing badge" to "FAQ badge"
   - Total modular CSS reduction: 122 lines

3. **JavaScript Cleanup**
   - Removed premium button pulse animation code from `script.js` (lines 271-283)
   - Removed premium button interval cleanup code from `script.js` (lines 86-88)
   - Total JavaScript reduction: 16 lines

**Status:** All pricing references completely removed from codebase. Total reduction: 259 lines of code.

**Files Modified:**
- `styles.css` (removed 121 lines)
- `styles/03-components.css` (removed 95 lines)
- `styles/04-sections.css` (removed 16 lines)
- `styles/06-responsive.css` (removed 11 lines)
- `styles/main.css` (updated comment)
- `styles/05-animations.css` (updated comment)
- `script.js` (removed 16 lines)
- `CHANGELOG.md` (documented removal)

**Related Commit:**
- `56b125f` - Remove pricing section for cleaner conversion flow (HTML deletion)

---

### Changed - 2025-10-14

#### Mobile Navigation Menu Cleanup & Verification
**Problem:** Mobile hamburger menu contained outdated "Pricing" link after pricing section was removed from the website in commit `56b125f`.

**Solution:**
1. **Verified Pricing Link Removal**
   - Confirmed "Pricing" link completely removed from mobile menu (lines 348-447)
   - Grep search confirmed no "Pricing" references in index.html
   - Mobile menu now shows: Features, FAQ, Privacy, Terms

2. **Verified Social Media Links**
   - Instagram and TikTok links confirmed present (lines 421-436)
   - Both links include SVG icons and proper labels
   - Target blank and rel attributes for security

3. **Visual Hierarchy Confirmed**
   - Navigation properly organized with dividers
   - Grouped into logical sections:
     - Product: Features
     - Support: FAQ
     - Legal: Privacy, Terms
     - Download: App Store + Google Play badges
     - Social: Instagram + TikTok

**Status:** All mobile menu improvements from October 13 redesign verified and confirmed live.

**Files Verified:**
- `index.html` (lines 348-447)

**Commits:**
- `7acf30f` - Remove redundant 'No Real Money' indicator and fix mobile menu
- `56b125f` - Remove pricing section for cleaner conversion flow

---

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

*Last Updated: October 14, 2025*
