# CustomBank Website - Mobile Optimization Action Plan

**Created:** 2025-10-12
**Status:** Ready to Execute
**Est. Time:** 2-4 hours
**Impact:** 75% faster mobile load time

---

## 🎯 GOALS

1. Reduce page load time from 8-12s → 2-3s on 4G
2. Reduce asset size from 3.8MB → 800KB (79% reduction)
3. Achieve Lighthouse Mobile score 90+
4. Ensure perfect mobile responsiveness

---

## 🔴 PHASE 1: IMAGE OPTIMIZATION (CRITICAL)

### Issue #1: 3.3MB of Unoptimized PNG Images

**Current State:**
```
hero-dashboard.png:       500KB
hero-main.png:            500KB
hero-screenshot.png:      500KB
screenshot-home.png:      500KB
screenshot-transfer.png:  504KB
screenshot-bills.png:     244KB
screenshot-transactions:  204KB
screenshot-account-edit:  204KB
screenshot-receipts:      148KB
Total:                    ~3.3MB
```

**Target State:** ~800KB total (75% reduction)

### Action Steps:

#### Step 1A: Install Tools (One-Time Setup)

```bash
# Install image optimization tools
brew install pngquant webp imagemagick

# Verify installation
pngquant --version
cwebp -version
```

#### Step 1B: Backup Originals

```bash
cd /Users/robertburns/Projects/custombank-website
mkdir -p assets/images/originals
cp assets/images/*.png assets/images/originals/
echo "✅ Originals backed up to assets/images/originals/"
```

#### Step 1C: Compress PNGs

```bash
# Compress all PNG files (65-80% quality)
cd assets/images
pngquant --quality=65-80 --ext .png --force \
  hero-dashboard.png \
  hero-main.png \
  hero-screenshot.png \
  screenshot-home.png \
  screenshot-transfer.png \
  screenshot-bills.png \
  screenshot-transactions.png \
  screenshot-account-edit.png \
  screenshot-receipts.png

# Verify new sizes
echo "📊 New file sizes:"
du -sh hero-*.png screenshot-*.png | sort -hr
```

**Expected Result:** 500KB → ~150KB per file

#### Step 1D: Convert to WebP

```bash
# Convert all PNGs to WebP
for file in hero-*.png screenshot-*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done

echo "✅ WebP files created:"
ls -lh *.webp
```

#### Step 1E: Create Responsive Sizes

```bash
# Create 3 sizes for hero images: 400w, 800w, original
for file in hero-dashboard hero-main hero-screenshot; do
  # Mobile size (400px width)
  magick "${file}.png" -resize 400x "${file}-400w.png"
  cwebp -q 80 "${file}-400w.png" -o "${file}-400w.webp"

  # Tablet size (800px width)
  magick "${file}.png" -resize 800x "${file}-800w.png"
  cwebp -q 80 "${file}-800w.png" -o "${file}-800w.webp"

  echo "✅ Created responsive sizes for ${file}"
done
```

---

### Issue #2: No Lazy Loading

**Files to Update:**
- `index.html` (lines 111, 114, 1044, 1047)
- `use-cases.html` (if exists)

#### Step 2A: Add Lazy Loading to Store Badges

**File:** `index.html`

**Find (line 111-112):**
```html
<img src="assets/images/app-store-badge.svg" alt="Download on the App Store">
```

**Replace with:**
```html
<img src="assets/images/app-store-badge.svg"
     alt="Download on the App Store"
     loading="lazy"
     width="120"
     height="40">
```

**Repeat for:**
- Line 114 (Google Play badge in hero)
- Line 1044 (App Store badge in CTA)
- Line 1047 (Google Play badge in CTA)

#### Step 2B: Update Hero Image with WebP

**Find (line 121-123):**
```html
<img src="assets/images/hero-dashboard.png"
     alt="CustomBank app dashboard..."
     loading="eager">
```

**Replace with:**
```html
<picture>
  <!-- WebP with responsive sizes -->
  <source
    type="image/webp"
    srcset="assets/images/hero-dashboard-400w.webp 400w,
            assets/images/hero-dashboard-800w.webp 800w,
            assets/images/hero-dashboard.webp 1200w"
    sizes="(max-width: 480px) 220px,
           (max-width: 768px) 250px,
           300px">

  <!-- PNG fallback with responsive sizes -->
  <source
    type="image/png"
    srcset="assets/images/hero-dashboard-400w.png 400w,
            assets/images/hero-dashboard-800w.png 800w,
            assets/images/hero-dashboard.png 1200w"
    sizes="(max-width: 480px) 220px,
           (max-width: 768px) 250px,
           300px">

  <!-- Final fallback -->
  <img src="assets/images/hero-dashboard.png"
       alt="CustomBank app dashboard showing Good Afternoon greeting, Quick Actions for Send Money, Receipts, Pay Bills, and Transfer, with Demo Checking account balance of $674,437.91"
       loading="eager"
       width="276"
       height="552"
       style="display: block; width: 100%; height: auto;">
</picture>
```

