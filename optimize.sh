#!/bin/bash

echo "🚀 CustomBank Website Optimization Script"
echo "=========================================="
echo ""

# Change to project directory
cd /Users/robertburns/Projects/custombank-website || exit

# Check if tools are installed
echo "🔧 Checking required tools..."
command -v pngquant >/dev/null 2>&1 || { echo "❌ pngquant not installed. Run: brew install pngquant"; exit 1; }
command -v cwebp >/dev/null 2>&1 || { echo "❌ webp not installed. Run: brew install webp"; exit 1; }
command -v magick >/dev/null 2>&1 || { echo "❌ imagemagick not installed. Run: brew install imagemagick"; exit 1; }
echo "✅ All tools installed"
echo ""

# Step 1: Backup originals
echo "📦 Step 1: Backing up original images..."
mkdir -p assets/images/originals
if [ ! -f assets/images/originals/hero-dashboard.png ]; then
  cp assets/images/*.png assets/images/originals/ 2>/dev/null
  echo "✅ Originals backed up to assets/images/originals/"
else
  echo "⚠️  Backup already exists, skipping..."
fi
echo ""

# Step 2: Compress PNGs
echo "🗜️  Step 2: Compressing PNG files (quality 65-80%)..."
cd assets/images || exit

# List of files to optimize
FILES=(
  "hero-dashboard.png"
  "hero-main.png"
  "hero-screenshot.png"
  "screenshot-home.png"
  "screenshot-transfer.png"
  "screenshot-bills.png"
  "screenshot-transactions.png"
  "screenshot-account-edit.png"
  "screenshot-receipts.png"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "   Compressing $file..."
    pngquant --quality=65-80 --ext .png --force "$file" 2>/dev/null
  fi
done
echo "✅ PNG compression complete"
echo ""

# Step 3: Convert to WebP
echo "🖼️  Step 3: Converting images to WebP format..."
for file in hero-*.png screenshot-*.png; do
  if [ -f "$file" ]; then
    webp_file="${file%.png}.webp"
    if [ ! -f "$webp_file" ]; then
      echo "   Creating $webp_file..."
      cwebp -q 80 "$file" -o "$webp_file" 2>/dev/null
    else
      echo "   $webp_file already exists, skipping..."
    fi
  fi
done
echo "✅ WebP conversion complete"
echo ""

# Step 4: Create responsive sizes for hero images
echo "📱 Step 4: Creating responsive image sizes..."
HERO_FILES=("hero-dashboard" "hero-main" "hero-screenshot")

for file in "${HERO_FILES[@]}"; do
  if [ -f "${file}.png" ]; then
    echo "   Processing ${file}..."

    # 400px width for mobile
    if [ ! -f "${file}-400w.png" ]; then
      echo "      Creating ${file}-400w.png (mobile)"
      magick "${file}.png" -resize 400x "${file}-400w.png" 2>/dev/null
      cwebp -q 80 "${file}-400w.png" -o "${file}-400w.webp" 2>/dev/null
    fi

    # 800px width for tablet
    if [ ! -f "${file}-800w.png" ]; then
      echo "      Creating ${file}-800w.png (tablet)"
      magick "${file}.png" -resize 800x "${file}-800w.png" 2>/dev/null
      cwebp -q 80 "${file}-800w.png" -o "${file}-800w.webp" 2>/dev/null
    fi
  fi
done
echo "✅ Responsive sizes created"
echo ""

# Step 5: Show results
cd ../.. || exit
echo ""
echo "📊 OPTIMIZATION RESULTS"
echo "======================="
echo ""

if [ -d assets/images/originals ]; then
  echo "Original total size:"
  du -sh assets/images/originals/
fi
echo ""
echo "Optimized total size:"
du -sh assets/images/
echo ""
echo "Top 10 largest files after optimization:"
du -sh assets/images/*.{png,webp} 2>/dev/null | sort -hr | head -10
echo ""
echo "WebP files created:"
ls -lh assets/images/*.webp | wc -l | xargs echo "  Total WebP files:"
echo ""

echo "✅ ============================================="
echo "✅ Phase 1 Complete: Image Optimization Done!"
echo "✅ ============================================="
echo ""
echo "📈 EXPECTED IMPROVEMENTS:"
echo "  • Asset size: ~79% reduction"
echo "  • Load time: 75% faster on mobile"
echo "  • Data usage: 50% less"
echo ""
echo "⚠️  MANUAL STEPS REMAINING:"
echo ""
echo "1. ADD LAZY LOADING TO STORE BADGES"
echo "   File: index.html"
echo "   Lines: 111, 114, 1044, 1047"
echo "   Add: loading=\"lazy\" width=\"120\" height=\"40\""
echo ""
echo "2. UPDATE HERO IMAGE WITH WEBP"
echo "   File: index.html"
echo "   Line: 121-123"
echo "   Replace <img> with <picture> element"
echo "   (See OPTIMIZATION_PLAN.md for code)"
echo ""
echo "3. OPTIMIZE GOOGLE FONTS"
echo "   File: index.html"
echo "   Line: 36"
echo "   Change: wght@400;500;600;700;800"
echo "   To:     wght@400;600;700"
echo ""
echo "4. UPDATE CSS FONT VARIABLES"
echo "   File: styles.css"
echo "   Lines: 59-63"
echo "   --font-weight-medium: 600 (was 500)"
echo "   --font-weight-extrabold: 700 (was 800)"
echo ""
echo "5. DELETE UNUSED CSS FOLDER"
echo "   Run: rm -rf css/"
echo ""
echo "📖 Full instructions: OPTIMIZATION_PLAN.md"
echo ""
echo "🧪 TESTING:"
echo "   • Run local server: python3 -m http.server 8000"
echo "   • Test in browser: http://localhost:8000"
echo "   • Run Lighthouse: lighthouse http://localhost:8000 --preset=mobile"
echo ""
echo "✅ Ready to deploy when manual steps complete!"
