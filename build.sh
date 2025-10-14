#!/bin/bash
# CustomBank Website Build Script
# Concatenates modular CSS/JS files for production

echo "🚀 Building CustomBank Website..."
echo ""

# Concatenate CSS modules
echo "📦 Concatenating CSS modules..."
cat styles/01-variables.css \
    styles/02-base.css \
    styles/03-components.css \
    styles/04-sections.css \
    styles/05-animations.css \
    styles/07-utilities.css \
    styles/06-responsive.css > styles.css

echo "✅ CSS concatenated: styles.css ($(ls -lh styles.css | awk '{print $5}'))"

# Concatenate JS modules
echo "📦 Concatenating JS modules..."
cat scripts/modules/utils.js \
    scripts/modules/navigation.js \
    scripts/modules/animations.js \
    scripts/modules/interactions.js \
    scripts/modules/analytics.js \
    scripts/main.js > script.js

echo "✅ JS concatenated: script.js ($(ls -lh script.js | awk '{print $5}'))"

echo ""
echo "🎉 Build complete!"
echo ""
echo "📊 File Sizes:"
echo "  - index.html: $(ls -lh index.html | awk '{print $5}')"
echo "  - styles.css: $(ls -lh styles.css | awk '{print $5}')"
echo "  - script.js: $(ls -lh script.js | awk '{print $5}')"
echo ""

# Check if minification tools are installed
if command -v cssnano &> /dev/null; then
    echo "🔧 Minifying CSS with cssnano..."
    cssnano styles.css styles.min.css
    echo "✅ CSS minified: styles.min.css ($(ls -lh styles.min.css | awk '{print $5}'))"
else
    echo "ℹ️  cssnano not installed. Skipping CSS minification."
    echo "   Install with: npm install -g cssnano-cli"
fi

if command -v terser &> /dev/null; then
    echo "🔧 Minifying JS with terser..."
    terser script.js -o script.min.js -c -m
    echo "✅ JS minified: script.min.js ($(ls -lh script.min.js | awk '{print $5}'))"
else
    echo "ℹ️  terser not installed. Skipping JS minification."
    echo "   Install with: npm install -g terser"
fi

echo ""
echo "✨ Ready for deployment!"