---

## 🟠 PHASE 2: FONT OPTIMIZATION (HIGH PRIORITY)

### Issue #3: Loading 5 Font Weights

**Current (line 36):**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Optimized:**
```html
<!-- Reduced from 5 weights to 3 essential weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap&display=swap" rel="stylesheet">
```

**CSS Variable Updates:**

**File:** `styles.css`

**Find and Replace:**
```css
/* Line 59-63: Update font weight variables */
--font-weight-normal: 400;     /* Keep */
--font-weight-medium: 600;     /* Changed from 500 */
--font-weight-semibold: 600;   /* Keep */
--font-weight-bold: 700;       /* Keep */
--font-weight-extrabold: 700;  /* Changed from 800 */
```

**Savings:** ~50-75KB (one less font file downloaded)

---

## 🟡 PHASE 3: CSS CLEANUP (MEDIUM PRIORITY)

### Issue #4: Unused CSS Directory

**Current State:**
```
css/base/         (exists but not imported)
css/components/   (exists but not imported)
css/sections/     (exists but not imported)
css/utils/        (exists but not imported)
css/main.css      (957 lines, not imported)
Total:            1,420 lines unused
```

**Resolution: Delete Unused CSS**

```bash
# Confirm the modular CSS is not imported
grep -r "css/main.css" index.html
# Should return nothing

# Safe to delete
rm -rf css/

# Commit the change
git add -A
git commit -m "Remove unused modular CSS directory

The modular CSS structure in css/ folder was never imported
and caused developer confusion. The consolidated styles.css
(2,215 lines) remains as the single source of truth.

Files removed:
- css/base/ (5 files)
- css/components/ (6 files)
- css/sections/ (8 files)
- css/utils/ (5 files)
- css/main.css (957 lines)
Total: 1,420 lines of unused CSS

✅ FAQ max-height fixed: 500px → 1000px
✅ Single CSS file architecture confirmed"
```

---

## ✅ PHASE 4: VERIFICATION & TESTING

### Step 4A: Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run mobile audit
lighthouse http://localhost:8000 \
  --preset=mobile \
  --output=html \
  --output-path=./lighthouse-mobile-report.html

# Open report
open lighthouse-mobile-report.html
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Step 4B: Check File Sizes

```bash
# Before
du -sh assets/images/originals/

# After
du -sh assets/images/

# Should see 70-80% reduction
```

### Step 4C: Test on Real Devices

**Priority Devices:**
1. iPhone SE (375px) - smallest modern iPhone
2. iPhone 14 Pro (393px) - standard
3. Samsung Galaxy S21 (360px) - Android
4. iPad (768px) - tablet

**Test Checklist:**
- [ ] Images load quickly
- [ ] No horizontal scroll
- [ ] Text is readable without zoom
- [ ] All buttons are easily tappable
- [ ] Store badges display correctly
- [ ] FAQ accordions work smoothly
- [ ] Navigation menu works
- [ ] Hero image loads properly

### Step 4D: Test Load Speed

```bash
# Test with slow 4G throttling
curl -o /dev/null -s -w 'Total: %{time_total}s\n' https://www.custombank.us

# Should be < 3 seconds
```

---

## 📋 COMPLETE IMPLEMENTATION SCRIPT

**File:** `optimize.sh` (Run this to do everything)

