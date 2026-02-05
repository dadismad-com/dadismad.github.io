# MAD API Integration Guide

## 🤪 Overview

Your DadisMAD portfolio now dynamically fetches different messages on each page load using **AWS Lambda + API Gateway**!

## ✨ How It Works

Every time someone visits your site, the hero section fetches a random message from your serverless API:

- **Default**: "Method has MADness"
- **On Load**: Fetches from `/method` endpoint
- **Messages**: Rotates through 14+ variations like:
  - "There's a method to this MADness."
  - "Where MADness meets methodology."
  - "Methodically MAD, Madly Methodical."
  - "Calculated MADness."
  - And more!

## 🚀 Deploy to AWS Lambda

Your API is in the `lambda/` folder and ready to deploy!

### Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   # Install AWS CLI
   # https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
   
   # Configure with your credentials
   aws configure
   ```

2. **SAM CLI** (optional - deploy script installs it automatically)
   ```bash
   pip install aws-sam-cli
   ```

### Quick Deploy

```bash
cd lambda
./deploy.sh
```

The script will:
- ✅ Check your AWS credentials
- ✅ Create S3 bucket for deployment
- ✅ Build the Lambda function
- ✅ Deploy via CloudFormation
- ✅ Output your API Gateway URL

**That's it!** Your API will be live in ~2 minutes.

### Update API URL in Your Website

After deployment, the script outputs your API Gateway URL. Update `assets/js/mad-api.js`:

```javascript
// Change this line:
const API_BASE_URL = 'YOUR_API_GATEWAY_URL_HERE';

// To your actual URL (from deploy script output):
const API_BASE_URL = 'https://abc123xyz.execute-api.us-east-1.amazonaws.com/Prod';
```

Then commit and push:
```bash
git add assets/js/mad-api.js
git commit -m "Update Lambda API URL"
git push origin main
```

## 📡 API Endpoints

Your Lambda function provides:

| Endpoint | Description |
|----------|-------------|
| `/method` | Methodical wisdom (14 variations) |
| `/madness` | Pure MADness (7 variations) |
| `/random` | Random from all categories |
| `/mad` | Simple MAD affirmations |
| `/mad/5` | Level-based MADness (1-10) |
| `/mad/status` | Status check (418 response) |

## 🎛️ Configuration Options

In `assets/js/mad-api.js`, you can customize:

```javascript
const API_ENDPOINT = '/method';  // Default endpoint used by website

const FALLBACK_MESSAGE = 'Method has MADness'; // Shown if API fails

const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes
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

### Test Lambda Function Locally:

```bash
cd lambda

# Run test script
node test.js

# Or use SAM local
sam local start-api
curl http://localhost:3000/method
```

### Test Deployed API:

```bash
# Replace with your API Gateway URL
API_URL="https://abc123.execute-api.us-east-1.amazonaws.com/Prod"

# Method (used by website)
curl $API_URL/method

# Random MADness
curl $API_URL/random

# Pure madness
curl $API_URL/madness

# Level 5
curl $API_URL/mad/5

# With options
curl "$API_URL/method?uppercase=true&philosophy=true"
```

### Test Website Integration:

1. Open your website
2. Check browser console for: `🤪 MAD Message: [message]`
3. Refresh page to see different message
4. Try keyboard shortcut `Cmd/Ctrl + Shift + M`

## 🎨 Customization

### Add More Messages:

Edit `lambda/index.js`:

```javascript
methods: [
  "There's a method to this MADness.",
  "Your new message here!",
  // Add more...
]
```

Then redeploy:
```bash
cd lambda
./deploy.sh
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

### Query Parameters:
- `uppercase=true` - SHOUTY MODE
- `philosophy=true` - Add bonus MAD wisdom
- `format=text` - Plain text (default: JSON)

## 🐛 Troubleshooting

### Message Not Changing?
- Check browser console for errors
- Verify API URL is updated in `mad-api.js`
- Test API directly: `curl YOUR_API_URL/method`
- Clear sessionStorage: `sessionStorage.clear()`

### Shows Fallback Message?
- Lambda might be cold starting (first request ~1-2s)
- Wrong API URL in `mad-api.js`
- Check CloudWatch Logs for errors

### Lambda Deployment Failed?
- Check AWS credentials: `aws sts get-caller-identity`
- Verify IAM permissions (Lambda, API Gateway, S3, CloudFormation)
- Check CloudFormation events in AWS Console

### CORS Issues?
- CORS is pre-configured in Lambda
- Verify in browser console which header is missing
- Check Lambda logs for actual response

### Cache Issues?
Messages are cached for 5 minutes per session. To force refresh:
- Use `refreshMADMessage()` in console
- Close and reopen browser tab
- Reduce `CACHE_DURATION` in config

## 💰 AWS Costs

**AWS Free Tier (Forever):**
- 1 million Lambda requests/month
- 400,000 GB-seconds compute time/month

**AWS Free Tier (12 months):**
- 1 million API Gateway requests/month

**After Free Tier:**
- Lambda: ~$0.20 per 1M requests
- API Gateway: ~$3.50 per 1M requests

**For a personal portfolio:** You'll likely never pay anything! 🎉

## 📊 Monitoring

### View Logs
```bash
# Tail logs in real-time
sam logs --stack-name mad-as-a-service --tail

# Or use AWS CLI
aws logs tail /aws/lambda/mad-as-a-service --follow
```

### AWS Console
- Lambda: https://console.aws.amazon.com/lambda
- API Gateway: https://console.aws.amazon.com/apigateway
- CloudWatch: https://console.aws.amazon.com/cloudwatch

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
