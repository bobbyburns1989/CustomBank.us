# Vercel Deployment Troubleshooting Guide

**Project:** CustomBank Website
**Last Updated:** October 9, 2025
**Issue:** Vercel not deploying latest changes / stuck on old deployment

---

## 🔴 Problem: Site Not Updating with Latest GitHub Commits

### Symptoms
- Push code to GitHub successfully
- Changes appear in GitHub repository
- Live site (custombank.us) shows old version
- Vercel dashboard shows green checkmark but wrong content deployed

### Root Cause
Vercel's Git integration sometimes fails to detect new commits or deploy the latest code, especially when:
- Multiple rapid commits are made
- Repository has been force-pushed or rebased
- Vercel cache is stale
- Git hooks not triggering properly

---

## ✅ Solution: Force Vercel Deployment

### Method 1: Empty Commit (Recommended)
```bash
# Create an empty commit to trigger Vercel's git hook
git commit --allow-empty -m "Force Vercel deployment - sync latest changes"
git push origin main

# Wait 30-60 seconds for deployment
# Verify at: https://custombank.us
```

### Method 2: Vercel CLI (If logged in)
```bash
vercel --prod
```

### Method 3: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select project: custom-bank-web-site
3. Go to Deployments tab
4. Click "Redeploy" on latest deployment
5. Select "Use existing Build Cache: No"
6. Click "Redeploy"

---

## 🐛 Specific Issues Encountered

### Issue #1: Assets/Images Returning 404

**Symptoms:**
- HTML/CSS/JS files load correctly
- Images in `/assets/images/` return 404
- `favicon.ico` returns 404
- Files exist in Git repository

**Diagnosis Commands:**
```bash
# Check if files are in git
git ls-tree HEAD --name-only | grep assets
git ls-files -s | grep favicon

# Verify on live site
curl -I https://custombank.us/assets/images/screenshot-account-edit.png
curl -I https://custombank.us/favicon.ico
```

**Root Cause:**
- `vercel.json` routes configuration was interfering with static file serving
- Complex route rules can prevent Vercel from serving certain directories

**Solution:**
Simplified `vercel.json` to minimal configuration:
```json
{
  "version": 2,
  "public": true,
  "cleanUrls": true,
  "trailingSlash": false,
  "buildCommand": null,
  "outputDirectory": ".",
  "installCommand": null,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

**Deployed via:**
```bash
git add vercel.json
git commit -m "Configure Vercel for static site deployment"
git push origin main
```

### Issue #2: Privacy Policy Link Not Appearing

**Symptoms:**
- Local HTML has: `<a href="privacy.html">Privacy</a>`
- Live site has: `<a href="#">Privacy Policy</a>`
- Recent commits not reflected on live site

**Diagnosis:**
```bash
# Check local file
grep -n "privacy.html" index.html

# Check live site
curl -s "https://custombank.us/" | grep -i "privacy"

# Compare commit hashes
git log --oneline -5                    # Local
git ls-remote origin HEAD               # GitHub
```

**Root Cause:**
Vercel stuck on old deployment (commit from 1+ days ago)

**Solution:**
Force redeploy with empty commit (see Method 1 above)

---

## 📋 Diagnostic Checklist

When site isn't updating, run through these checks:

### 1. Verify Git Status
```bash
cd /Users/robertburns/Projects/custombank-website
git status                    # Should be clean
git log --oneline -5          # See recent commits
git ls-remote origin HEAD     # Verify GitHub has latest
```

### 2. Check What's Actually Deployed
```bash
# Compare specific elements between local and live
grep -n "privacy.html" index.html
curl -s "https://custombank.us/" | grep "privacy"

