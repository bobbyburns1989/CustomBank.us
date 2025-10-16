# Vercel Deployment Troubleshooting Guide

**Date Created:** October 15, 2025
**Issue:** Vercel not deploying latest commits from GitHub
**Resolution Time:** ~1.5 hours

---

## 🚨 Problem Summary

**Symptoms:**
- Live website (custombank.us) showing old version despite commits being pushed to GitHub
- Navigation showing removed elements: "Pricing", "Use Cases", App Store badges
- Vercel dashboard not showing recent deployments
- Cache age was 54+ hours old

**Root Causes Identified:**
1. **Vercel webhook not triggering** - GitHub pushes not automatically deploying
2. **Invalid vercel.json configuration** - Regex pattern error blocking manual deployments

---

## 🔍 Diagnostic Steps

### Step 1: Verify Local Code is Correct
```bash
# Check current branch
git status

# Verify latest commit
git log --oneline -5

# Confirm latest commit is on GitHub
git ls-remote origin main
```

**Expected Result:** Local commit hash should match remote origin/main

### Step 2: Check Live Site Status
```bash
# Check HTTP headers
curl -sI https://www.custombank.us | grep -E "(age|x-vercel-cache)"
```

**Red Flags:**
- `age: 194946` (cache older than a few minutes)
- `x-vercel-cache: HIT` with old age indicates stale cached version

### Step 3: Verify Vercel Dashboard
1. Go to: https://vercel.com/[your-project]/deployments
2. Check top deployment's:
   - Commit hash
   - Timestamp
   - Status

**Red Flag:** Top deployment is days old, not recent commits

---

## 🛠️ Solution Methods

### Solution 1: Manual Redeploy (First Attempt)

**Steps:**
1. Vercel Dashboard → Deployments tab
2. Click three dots (•••) on most recent deployment
3. Select "Redeploy"
4. Confirm

**Expected:** Vercel pulls latest code from GitHub and deploys

**Issue Encountered:** Vercel redeployed the *same old commit* instead of pulling latest

---

### Solution 2: Create New Deployment (Second Attempt)

**Steps:**
1. Vercel Dashboard → Deployments tab
2. Look for "Create Deployment" or "Deploy" button
3. Enter commit reference

**IMPORTANT:** Enter the **commit hash only**, not full GitHub URL

**Examples:**
- ✅ Correct: `684104e` or `main`
- ❌ Wrong: `https://github.com/user/repo/tree/main`

**Issue Encountered:** Error message:
```
Header at index 3 has invalid 'source' pattern '/(.*)'.(woff2|woff|ttf|eot))'
```

This error indicated a **vercel.json configuration problem**, not a deployment issue.

---

### Solution 3: Fix vercel.json Configuration (Final Solution)

**Problem Found:** Line 49 in `vercel.json` had invalid regex syntax

**Invalid Pattern:**
```json
{
  "source": "/(.*\\.(woff2|woff|ttf|eot))",
  "headers": [...]
}
```

**Why It Failed:**
- Vercel uses `path-to-regexp` library (same as Express.js routing)
- Double-backslash `\\` escaping creates invalid pattern
- Pure RegExp syntax doesn't work - must use path-to-regexp syntax

**Fix Applied:**
```json
{
  "source": "/:path*.(woff2|woff|ttf|eot)",
  "headers": [...]
}
```

**Commit:**
```bash
git add vercel.json
git commit -m "Fix vercel.json invalid source pattern regex for font files"
git push origin main
```

**Result:** New deployment succeeded (99xn6A6cW) in 4 seconds

---

## 📋 Complete Timeline

| Time | Action | Result |
|------|--------|--------|
| 11:00 PM | Pushed commit 684104e (navigation cleanup) | GitHub updated ✅ |
| 11:05 PM | Checked live site - still showing old version | Cache: 53.8 hours old ❌ |
| 11:10 PM | Checked Vercel dashboard - no new deployment | Webhook didn't trigger ❌ |
| 11:15 PM | Attempted manual "Redeploy" | Deployed old commit ❌ |
| 11:35 PM | Attempted "Create Deployment" with commit hash | vercel.json error ❌ |
| 11:45 PM | Fixed vercel.json regex pattern | - |
| 11:48 PM | Pushed commit 6c9a1dc (vercel.json fix) | GitHub updated ✅ |
| 11:50 PM | Created manual deployment with 6c9a1dc | Deployment succeeded ✅ |
| 11:51 PM | Checked live site | Fresh cache (23s old) ✅ |

