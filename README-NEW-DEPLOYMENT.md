# CustomBank.us - Fresh Deployment

**New Repository:** https://github.com/bobbyburns1989/CustomBank.us
**Date:** October 9, 2025
**Purpose:** Clean deployment to fix asset serving issues

---

## 🎯 Why New Repo?

The previous deployment (bobbyburns1989/CustomBankWebSite) had persistent issues:
- Assets (images, favicon) returning 404
- Vercel misconfigured as framework project
- Complex troubleshooting required

**Solution:** Fresh start with correct configuration from the beginning.

---

## ✅ Vercel Configuration

This repo is configured as a **pure static HTML site**:

```json
{
  "version": 2,
  "buildCommand": null,
  "devCommand": null,
  "installCommand": null,
  "framework": null,
  "outputDirectory": "."
}
```

### When Importing to Vercel:

**Critical Settings:**
- Framework Preset: **Other** (or None)
- Build Command: *[leave empty]*
- Output Directory: **.** (just a dot)
- Install Command: *[leave empty]*
- Root Directory: **/** (or ./)

**DO NOT** let Vercel auto-detect a framework!

---

## 📁 Project Structure

```
CustomBank.us/
├── index.html              # Main landing page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── styles.css              # All styles
├── script.js               # All JavaScript
├── vercel.json             # Deployment config
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── favicon.ico             # 32x32 favicon
├── apple-touch-icon.png    # iOS icon
├── site.webmanifest        # PWA manifest
└── assets/
    └── images/             # All screenshots and images
        ├── screenshot-home.png
        ├── screenshot-account-edit.png
        ├── screenshot-transactions.png
        ├── screenshot-receipts.png
        ├── screenshot-bills.png
        ├── screenshot-transfer.png
        └── android-chrome-*.png
```

---

## 🚀 Deployment Steps

### 1. Push to GitHub (Already Done ✅)
```bash
git remote add new-repo https://github.com/bobbyburns1989/CustomBank.us.git
git push new-repo main
```

### 2. Import to Vercel

**Option A: Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose: bobbyburns1989/CustomBank.us
4. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: **/**
   - Build Command: *[leave empty]*
   - Output Directory: **.**
   - Install Command: *[leave empty]*
5. Click "Deploy"
6. Wait 30-60 seconds

**Option B: Vercel CLI**
```bash
# Login first
vercel login

# Deploy
cd /Users/robertburns/Projects/custombank-website
vercel --prod

# Follow prompts:
# - Link to new project: Yes
# - Project name: custombank-us (or similar)
# - Directory: ./
```

### 3. Verify Deployment

**Check all asset types:**
```bash
# Get your Vercel URL (e.g., custombank-us.vercel.app)
VERCEL_URL="your-vercel-url.vercel.app"

# Check HTML
curl -I "https://$VERCEL_URL/" | grep "HTTP"

# Check CSS/JS
curl -I "https://$VERCEL_URL/styles.css" | grep "HTTP"
curl -I "https://$VERCEL_URL/script.js" | grep "HTTP"

# Check assets (THESE SHOULD BE 200, NOT 404!)
curl -I "https://$VERCEL_URL/favicon.ico" | grep "HTTP"
curl -I "https://$VERCEL_URL/assets/images/screenshot-account-edit.png" | grep "HTTP"

# Expected: All should return "HTTP/2 200"
```

### 4. Add Custom Domain

**Once assets are verified working:**

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter: `custombank.us`
   - Enter: `www.custombank.us`

2. **DNS is already configured in GoDaddy:**
   - A record: `@` → `76.76.21.21` (update to new Vercel IP)
   - CNAME record: `www` → `cname.vercel-dns.com.` (update to new CNAME)

3. **Get new DNS values from Vercel:**
   - Vercel will show you the new A and CNAME records
   - Update these in GoDaddy DNS settings

4. **Wait for propagation:**
   - Usually 5-10 minutes
   - Check: https://dnschecker.org/#A/custombank.us

---

## 🔍 Verification Checklist

After deployment, verify ALL of these:

- [ ] HTML loads: `https://[your-vercel-url]/`
- [ ] CSS loads: `https://[your-vercel-url]/styles.css`
- [ ] JS loads: `https://[your-vercel-url]/script.js`
- [ ] **Favicon loads:** `https://[your-vercel-url]/favicon.ico` (200, not 404!)
- [ ] **Hero image loads:** `https://[your-vercel-url]/assets/images/screenshot-account-edit.png` (200!)
- [ ] All screenshots in carousel load
- [ ] Privacy page loads: `https://[your-vercel-url]/privacy`
- [ ] Terms page loads: `https://[your-vercel-url]/terms`
- [ ] Site works on mobile
- [ ] No console errors

---

## 🎯 Success Criteria

**If these all work, migration is successful:**
1. ✅ All HTML/CSS/JS loads
2. ✅ All images in `/assets/images/` load (no 404s!)
3. ✅ Favicon loads
4. ✅ Site looks identical to local version
5. ✅ Navigation works
6. ✅ Mobile responsive
7. ✅ Custom domain (custombank.us) points to new deployment

---

## 📝 Post-Deployment

### Update Old Repo (Optional)
Add a redirect notice to the old repo:
```bash
cd /path/to/old-repo
echo "# DEPRECATED - See https://github.com/bobbyburns1989/CustomBank.us" > DEPRECATED.md
git add DEPRECATED.md
git commit -m "Repo deprecated - moved to CustomBank.us"
git push
```

### Archive Old Vercel Project
1. Go to old project (custom-bank-web-site)
2. Settings → Advanced → Delete Project
3. Or just leave it - won't interfere

---

## 🐛 Troubleshooting New Deployment

### If Assets Still 404:

**Check Vercel Build Settings:**
```bash
# SSH into a deployment (if needed) or check logs
# Verify all files are in deployment:
vercel ls /assets/images
```

**Verify vercel.json is being used:**
- Check Vercel deployment logs
- Look for "Using vercel.json configuration"

**Try adding .vercelignore:**
- Already created - ensures docs don't bloat deployment

### If Domain Won't Connect:

**Get exact DNS records from Vercel:**
1. Vercel Dashboard → Domains
2. Click on custombank.us
3. Copy EXACT A and CNAME values shown
4. Update in GoDaddy
5. Wait 5-10 minutes
6. Clear browser cache: Cmd+Shift+R

---

## 📞 Support

- **Vercel Issues:** https://vercel.com/support
- **DNS Issues:** GoDaddy support
- **Code Issues:** bobby@custombank.us

---

## 🎉 Expected Outcome

After this migration:
- **Old Vercel project:** Can be deleted or archived
- **New Vercel project:** Clean, properly configured, all assets working
- **Domain:** custombank.us points to new deployment
- **No more 404s!** 🎊

---

**Deploy Date:** October 9, 2025
**Repository:** https://github.com/bobbyburns1989/CustomBank.us
**Status:** Ready to deploy
