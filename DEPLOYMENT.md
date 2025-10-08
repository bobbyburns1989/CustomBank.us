# CustomBank Website Deployment Guide

**Project:** CustomBank Marketing Website
**Domain:** custombank.us
**Hosting:** Vercel
**Repository:** https://github.com/bobbyburns1989/CustomBankWebSite

---

## Deployment Timeline

### October 8, 2025

#### 3:00 PM - Initial Deployment
- ✅ Website built with HTML, CSS, JavaScript
- ✅ All 9 sections completed (Hero, Features, Screenshots, Pricing, Use Cases, Testimonials, FAQ, CTA, Footer)
- ✅ Responsive design implemented
- ✅ Accessibility (WCAG AA) features added
- ✅ SEO optimization (sitemap.xml, robots.txt, meta tags)

#### 3:15 PM - Version Control
- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ Pushed to GitHub: `bobbyburns1989/CustomBankWebSite`

#### 3:30 PM - Vercel Deployment
- ✅ Project imported to Vercel from GitHub
- ✅ Automatic deployment configured
- ✅ Preview URL generated: `custom-bank-web-site.vercel.app`

#### 3:45 PM - Custom Domain Configuration
- ✅ Added `custombank.us` to Vercel
- ✅ Added `www.custombank.us` to Vercel
- ✅ Received DNS instructions from Vercel

#### 4:00 PM - DNS Configuration (GoDaddy)
- ✅ Accessed GoDaddy account
- ✅ Located domain: custombank.us
- ✅ Added A record: `@` → `216.198.79.1`
- ✅ Added CNAME record: `www` → `d26885344f7b750ea.vercel-dns-017.com.`
- ⏳ **Waiting for DNS propagation** (24-48 hours estimated)

#### October 9-10, 2025 - Expected Completion
- ⏳ DNS propagation completes globally
- ⏳ GoDaddy domain verification completes
- ⏳ Vercel domain status changes to "Valid Configuration"
- ⏳ SSL certificate automatically provisioned
- ⏳ Website live at custombank.us

**Note:** New domains typically require 24-48 hours for DNS records to propagate globally. Check status at: https://dnschecker.org/#A/custombank.us

---

## Technical Details

### DNS Configuration

**Registrar:** GoDaddy
**Nameservers:** GoDaddy default nameservers (not changed)
**DNS Records:**

| Type  | Name | Value | TTL |
|-------|------|-------|-----|
| A     | @    | 216.198.79.1 | 600 |
| CNAME | www  | d26885344f7b750ea.vercel-dns-017.com. | 600 |

### Vercel Configuration

**Project Name:** custom-bank-web-site
**Framework:** Other (static HTML/CSS/JS)
**Build Command:** None (static files)
**Output Directory:** ./ (root)
**Install Command:** None

**Environment:** Production
**Branch:** main
**Auto-Deploy:** Enabled (on git push)

### File Structure

```
custombank-website/
├── index.html       # Main HTML (32KB)
├── styles.css       # Styling (22KB)
├── script.js        # JavaScript (13KB)
├── sitemap.xml      # SEO sitemap
├── robots.txt       # Search engine instructions
├── README.md        # Documentation
├── DEPLOYMENT.md    # This file
└── assets/
    ├── images/      # App screenshots (placeholders)
    └── icons/       # SVG icons (inline in HTML)
```

---

## Verification Steps

Once GoDaddy verification completes, perform these checks:

### 1. DNS Propagation
```bash
# Check A record
dig custombank.us A

# Check CNAME record
dig www.custombank.us CNAME

# Check from multiple locations
https://dnschecker.org
```

### 2. Website Access
- [ ] Visit `http://custombank.us` (should redirect to HTTPS)
- [ ] Visit `https://custombank.us` (should load)
- [ ] Visit `http://www.custombank.us` (should redirect)
- [ ] Visit `https://www.custombank.us` (should load)

### 3. SSL Certificate
- [ ] Check for padlock icon in browser
- [ ] Verify certificate issuer (Vercel/Let's Encrypt)
- [ ] Confirm no mixed content warnings

### 4. Functionality Tests
- [ ] Navigation links scroll smoothly
- [ ] Mobile menu toggles correctly
- [ ] FAQ accordion expands/collapses
- [ ] Screenshot carousel auto-scrolls
- [ ] All buttons are clickable
- [ ] Responsive design works (mobile/tablet/desktop)

### 5. Performance Tests
- [ ] Run Lighthouse audit (target 90+ all categories)
- [ ] Check page load speed (< 2 seconds)
- [ ] Verify images load properly
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)

### 6. SEO Verification
- [ ] Check `robots.txt`: `https://custombank.us/robots.txt`
- [ ] Check `sitemap.xml`: `https://custombank.us/sitemap.xml`
- [ ] Verify meta tags in page source
- [ ] Test social media preview (Twitter Card Validator, Facebook Debugger)

