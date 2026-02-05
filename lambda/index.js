// MAD as a Service - AWS Lambda Function
// API Gateway + Lambda integration

// MAD responses
const madResponses = {
  simple: [
    "Absolutely MAD.",
    "Undeniably MAD.",
    "Certifiably MAD.",
    "Professionally MAD.",
    "Methodically MAD.",
    "Delightfully MAD.",
    "Unapologetically MAD."
  ],
  
  methods: [
    "There's a method to this MADness.",
    "Methodically MAD, Madly Methodical.",
    "MAD by name, Method by nature.",
    "Making All Decisions with Method to the MADness.",
    "The MADness is the method.",
    "MAD? Yes. Random? Never.",
    "Where MADness meets methodology.",
    "Controlled chaos by MAD design.",
    "Sanely insane since forever.",
    "Strategically unhinged.",
    "Calculated MADness.",
    "M.A.D.: Meticulous. Audacious. Deliberate.",
    "They said I was MAD. Turned out there was a method to it.",
    "Perfectly calculated chaos. Method to the MADness."
  ],
  
  pure: [
    "MAGNIFICENTLY. AUDACIOUSLY. DELIBERATELY.",
    "MAXIMUM MADness ACHIEVED.",
    "ABSOLUTELY UNHINGED (but methodically so).",
    "CHAOS WITH PURPOSE.",
    "MADNESS: OPTIMIZED.",
    "100% ORGANIC, FREE-RANGE MADness.",
    "CERTIFIED MAD SINCE DAY ONE."
  ],
  
  levels: {
    1: "Slightly MAD",
    2: "Mildly MAD",
    3: "Moderately MAD",
    4: "Reasonably MAD",
    5: "Quite MAD",
    6: "Very MAD",
    7: "Extremely MAD",
    8: "Intensely MAD",
    9: "Exceptionally MAD",
    10: "ABSOLUTELY UNHINGED (but methodically so)"
  }
};

const manifesto = `THE MAD MANIFESTO

1. There is always a method to the MADness.
2. MADness without method is just chaos.
3. Method without MADness is just boring.
4. We are Meticulous. Audacious. Deliberate.
5. Conventional wisdom is overrated.
6. Calculated risks beat safe mediocrity.
7. Break the rules methodically.
8. Innovation requires a touch of MADness.
9. Stay MAD, stay methodical.
10. Never apologize for being strategically unhinged.

— Miguel De Los Santos (MAD)`;

// Helper functions
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createResponse(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      ...headers
    },
    body: JSON.stringify(body)
  };
}

// Lambda handler
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  try {
    // Parse path and query parameters
    const path = event.path || '/';
    const params = event.queryStringParameters || {};
    
    let content;
    let statusCode = 200;

    // Route based on path
    if (path === '/' || path === '/mad') {
      // Simple MAD
      content = getRandomItem(madResponses.simple);
      
    } else if (path === '/method' || path === '/method-to-madness') {
      // Method wisdom
      content = getRandomItem(madResponses.methods);
      
    } else if (path === '/madness') {
      // Pure MADness
      content = getRandomItem(madResponses.pure);
      
    } else if (path === '/random') {
      // Random from all categories
      const allResponses = [
        ...madResponses.simple,
        ...madResponses.methods,
        ...madResponses.pure
      ];
      content = getRandomItem(allResponses);
      
    } else if (path.match(/^\/mad\/(\d+)$/)) {
      // Level-based MADness: /mad/5
      const level = parseInt(path.match(/^\/mad\/(\d+)$/)[1]);
      
      if (isNaN(level) || level < 1 || level > 10) {
        return createResponse(400, {
          error: "MADness level must be between 1 and 10",
          suggestion: "Try /mad/5 for optimal MADness"
        });
      }
      
      content = madResponses.levels[level];
      
    } else if (path === '/mad/manifesto') {
      // Manifesto
      content = manifesto;
      
    } else if (path === '/mad/disclaimer') {
      // Disclaimer
      content = "⚠️ No methods were harmed in the making of this MADness. All MADness is ethically sourced and sustainably delivered. Side effects may include: strategic thinking, creative breakthroughs, and an inexplicable urge to break conventional rules. Use responsibly.";
      
    } else if (path === '/mad/status') {
      // Status check
      return createResponse(418, {
        status: "I'm a MAD pot",
        madness: "OPERATIONAL",
        method: "VERIFIED",
        uptime: "Lambda cold start ready",
        message: "System is functioning with calculated chaos",
        lambda: true
      });
      
    } else {
      // 404 - Not found
      return createResponse(404, {
        error: "Endpoint not found",
        message: "Even MADness has its limits",
        suggestion: "Try /method, /madness, or /random",
        availableEndpoints: [
          "/mad",
          "/method",
          "/madness",
          "/random",
          "/mad/:level (1-10)",
          "/mad/manifesto",
          "/mad/disclaimer",
          "/mad/status"
        ]
      });
    }

    // Apply query parameters
    const uppercase = params.uppercase === 'true';
    const philosophy = params.philosophy === 'true';
    const format = params.format || 'json';
    
    let finalContent = uppercase ? content.toUpperCase() : content;
    
    // Build response object
    let responseBody;
    if (philosophy) {
      responseBody = {
        mad: finalContent,
        philosophy: getRandomItem(madResponses.methods)
      };
    } else {
      responseBody = { mad: finalContent };
    }
    
    // Handle different formats
    if (format === 'text' || format === 'plain') {
      return {
        statusCode,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        body: finalContent
      };
    }
    
    // Default JSON response
    return createResponse(statusCode, responseBody);

  } catch (error) {
    console.error('MAD Error:', error);
    
    return createResponse(500, {
      error: 'Internal MADness Error',
      message: 'The method to this MADness encountered an issue',
      details: error.message
    });
  }
};
