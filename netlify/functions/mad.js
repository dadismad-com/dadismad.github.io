// MAD as a Service - Netlify Serverless Function
// Deploy to: /.netlify/functions/mad

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

// Helper function
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Main handler
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse path and query parameters
    const path = event.path.replace('/.netlify/functions/mad', '');
    const queryParams = event.queryStringParameters || {};
    
    let content;
    let statusCode = 200;

    // Route handling
    if (path === '' || path === '/') {
      // Default: simple mad
      content = getRandomItem(madResponses.simple);
      
    } else if (path === '/method' || path === '/method-to-madness') {
      // Method endpoint
      content = getRandomItem(madResponses.methods);
      
    } else if (path === '/madness') {
      // Pure madness
      content = getRandomItem(madResponses.pure);
      
    } else if (path === '/random') {
      // Random from all
      const allResponses = [
        ...madResponses.simple,
        ...madResponses.methods,
        ...madResponses.pure
      ];
      content = getRandomItem(allResponses);
      
    } else if (path.startsWith('/level/')) {
      // Level-based madness
      const level = parseInt(path.split('/')[2]);
      
      if (isNaN(level) || level < 1 || level > 10) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "MADness level must be between 1 and 10",
            suggestion: "Try /level/5 for optimal MADness"
          })
        };
      }
      
      content = madResponses.levels[level];
      
    } else if (path === '/status') {
      // Status check
      return {
        statusCode: 418,
        headers,
        body: JSON.stringify({
          status: "I'm a MAD pot",
          madness: "OPERATIONAL",
          method: "VERIFIED",
          uptime: "Serverless infinity",
          message: "System is functioning with calculated chaos"
        })
      };
      
    } else {
      // 404
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: "Endpoint not found",
          message: "Even MADness has its limits",
          suggestion: "Try /method, /madness, or /random"
        })
      };
    }

    // Apply formatting options
    const uppercase = queryParams.uppercase === 'true';
    const philosophy = queryParams.philosophy === 'true';
    
    let finalContent = uppercase ? content.toUpperCase() : content;
    
    if (philosophy) {
      finalContent = {
        mad: finalContent,
        philosophy: getRandomItem(madResponses.methods)
      };
    } else {
      finalContent = { mad: finalContent };
    }

    return {
      statusCode,
      headers,
      body: JSON.stringify(finalContent)
    };

  } catch (error) {
    console.error('MAD Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal MADness Error',
        message: 'The method to this MADness encountered an issue',
        details: error.message
      })
    };
  }
};