---

## 🎯 Quick Reference: vercel.json Header Source Patterns

### Valid Patterns

```json
// Match all routes
"source": "/(.*)"

// Match specific files
"source": "/(styles.css|script.js)"

// Match directory with wildcard
"source": "/assets/images/(.*)"

// Match file extensions with named parameter (RECOMMENDED)
"source": "/:path*.(woff2|woff|ttf|eot)"

// Match with named parameter
"source": "/:path*"
```

### Invalid Patterns (Will Cause Errors)

```json
// ❌ Double-backslash escaping
"source": "/(.*\\.(woff2|woff))"

// ❌ Negative lookahead without proper wrapping
"source": "/^(?!books).*$"

// ❌ Pure RegExp syntax
"source": "/\\d{4}\\/\\d{2}\\/.*/"
```

---

## 🔧 Common Issues & Solutions

### Issue: "Webhook not triggering automatic deployments"

**Diagnosis:**
```bash
# Check if Vercel webhook is configured
# In Vercel Dashboard → Settings → Git → Connected Git Repository
```

**Solutions:**
1. Disconnect and reconnect GitHub repository
2. Check GitHub webhook settings: `https://github.com/[user]/[repo]/settings/hooks`
3. Verify Vercel has permission to access the repository
4. Try manual deployment as workaround

---

### Issue: "Vercel deploying old commit instead of latest"

**Diagnosis:**
```bash
# Verify GitHub has latest commit
git ls-remote origin main

# Compare with Vercel deployment commit
# (Check in Vercel dashboard)
```

**Solutions:**
1. Use "Create Deployment" with specific commit hash
2. Force cache invalidation by updating cache-bust comment in HTML
3. Check if Vercel is deploying from a different branch

---

### Issue: "Invalid source pattern" error in vercel.json

**Diagnosis:**
- Error message will specify line number and pattern
- Usually relates to regex syntax in headers/rewrites/redirects

**Solutions:**
1. Use path-to-regexp syntax instead of pure RegExp
2. Wrap regex patterns in named parameters: `/:param(regex)`
3. Test patterns using Express.js routing syntax
4. Reference: https://github.com/pillarjs/path-to-regexp

---

## 📚 Resources

- **Vercel Documentation:** https://vercel.com/docs/projects/project-configuration
- **path-to-regexp Syntax:** https://github.com/pillarjs/path-to-regexp
- **Vercel Git Integration:** https://vercel.com/docs/deployments/git
- **Stack Overflow - Invalid Source Pattern:** https://stackoverflow.com/questions/76538517/whats-the-format-for-headers-source-in-vercel-json

---

## 🧪 Testing Deployment Success

### 1. Check Cache Age
```bash
curl -sI https://www.custombank.us | grep age
```
**Expected:** `age: [low number]` (< 60 seconds indicates fresh deployment)

### 2. Check Vercel Dashboard
1. Look for green "Ready" status
2. Verify commit hash matches your latest commit
3. Check "Current" badge on the deployment

### 3. Visual Verification
1. Open incognito window (⌘ + Shift + N)
2. Visit site
3. Hard refresh (⌘ + Shift + R)
4. Verify changes are visible

---

## 🎓 Key Learnings

1. **Vercel webhooks can fail silently** - Always verify deployment triggered
2. **Manual "Redeploy" doesn't always pull latest code** - May redeploy same commit
3. **vercel.json uses path-to-regexp, NOT pure RegExp** - Critical difference
4. **Cache age is the best deployment indicator** - Low age = recent deployment
5. **Always test in incognito** - Avoids local browser cache issues

---

## 📞 When to Contact Vercel Support

If after trying all solutions above:
- Webhook still not triggering after reconnecting GitHub
- Manual deployments consistently fail with unclear errors
- Deployment succeeds but site doesn't update after 10+ minutes
- Dashboard shows "Ready" but site serves 404 or old content

Contact: https://vercel.com/support

---

**Last Updated:** October 15, 2025
**Successful Resolution:** Deployment 99xn6A6cW (commit 6c9a1dc)
**Total Commits to Fix:** 2 (684104e navigation cleanup, 6c9a1dc vercel.json fix)
