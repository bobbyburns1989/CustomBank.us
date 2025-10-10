# 🚀 CustomBank Website - Deployment Quick Start

**Last Updated:** October 10, 2025

---

## ⚡ Quick DNS Fix (URGENT)

### Problem
Your apex domain (`custombank.us`) is pointing to the wrong server.

### Solution (2 Minutes)

1. **Go to GoDaddy DNS Settings:**
   - URL: https://dcc.godaddy.com/control/portfolio/custombank.us/settings

2. **Edit the A Record:**
   - Click "Edit" on the row: `A | @ | 216.198.79.193`

3. **Change the IP:**
   - **Current:** `216.198.79.193` ❌
   - **New:** `76.76.21.21` ✅

4. **Save & Wait:**
   - Click "Save"
   - Wait 5-10 minutes for DNS propagation

5. **Verify:**
   ```bash
   dig custombank.us +short
   ```
   Should return: `76.76.21.21`

---

## 📋 DNS Records (Correct Configuration)

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| **A** | @ | 76.76.21.21 | Apex domain → Vercel |
| **CNAME** | www | d26885344447b750ea.vercel-dns-017.com | WWW subdomain → Vercel |
| NS | @ | ns33.domaincontrol.com | Nameserver 1 |
| NS | @ | ns34.domaincontrol.com | Nameserver 2 |

---

## 🔄 Deployment Process

### Automatic Deployment (GitHub → Vercel)

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main
```

**What Happens:**
1. ✅ Code pushed to GitHub
2. ✅ Vercel detects new commit
3. ✅ Vercel builds the site
4. ✅ Vercel deploys to production (1-2 minutes)

---

## 🧪 Testing Deployment

### 1. Check Git Push Succeeded
```bash
git log --oneline -3
```

### 2. Check DNS Resolution
```bash
# Apex domain
dig custombank.us +short
# Should return: 76.76.21.21

# WWW subdomain
dig www.custombank.us +short
# Should return: d26885344447b750ea.vercel-dns-017.com + IPs
```

### 3. Check Site is Live
```bash
# Check apex domain
curl -I https://custombank.us

# Check www subdomain
curl -I https://www.custombank.us
```

### 4. Verify Latest Version
```bash
# Check CSS version parameter
curl -s https://custombank.us | grep 'styles.css'
# Should show: styles.css?v=20251010-phase1
```

---

## 🐛 Troubleshooting

### Problem: Changes Not Showing

**Try in Order:**

1. **Hard Refresh Browser**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **Check Incognito/Private Window**
   - Bypasses all cache

3. **Check Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Find your project
   - Check deployment status

4. **Force New Deployment**
   ```bash
   # Make any small change and push
   echo "# $(date)" >> .vercel-trigger
   git add .vercel-trigger
   git commit -m "Force deployment"
   git push origin main
   ```

### Problem: DNS Not Resolving

**Check Current DNS:**
```bash
dig custombank.us +short
```

**If wrong IP:**
- Go to GoDaddy DNS settings
- Update A record to `76.76.21.21`
- Wait 5-10 minutes
- Try again

### Problem: 404 Not Found

**Possible Causes:**
- DNS not propagated yet (wait 10 minutes)
- Vercel deployment failed (check dashboard)
- Domain not connected in Vercel (check Vercel settings)

---

## 📊 Deployment Status Check

### GitHub
- Latest commit: https://github.com/bobbyburns1989/CustomBankWebSite/commits/main
- Check for ✅ green checkmark (deployed) or 🟡 yellow (deploying)

### Vercel
- Dashboard: https://vercel.com/dashboard
- Check "Deployments" tab
- Should show "Ready" status

### Live Site
- **Apex:** https://custombank.us
- **WWW:** https://www.custombank.us
- **Vercel Preview:** https://custom-bank-web-site.vercel.app

---

## ✅ Deployment Checklist

Before considering deployment complete:

- [ ] DNS A record set to 76.76.21.21
- [ ] `dig custombank.us` returns correct IP
- [ ] Site loads at https://custombank.us
- [ ] Site loads at https://www.custombank.us
- [ ] Hard refresh performed on browser
- [ ] No console errors (F12 → Console)
- [ ] All new features visible:
  - [ ] Terms link in navigation
  - [ ] Gradient buttons
  - [ ] Scroll progress bar
  - [ ] Mobile sticky CTA (on mobile)
  - [ ] Better spacing and typography

---

## 🆘 Emergency Contacts

**Vercel Support:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

**GoDaddy Support:**
- DNS Management: https://dcc.godaddy.com
- Support: https://www.godaddy.com/help

**GitHub Repository:**
- https://github.com/bobbyburns1989/CustomBankWebSite

---

## 📈 Next Steps (Phase 2)

Once DNS is fixed and site is live:

1. **Performance Optimization**
   - Minify CSS/JS
   - Convert images to WebP
   - Add lazy loading

2. **Analytics Setup**
   - Google Analytics 4
   - Track conversions

3. **Content Updates**
   - Add real app screenshots
   - Update testimonials

See `PHASE1-IMPROVEMENTS.md` for full Phase 2 plan.

---

**Last DNS Check:** October 10, 2025 12:35 AM
**Status:** ⚠️ DNS A record needs update
**Action Required:** Change 216.198.79.193 → 76.76.21.21
