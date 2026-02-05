// MAD as a Service - Vercel Serverless Function
// Deploy to: /api/mad

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
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse query parameters
    const { endpoint, level, uppercase, philosophy } = req.query;
    
    let content;
    let statusCode = 200;

    // Route handling based on endpoint query param
    switch (endpoint) {
      case 'method':
      case 'method-to-madness':
        content = getRandomItem(madResponses.methods);
        break;
        
      case 'madness':
        content = getRandomItem(madResponses.pure);
        break;
        
      case 'random':
        const allResponses = [
          ...madResponses.simple,
          ...madResponses.methods,
          ...madResponses.pure
        ];
        content = getRandomItem(allResponses);
        break;
        
      case 'level':
        const lvl = parseInt(level);
        if (isNaN(lvl) || lvl < 1 || lvl > 10) {
          return res.status(400).json({
            error: "MADness level must be between 1 and 10",
            suggestion: "Try ?endpoint=level&level=5 for optimal MADness"
          });
        }
        content = madResponses.levels[lvl];
        break;
        
      case 'status':
        return res.status(418).json({
          status: "I'm a MAD pot",
          madness: "OPERATIONAL",
          method: "VERIFIED",
          uptime: "Serverless infinity",
          message: "System is functioning with calculated chaos"
        });
        
      default:
        // Default to simple mad
        content = getRandomItem(madResponses.simple);
    }

    // Apply formatting
    let finalContent = uppercase === 'true' ? content.toUpperCase() : content;
    
    if (philosophy === 'true') {
      return res.status(statusCode).json({
        mad: finalContent,
        philosophy: getRandomItem(madResponses.methods)
      });
    }

    return res.status(statusCode).json({ mad: finalContent });

  } catch (error) {
    console.error('MAD Error:', error);
    
    return res.status(500).json({
      error: 'Internal MADness Error',
      message: 'The method to this MADness encountered an issue',
      details: error.message
    });
  }
};
