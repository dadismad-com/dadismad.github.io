# MAD as a Service - AWS Lambda

Enterprise-grade MADness delivered via AWS Lambda + API Gateway.

## 🚀 Quick Deploy

### Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **SAM CLI** (optional, auto-installs with deploy script)
   ```bash
   pip install aws-sam-cli
   ```

### Deploy to AWS

```bash
cd lambda
chmod +x deploy.sh
./deploy.sh
```

The script will:
- ✅ Check AWS credentials
- ✅ Create S3 bucket for deployment
- ✅ Build Lambda function
- ✅ Deploy to AWS with SAM
- ✅ Output your API Gateway URL

## 📡 API Endpoints

Once deployed, your API will be available at:
```
https://[random-id].execute-api.[region].amazonaws.com/Prod/
```

### Available Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/` or `/mad` | Simple MAD affirmation | `GET /mad` |
| `/method` | Methodical wisdom | `GET /method` |
| `/madness` | Pure MADness | `GET /madness` |
| `/random` | Random from all | `GET /random` |
| `/mad/:level` | Scaled MADness (1-10) | `GET /mad/5` |
| `/mad/manifesto` | The MAD manifesto | `GET /mad/manifesto` |
| `/mad/disclaimer` | Legal MADness | `GET /mad/disclaimer` |
| `/mad/status` | System status (418) | `GET /mad/status` |

### Query Parameters

- `uppercase=true` - SHOUTY MODE
- `philosophy=true` - Add bonus MAD wisdom
- `format=text` - Plain text response (default: JSON)

### Examples

```bash
# Method wisdom (JSON)
curl https://your-api-url.com/Prod/method

# Random MADness
curl https://your-api-url.com/Prod/random

# Level 7 MADness
curl https://your-api-url.com/Prod/mad/7

# Uppercase + philosophy
curl "https://your-api-url.com/Prod/madness?uppercase=true&philosophy=true"

# Plain text response
curl "https://your-api-url.com/Prod/method?format=text"
```

## 🧪 Test Locally

### Option 1: Node.js Test Script

```bash
cd lambda
node test.js
```

### Option 2: SAM Local

```bash
cd lambda
sam local start-api

# Test at http://localhost:3000
curl http://localhost:3000/method
```

### Option 3: Invoke Function Directly

```bash
sam local invoke MADFunction -e test-event.json
```

## 📝 Update Your Website

After deployment, update `assets/js/mad-api.js`:

```javascript
const API_BASE_URL = 'https://[your-api-id].execute-api.[region].amazonaws.com/Prod';
```

The API URL will be output after deployment.

## 🔧 AWS Resources Created

The deployment creates:

- **Lambda Function**: `mad-as-a-service`
- **API Gateway**: REST API with CORS enabled
- **IAM Role**: Execution role for Lambda
- **CloudFormation Stack**: `mad-as-a-service`
- **S3 Bucket**: For deployment artifacts

## 💰 AWS Costs

**AWS Free Tier includes:**
- 1 million Lambda requests/month (free forever)
- 1 million API Gateway requests/month (12 months)

**After free tier:**
- Lambda: $0.20 per 1M requests
- API Gateway: $3.50 per 1M requests

**For a personal portfolio**: Likely stays in free tier!

## 🔧 Management

### View Logs

```bash
# Get latest logs
sam logs --stack-name mad-as-a-service --tail

# CloudWatch Logs
aws logs tail /aws/lambda/mad-as-a-service --follow
```

### Update Function

```bash
# Make changes to index.js
# Then redeploy
./deploy.sh
```

### Delete Stack

```bash
aws cloudformation delete-stack --stack-name mad-as-a-service
```

## 🎯 Architecture

```
User Request
    ↓
API Gateway (CORS enabled)
    ↓
Lambda Function (Node.js 18)
    ↓
Random MAD Response
    ↓
JSON Response
```

## 📊 Monitoring

### CloudWatch Dashboard

1. Go to AWS Console → CloudWatch
2. View metrics for:
   - Lambda invocations
   - Error rates
   - Duration
   - Throttles

### CloudWatch Logs

All console.log() statements appear in CloudWatch Logs:
- Log Group: `/aws/lambda/mad-as-a-service`

### X-Ray Tracing (Optional)

Enable in template.yaml:
```yaml
Tracing: Active
```

## 🔐 Security

### CORS Headers

Configured to allow all origins (`*`). Restrict in production:

```yaml
Cors:
  AllowOrigin: "'https://dadismad.com'"
```

### API Gateway Throttling

Default limits:
- 10,000 requests/second
- 5,000 concurrent requests

Adjust in template.yaml if needed.

## 🐛 Troubleshooting

### Deployment Fails

- Check AWS credentials: `aws sts get-caller-identity`
- Ensure IAM permissions for CloudFormation, Lambda, API Gateway, S3
- Check CloudFormation events in AWS Console

### Function Errors

- Check CloudWatch Logs
- Test locally with `node test.js`
- Verify event structure in logs

### CORS Issues

- OPTIONS method is configured
- Verify CORS headers in response
- Check browser console for specific error

## 📚 Additional Resources

- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [AWS SAM Docs](https://docs.aws.amazon.com/serverless-application-model/)
- [API Gateway Docs](https://docs.aws.amazon.com/apigateway/)

## ⚡ Method to the MADness ⚡

Built with AWS Lambda for enterprise-grade MADness delivery.
