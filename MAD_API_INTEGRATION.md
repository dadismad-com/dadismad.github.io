# MAD API Integration Guide

## 🤪 Overview

Your DadisMAD portfolio now dynamically fetches different messages on each page load using the **mad-as-a-service** API!

## ✨ How It Works

Every time someone visits your site, the hero section fetches a random message from your API:

- **Default**: "Method has MADness"
- **On Load**: Fetches from `/method` endpoint
- **Messages**: Rotates through 14+ variations like:
  - "There's a method to this MADness."
  - "Where MADness meets methodology."
  - "Methodically MAD, Madly Methodical."
  - "Calculated MADness."
  - And more!

## 🚀 Setup Instructions

### 1. Deploy Your API

Your API lives in `mad-as-a-service/` folder. You need to deploy it first:

#### Option A: Deploy to Render.com (Free)
```bash
cd mad-as-a-service

# Create a Render account at https://render.com
# Create a new Web Service
# Connect your GitHub repo
# Set build command: npm install
# Set start command: npm start
# Deploy!
```

#### Option B: Deploy to Railway.app (Free)
```bash
cd mad-as-a-service

# Visit https://railway.app
# Click "Start a New Project"
# Select "Deploy from GitHub repo"
# Select mad-as-a-service folder
# Railway auto-detects Node.js and deploys
```

#### Option C: Run Locally for Testing
```bash
cd mad-as-a-service
npm install
npm start

# API runs at http://localhost:3000
```

### 2. Update API URL

Once deployed, update the API URL in `assets/js/mad-api.js`:

```javascript
// Change this line:
const API_BASE_URL = 'http://localhost:3000';

// To your deployed URL:
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

### 3. Enable CORS (If Needed)

Your API already has CORS enabled, but make sure your deployed service allows requests from:
- `https://dadismad.com`
- `https://dadismad.github.io`

## 🎛️ Configuration Options

In `assets/js/mad-api.js`, you can customize:

```javascript
const API_ENDPOINT = '/method';  // Change endpoint
// Options: /mad, /method, /madness, /random

const FALLBACK_MESSAGE = 'Method has MADness'; // Fallback if API fails

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration (5 minutes)
```

## 🔄 Manual Refresh

Users can manually refresh the message:

### JavaScript Console:
```javascript
refreshMADMessage()
```

### Keyboard Shortcut:
Press `Cmd/Ctrl + Shift + M` to get a new message

## 🧪 Testing

### Test API Endpoints:

```bash
# Simple MAD
curl https://your-api-url.com/mad

# Method (used by website)
curl https://your-api-url.com/method

# JSON format
curl https://your-api-url.com/method?format=json

# Random from all categories
curl https://your-api-url.com/random
```

### Test Website Integration:

1. Open your website
2. Check browser console for: `🤪 MAD Message: [message]`
3. Refresh page to see different message
4. Try keyboard shortcut `Cmd/Ctrl + Shift + M`

## 🎨 Customization

### Add More Messages:

Edit `mad-as-a-service/server.js`:

```javascript
methods: [
  "There's a method to this MADness.",
  "Your new message here!",
  // Add more...
]
```

### Change Animation:

Edit `assets/js/mad-api.js` in the `updateHeroTitle()` function:

```javascript
function updateHeroTitle(message) {
  // Modify fade/transform animations here
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(-10px)';
  // ...
}
```

## 📊 API Endpoints Available

| Endpoint | Description | Example Response |
|----------|-------------|------------------|
| `/mad` | Simple MAD affirmation | "Absolutely MAD." |
| `/method` | Methodical wisdom | "There's a method to this MADness." |
| `/madness` | Pure MADness | "MAXIMUM MADness ACHIEVED." |
| `/random` | Random from all | Varies |
| `/mad/:level` | Scaled 1-10 | "Quite MAD" (level 5) |
| `/method-to-madness` | Alias for /method | Same as /method |

### Query Parameters:
- `format=json` - JSON response
- `format=xml` - XML response
- `format=html` - HTML page
- `uppercase=true` - SHOUTY MODE
- `philosophy=true` - Add bonus wisdom

## 🐛 Troubleshooting

### Message Not Changing?
- Check browser console for errors
- Verify API is running: visit API URL in browser
- Clear sessionStorage: `sessionStorage.clear()`
- Check CORS headers if using different domain

### Shows Fallback Message?
- API might be down - check deployment
- Network timeout - check internet connection
- Wrong API URL - verify in `mad-api.js`

### Cache Issues?
Messages are cached for 5 minutes per session. To force refresh:
- Use `refreshMADMessage()` in console
- Close and reopen browser tab
- Reduce `CACHE_DURATION` in config

## 🌐 Production Deployment

Before going live:

1. ✅ Deploy API to production service
2. ✅ Update API_BASE_URL to production URL
3. ✅ Test all endpoints
4. ✅ Verify CORS headers
5. ✅ Check error handling
6. ✅ Monitor API response times
7. ✅ Set up API monitoring (optional)

## 🎯 Recommended Services

**Free API Hosting:**
- [Render.com](https://render.com) - Easy, free tier
- [Railway.app](https://railway.app) - Auto-deploys from Git
- [Fly.io](https://fly.io) - Fast, global deployment
- [Vercel](https://vercel.com) - Works with Node.js
- [Netlify Functions](https://netlify.com) - Serverless option

## 📝 Notes

- API responses are cached per session (5 minutes)
- Fallback message ensures site works if API is down
- Animation preserves existing glow effects
- Mobile-optimized with smooth transitions
- Keyboard shortcut for power users

## 🚀 Next Steps

1. Deploy the API
2. Update the API URL
3. Test on your site
4. Push to GitHub Pages
5. Enjoy your dynamic MADness!

---

**Made with method and MADness** ⚡