# Check for specific commit changes
git show HEAD:index.html | grep "hero-subtitle"
curl -s "https://custombank.us/" | grep "hero-subtitle"
```

### 3. Verify Asset Accessibility
```bash
# Test critical assets
curl -I https://custombank.us/styles.css        # Should be 200
curl -I https://custombank.us/script.js         # Should be 200
curl -I https://custombank.us/favicon.ico       # Should be 200
curl -I https://custombank.us/assets/images/screenshot-account-edit.png  # Should be 200
```

### 4. Check Vercel Configuration
```bash
cat vercel.json              # Review configuration
cat .vercelignore 2>/dev/null || echo "No .vercelignore"
cat .gitignore 2>/dev/null || echo "No .gitignore"
```

---

## 🔧 Prevention Strategies

### 1. Always Verify Deployment
After pushing, wait 60 seconds then verify:
```bash
# Quick verification script
git push origin main && sleep 60 && curl -s "https://custombank.us/" | head -50 | tail -20
```

### 2. Use Commit Messages for Tracking
Include what should be deployed:
```bash
git commit -m "Update hero image

Deployed changes:
- New hero screenshot (screenshot-account-edit.png)
- Updated alt text
- Added cache-busting parameter ?v=2

Expected on live site within 60s of push"
```

### 3. Monitor Vercel Deployments
- Check Vercel dashboard after each push
- Look for deployment status: Success vs Failed vs Queued
- Review build logs for errors

### 4. Cache Busting for Critical Assets
Add version parameters to images that must update:
```html
<img src="assets/images/hero.png?v=2">
```

---

## 🚨 Emergency Rollback

If deployment breaks the site:

### Option 1: Revert via Git
```bash
# Find last working commit
git log --oneline

# Revert to that commit
git revert <commit-hash>
git push origin main
```

### Option 2: Revert via Vercel Dashboard
1. Go to Deployments tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

---

## 📝 Troubleshooting Log

### October 9, 2025 - 22:00 EST

**Problem:**
- Site stuck on deployment from Oct 8
- Privacy Policy link not showing
- Hero image returning 404

**Attempted Solutions:**
1. ❌ Regular git push (not detected)
2. ❌ Multiple commits trying to trigger deployment
3. ❌ Modified vercel.json routes (didn't help initially)
4. ✅ Empty commit to force deployment (HTML updated)
5. ✅ Simplified vercel.json configuration (for assets)
6. ✅ Explicit static site configuration in vercel.json

**Commands Used:**
```bash
# Diagnosis
git status
git log --oneline -10
git ls-remote origin HEAD
curl -I https://custombank.us/assets/images/screenshot-account-edit.png
curl -s "https://custombank.us/" | grep "privacy"

# Fix
git commit --allow-empty -m "Force Vercel deployment"
git push origin main

# Verified after 45 seconds
curl -s "https://custombank.us/" | grep 'href="privacy.html"'
# Output: ✓ Privacy link found - deployment successful!
```

**Lessons Learned:**
- Vercel Git integration can fail silently
- Empty commits reliably trigger deployments
- Complex vercel.json routes can break asset serving
- Always verify deployment with curl/browser check
- Wait at least 45-60 seconds after push before checking

**Final Status:**
- HTML/CSS/JS: ✅ Deploying correctly
- Privacy link: ✅ Working
- Assets/Images: 🔄 Testing latest vercel.json fix
- Favicon: 🔄 Testing latest vercel.json fix

---

## 📞 Additional Resources

**Vercel Documentation:**
- Static Sites: https://vercel.com/docs/concepts/projects/overview
- Git Integration: https://vercel.com/docs/concepts/git
- Deployments: https://vercel.com/docs/deployments/overview

**Support Contacts:**
- Vercel Support: https://vercel.com/support
- Project Developer: bobby@custombank.us

**Related Files:**
- `/DEPLOYMENT.md` - Initial deployment guide
- `/README.md` - Project documentation
- `/vercel.json` - Deployment configuration

---

**Last Verified Working:** October 9, 2025 22:15 EST
**Next Steps:** Monitor asset deployment with simplified vercel.json
