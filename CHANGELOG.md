# CustomBank Website Changelog

All notable changes to the CustomBank website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed - 2025-10-10

#### Button Size Consistency Fix
**Problem:** App Store and Google Play download buttons displayed at different sizes despite both having `height="56"` attributes in HTML. This was caused by different aspect ratios between the badge images:
- App Store badge (SVG): 120×40 pixels (3:1 ratio)
- Google Play badge (PNG): 646×250 pixels (2.58:1 ratio)

**Solution:**
- Implemented forced equal dimensions using `!important` CSS flags
- Set fixed width (168px) to match the 3:1 aspect ratio
- Added `object-fit: contain` to prevent image distortion
- Applied responsive sizing across all breakpoints:
  - **Desktop:** 168px × 56px
  - **Mobile (≤768px):** 144px × 48px
  - **Small Mobile (≤480px):** 132px × 44px

**Files Modified:**
- `styles.css` (lines 308-315, 1853-1856, 2038-2041)

**Affected Pages:**
- `index.html` (hero section & bottom CTA section)
- `use-cases.html` (hero section)

**Commit:** `a6f2f16` - Fix App Store/Google Play button size inconsistency

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
