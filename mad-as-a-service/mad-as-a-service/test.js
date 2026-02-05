// Simple test to verify the server runs
const http = require('http');

const PORT = process.env.PORT || 3000;

function testEndpoint(path, expectedStatus = 200) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === expectedStatus) {
          console.log(`✓ ${path} - Status: ${res.statusCode}`);
          resolve({ path, status: res.statusCode, data });
        } else {
          console.log(`✗ ${path} - Expected ${expectedStatus}, got ${res.statusCode}`);
          reject(new Error(`Expected ${expectedStatus}, got ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('\n🧪 Running MAD tests...\n');
  
  try {
    await testEndpoint('/mad');
    await testEndpoint('/method');
    await testEndpoint('/madness');
    await testEndpoint('/mad/5');
    await testEndpoint('/method-to-madness');
    await testEndpoint('/mad/manifesto');
    await testEndpoint('/mad/disclaimer');
    await testEndpoint('/mad/status', 418); // Special case - should return 418
    await testEndpoint('/random');
    await testEndpoint('/mad?format=json');
    
    console.log('\n✅ All tests passed! MADness is operational.\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message, '\n');
    process.exit(1);
  }
}

// Wait a moment for server to start, then run tests
setTimeout(runTests, 1000);