---

## Troubleshooting

### Domain Not Resolving

**Problem:** `custombank.us` shows "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**
1. **Wait for DNS propagation** - New domains typically require 24-48 hours for global propagation. Check progress at https://dnschecker.org/#A/custombank.us
2. Check DNS records in GoDaddy are correct:
   - A record: `@` → `216.198.79.1`
   - CNAME record: `www` → `d26885344f7b750ea.vercel-dns-017.com.`
3. Flush local DNS cache (after waiting 24+ hours):
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Windows
   ipconfig /flushdns

   # Linux
   sudo systemd-resolve --flush-caches
   ```

### SSL Certificate Not Working

**Problem:** Browser shows "Not Secure" or certificate error

**Solutions:**
1. Wait 5-10 minutes after DNS propagation
2. Vercel auto-provisions SSL (usually automatic)
3. Check Vercel dashboard for SSL status
4. Force SSL renewal in Vercel settings if needed

### Vercel Shows "Invalid Configuration"

**Problem:** Red error in Vercel domains panel

**Solutions:**
1. Click "Refresh" button in Vercel
2. Verify DNS records exactly match Vercel's instructions
3. Remove and re-add domain if needed
4. Check GoDaddy for any domain locks or holds

### Changes Not Appearing

**Problem:** Updates pushed to GitHub don't show on live site

**Solutions:**
1. Check Vercel deployments page for build status
2. Wait for automatic deployment (usually 30-60 seconds)
3. Manually redeploy from Vercel dashboard
4. Check for build errors in deployment logs

---

## Maintenance

### Updating Content

1. **Edit files locally:**
   ```bash
   cd /Users/robertburns/Projects/custombank-website
   # Edit index.html, styles.css, or script.js
   ```

2. **Test locally:**
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

4. **Automatic deployment:**
   - Vercel detects push
   - Builds and deploys automatically
   - Live in ~60 seconds

### Adding Real Screenshots

1. Export app screenshots (iPhone/Android)
2. Optimize images:
   ```bash
   # Use TinyPNG, ImageOptim, or:
   npm install -g sharp-cli
   sharp -i screenshot.png -o screenshot-opt.png --webp
   ```

3. Add to `assets/images/`:
   ```bash
   cp ~/screenshots/* assets/images/
   ```

4. Update `index.html`:
   ```html
   <div class="screenshot-frame">
       <img src="assets/images/home-screen.png"
            alt="CustomBank home screen"
            loading="lazy">
   </div>
   ```

### Updating App Store Links

Replace all `href="#"` with actual URLs:

```html
<!-- iOS -->
<a href="https://apps.apple.com/app/custombank/idXXXXXXXXXX">
    Download on App Store
</a>

<!-- Android -->
<a href="https://play.google.com/store/apps/details?id=com.custombankapp.app">
    Get it on Google Play
</a>
```

---

## Rollback Procedure

If something goes wrong:

### Option 1: Revert via Vercel
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Option 2: Revert via Git
```bash
# Find commit to revert to
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push

# Or hard reset (use carefully)
git reset --hard <commit-hash>
git push --force
```

### Option 3: Remove Custom Domain
1. Vercel dashboard → Domains
2. Remove `custombank.us` temporarily
3. Site still accessible via `custom-bank-web-site.vercel.app`
4. Fix issues, then re-add domain

---

## Performance Optimization

Before major traffic:

### 1. Minify Assets
```bash
# CSS
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# JavaScript
npm install -g terser
terser script.js -o script.min.js

# Update index.html references
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

### 2. Add Analytics
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Enable Caching
Vercel handles this automatically, but verify headers:
- Static assets: 1 year cache
- HTML: No cache (always fresh)

---

## Security Checklist

- [x] HTTPS enabled (automatic via Vercel)
- [x] No sensitive data in code
- [x] No API keys exposed
- [x] Input validation on forms (when added)
- [x] CSP headers (Vercel default)
- [x] No inline scripts with user data
- [ ] Add security.txt (optional)
- [ ] Set up DMARC for email domain (if using)

---

## Contact & Support

**Developer:** Bobby Burns
**Email:** support@custombank.us
**GitHub:** https://github.com/bobbyburns1989
**Vercel:** Bobby Burns' projects

**Hosting Support:**
Vercel: https://vercel.com/support
GoDaddy: (480) 463-8641

---

## Change Log

### v1.0.0 - October 8, 2025
- Initial website launch
- 9 complete sections
- Responsive design
- SEO optimization
- Deployed to custombank.us

---

**Status:** 🟡 Waiting for DNS propagation
**ETA:** October 9-10, 2025 (24-48 hours from DNS configuration)
**Check Status:** https://dnschecker.org/#A/custombank.us
**Next Update:** After DNS propagation completes
