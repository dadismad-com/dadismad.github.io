#!/bin/bash

# MAD as a Service - AWS Lambda Deployment Script
# Requires: AWS CLI and SAM CLI installed

set -e

echo "🤪 Deploying MAD as a Service to AWS Lambda..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install it first.${NC}"
    echo "Install: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo -e "${YELLOW}⚠️  SAM CLI not found. Installing with pip...${NC}"
    pip install aws-sam-cli
fi

# Check AWS credentials
echo "🔐 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured.${NC}"
    echo "Run: aws configure"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)
REGION=${REGION:-us-east-1}

echo -e "${GREEN}✅ AWS Account: $ACCOUNT_ID${NC}"
echo -e "${GREEN}✅ Region: $REGION${NC}"
echo ""

# Create S3 bucket for deployment (if needed)
BUCKET_NAME="mad-as-a-service-deployment-${ACCOUNT_ID}"
echo "📦 Checking S3 bucket: $BUCKET_NAME"

if ! aws s3 ls "s3://$BUCKET_NAME" 2>&1 > /dev/null; then
    echo "Creating S3 bucket..."
    if [ "$REGION" = "us-east-1" ]; then
        aws s3 mb "s3://$BUCKET_NAME"
    else
        aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    fi
    echo -e "${GREEN}✅ S3 bucket created${NC}"
else
    echo -e "${GREEN}✅ S3 bucket exists${NC}"
fi
echo ""

# Build
echo "🔨 Building SAM application..."
sam build
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Deploy
echo "🚀 Deploying to AWS Lambda..."
sam deploy \
    --stack-name mad-as-a-service \
    --s3-bucket "$BUCKET_NAME" \
    --capabilities CAPABILITY_IAM \
    --region "$REGION" \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""

# Get API endpoint
API_URL=$(aws cloudformation describe-stacks \
    --stack-name mad-as-a-service \
    --query 'Stacks[0].Outputs[?OutputKey==`MADApiUrl`].OutputValue' \
    --output text \
    --region "$REGION")

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 MAD as a Service is now LIVE!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📡 API Endpoint:"
echo -e "${YELLOW}$API_URL${NC}"
echo ""
echo "🧪 Test endpoints:"
echo "  curl $API_URL/method"
echo "  curl $API_URL/madness"
echo "  curl $API_URL/random"
echo "  curl $API_URL/mad/5"
echo ""
echo "📝 Update your website:"
echo "  Edit assets/js/mad-api.js"
echo "  Set API_BASE_URL to: $API_URL"
echo ""
echo "🔧 Manage your function:"
echo "  AWS Console: https://console.aws.amazon.com/lambda"
echo "  Function name: mad-as-a-service"
echo ""
echo -e "${GREEN}⚡ Method to the MADness ⚡${NC}"
