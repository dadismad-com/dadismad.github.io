// Test MAD Lambda Function Locally

const { handler } = require('./index');

// Test cases
const testCases = [
  {
    name: 'Root endpoint',
    event: {
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {}
    }
  },
  {
    name: 'Method endpoint',
    event: {
      httpMethod: 'GET',
      path: '/method',
      queryStringParameters: {}
    }
  },
  {
    name: 'Madness endpoint',
    event: {
      httpMethod: 'GET',
      path: '/madness',
      queryStringParameters: {}
    }
  },
  {
    name: 'Random endpoint',
    event: {
      httpMethod: 'GET',
      path: '/random',
      queryStringParameters: {}
    }
  },
  {
    name: 'Level endpoint (5)',
    event: {
      httpMethod: 'GET',
      path: '/mad/5',
      queryStringParameters: {}
    }
  },
  {
    name: 'Uppercase option',
    event: {
      httpMethod: 'GET',
      path: '/method',
      queryStringParameters: { uppercase: 'true' }
    }
  },
  {
    name: 'Philosophy option',
    event: {
      httpMethod: 'GET',
      path: '/madness',
      queryStringParameters: { philosophy: 'true' }
    }
  },
  {
    name: 'Status endpoint',
    event: {
      httpMethod: 'GET',
      path: '/mad/status',
      queryStringParameters: {}
    }
  },
  {
    name: 'Invalid level',
    event: {
      httpMethod: 'GET',
      path: '/mad/99',
      queryStringParameters: {}
    }
  },
  {
    name: '404 endpoint',
    event: {
      httpMethod: 'GET',
      path: '/nonexistent',
      queryStringParameters: {}
    }
  }
];

async function runTests() {
  console.log('🧪 Testing MAD Lambda Function...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const test of testCases) {
    try {
      const result = await handler(test.event);
      const body = JSON.parse(result.body);
      
      console.log(`✅ ${test.name}`);
      console.log(`   Status: ${result.statusCode}`);
      console.log(`   Response:`, body);
      console.log('');
      
      passed++;
    } catch (error) {
      console.log(`❌ ${test.name}`);
      console.log(`   Error: ${error.message}`);
      console.log('');
      
      failed++;
    }
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Tests: ${passed} passed, ${failed} failed`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (failed === 0) {
    console.log('🎉 All tests passed! MADness is operational.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed.\n');
    process.exit(1);
  }
}

runTests();
