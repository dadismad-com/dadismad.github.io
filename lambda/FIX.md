# Fix Deployment Issue

## Problem
The initial deployment failed with: "The REST API doesn't contain any methods"

This was caused by a template configuration issue (now fixed).

## Solution

### 1. Delete the Failed Stack

```bash
aws cloudformation delete-stack --stack-name mad-as-a-service

# Wait for deletion to complete (30 seconds)
aws cloudformation wait stack-delete-complete --stack-name mad-as-a-service
```

### 2. Redeploy with Fixed Template

```bash
cd lambda
./deploy.sh
```

## What Was Fixed

**Before (broken):**
- Defined a separate `MADApi` resource
- SAM auto-generated `ServerlessRestApi` wasn't properly configured
- API Gateway had no methods attached

**After (fixed):**
- Removed separate API definition
- Let SAM auto-generate API from Function Events
- Moved CORS to Globals section
- Added explicit OPTIONS methods for CORS preflight

## Quick Fix Commands

```bash
# From the lambda directory:
cd /Users/migueldelossantos/Downloads/DadisMAD/dadismad.github.io/lambda

# Delete failed stack
aws cloudformation delete-stack --stack-name mad-as-a-service

# Wait for deletion
echo "Waiting for stack deletion..."
aws cloudformation wait stack-delete-complete --stack-name mad-as-a-service

# Redeploy
./deploy.sh
```

## Alternative: Manual Cleanup

If the automated deletion doesn't work:

1. **Go to AWS Console:**
   https://console.aws.amazon.com/cloudformation

2. **Find stack:** `mad-as-a-service`

3. **Click "Delete"**

4. **Wait for deletion to complete**

5. **Run deploy script again:**
   ```bash
   ./deploy.sh
   ```

## Verify It Works

After successful deployment:

```bash
# Test the API (replace with your actual URL)
curl https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/Prod/method

# Should return:
# {"mad":"There's a method to this MADness."}
```