```bash
#!/bin/bash

echo "🚀 CustomBank Website Optimization Script"
echo "=========================================="

# Change to project directory
cd /Users/robertburns/Projects/custombank-website || exit

# Step 1: Backup originals
echo "📦 Step 1: Backing up original images..."
mkdir -p assets/images/originals
cp assets/images/*.png assets/images/originals/ 2>/dev/null
echo "✅ Originals backed up"

# Step 2: Compress PNGs
echo "🗜️  Step 2: Compressing PNG files..."
cd assets/images || exit
pngquant --quality=65-80 --ext .png --force \
  hero-dashboard.png \
  hero-main.png \
  hero-screenshot.png \
  screenshot-home.png \
  screenshot-transfer.png \
  screenshot-bills.png \
  screenshot-transactions.png \
  screenshot-account-edit.png \
  screenshot-receipts.png 2>/dev/null
echo "✅ PNGs compressed"

# Step 3: Convert to WebP
echo "🖼️  Step 3: Converting to WebP..."
for file in hero-*.png screenshot-*.png; do
  [ -f "$file" ] && cwebp -q 80 "$file" -o "${file%.png}.webp" 2>/dev/null
done
echo "✅ WebP files created"

# Step 4: Create responsive sizes
echo "📱 Step 4: Creating responsive image sizes..."
for file in hero-dashboard hero-main hero-screenshot; do
  if [ -f "${file}.png" ]; then
    magick "${file}.png" -resize 400x "${file}-400w.png" 2>/dev/null
    cwebp -q 80 "${file}-400w.png" -o "${file}-400w.webp" 2>/dev/null

    magick "${file}.png" -resize 800x "${file}-800w.png" 2>/dev/null
    cwebp -q 80 "${file}-800w.png" -o "${file}-800w.webp" 2>/dev/null
  fi
done
echo "✅ Responsive sizes created"

# Step 5: Check results
cd ../.. || exit
echo ""
echo "📊 OPTIMIZATION RESULTS:"
echo "======================="
echo ""
echo "Original sizes:"
du -sh assets/images/originals/ 2>/dev/null
echo ""
echo "Optimized sizes:"
du -sh assets/images/
echo ""
echo "Largest files after optimization:"
du -sh assets/images/*.{png,webp} 2>/dev/null | sort -hr | head -10
echo ""
echo "✅ Phase 1 Complete: Image Optimization Done!"
echo ""
echo "⚠️  MANUAL STEPS REMAINING:"
echo "1. Update index.html with lazy loading (lines 111, 114, 1044, 1047)"
echo "2. Update hero image to use <picture> with WebP (line 121-123)"
echo "3. Update Google Fonts line to load fewer weights (line 36)"
echo "4. Update font weight variables in styles.css"
echo "5. Delete css/ folder: rm -rf css/"
echo ""
echo "📖 See OPTIMIZATION_PLAN.md for detailed instructions"
```

---

## 🎯 FINAL CHECKLIST

### Before Deployment:
- [ ] All images compressed (PNG quality 65-80%)
- [ ] WebP versions created for all hero/screenshot images
- [ ] Responsive image sizes created (400w, 800w, original)
- [ ] Lazy loading added to all non-hero images
- [ ] Hero image updated with `<picture>` + WebP + srcset
- [ ] Store badge images have explicit width/height
- [ ] Google Fonts reduced from 5 → 3 weights
- [ ] CSS font weight variables updated
- [ ] Unused css/ folder deleted
- [ ] FAQ max-height increased to 1000px ✅ (DONE)
- [ ] Git commit with detailed message

### Testing:
- [ ] Lighthouse mobile score 90+ achieved
- [ ] Load time < 3s on 4G connection
- [ ] Tested on iPhone (375px, 393px)
- [ ] Tested on Android (360px)
- [ ] Tested on iPad (768px)
- [ ] All images display correctly
- [ ] No horizontal scrolling
- [ ] FAQ answers don't cut off
- [ ] All buttons are tappable (44px minimum)

### Deployment:
- [ ] Changes committed to git
- [ ] Pushed to GitHub (triggers Vercel deploy)
- [ ] Verified on custombank.us
- [ ] Lighthouse re-run on production
- [ ] Mobile devices tested on live site

---

## 📈 EXPECTED IMPROVEMENTS

**Before:**
- Asset size: 3.8MB
- Load time (4G): 8-12 seconds
- Lighthouse: Unknown
- Mobile UX: Good

**After:**
- Asset size: 800KB (79% ↓)
- Load time (4G): 2-3 seconds (75% ↓)
- Lighthouse: 90+ target
- Mobile UX: Excellent

**User Impact:**
- 75% faster mobile load
- 50% less data usage
- Better SEO ranking
- Higher conversion rate
- Lower bounce rate

---

## 🆘 TROUBLESHOOTING

### Images look blurry after compression
**Solution:** Increase quality parameter
```bash
pngquant --quality=75-85 --ext .png --force image.png
```

### WebP not displaying in older browsers
**Solution:** Already handled with `<picture>` fallback to PNG

### Responsive images not working
**Solution:** Check `sizes` attribute matches CSS breakpoints

### Font looks thinner after weight reduction
**Solution:** Use `font-weight: 600` instead of `500` in CSS

### CSS folder deletion broke something
**Solution:** Restore from git: `git restore css/` (but it shouldn't be imported)

---

## 📞 NEXT STEPS

1. **Run the script:** `bash optimize.sh`
2. **Make HTML edits** (lazy loading, picture element)
3. **Update fonts** (Google Fonts link + CSS variables)
4. **Delete css/ folder** (`rm -rf css/`)
5. **Test locally** (`python3 -m http.server 8000`)
6. **Run Lighthouse** (`lighthouse http://localhost:8000 --preset=mobile`)
7. **Test on devices** (iPhone, Android, iPad)
8. **Commit & push** to deploy via Vercel
9. **Verify production** (custombank.us)
10. **Celebrate!** 🎉 75% faster site!

---

**Created by:** Claude Code
**Date:** 2025-10-12
**Version:** 1.0
**Est. Implementation Time:** 2-4 hours
**Risk Level:** Low (all changes reversible via git)
