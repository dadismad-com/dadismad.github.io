const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

function formatResponse(content, format, uppercase = false) {
  let processedContent = uppercase ? content.toUpperCase() : content;
  
  switch(format) {
    case 'json':
      return { mad: processedContent };
    case 'xml':
      return `<?xml version="1.0" encoding="UTF-8"?>\n<mad>${processedContent}</mad>`;
    case 'html':
      return `<!DOCTYPE html>
<html>
<head>
  <title>MAD as a Service</title>
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #000; 
      color: #00ff00; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      margin: 0;
      text-align: center;
    }
    .mad { font-size: 2em; font-weight: bold; }
  </style>
</head>
<body>
  <div class="mad">${processedContent}</div>
</body>
</html>`;
    default:
      return processedContent;
  }
}

function handleFormatting(res, content, query) {
  const format = query.format || 'plain';
  const uppercase = query.uppercase === 'true';
  const philosophy = query.philosophy === 'true';
  
  let finalContent = content;
  
  if (philosophy) {
    finalContent += `\n\n💡 MAD Philosophy: ${getRandomItem(madResponses.methods)}`;
  }
  
  const response = formatResponse(finalContent, format, uppercase);
  
  switch(format) {
    case 'json':
      return res.json(response);
    case 'xml':
      return res.type('application/xml').send(response);
    case 'html':
      return res.type('text/html').send(response);
    default:
      return res.type('text/plain').send(response);
  }
}

// Routes

// Home / Documentation
app.get('/', (req, res) => {
  res.type('text/html').send(`
<!DOCTYPE html>
<html>
<head>
  <title>MAD as a Service</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: #0a0a0a;
      color: #00ff00;
      line-height: 1.6;
    }
    h1 { 
      color: #00ff00; 
      text-align: center;
      font-size: 3em;
      margin-bottom: 10px;
    }
    .tagline {
      text-align: center;
      color: #00aa00;
      font-style: italic;
      margin-bottom: 40px;
    }
    h2 { 
      color: #00dd00; 
      border-bottom: 2px solid #00ff00;
      padding-bottom: 5px;
      margin-top: 30px;
    }
    code {
      background: #1a1a1a;
      padding: 2px 6px;
      border-radius: 3px;
      color: #00ffaa;
    }
    .endpoint {
      background: #1a1a1a;
      padding: 15px;
      margin: 10px 0;
      border-left: 4px solid #00ff00;
    }
    .endpoint a {
      color: #00ffaa;
      text-decoration: none;
      font-weight: bold;
    }
    .endpoint a:hover {
      text-decoration: underline;
    }
    ul { list-style-type: square; }
    li { margin: 8px 0; }
    .footer {
      text-align: center;
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #00ff00;
      color: #00aa00;
    }
  </style>
</head>
<body>
  <h1>🤪 MAD as a Service</h1>
  <p class="tagline">Enterprise-grade MADness. Methodically delivered.</p>
  
  <h2>📡 Endpoints</h2>
  
  <div class="endpoint">
    <a href="/mad">/mad</a> - Simple MAD affirmation
  </div>
  
  <div class="endpoint">
    <a href="/method">/method</a> - Returns methodical wisdom
  </div>
  
  <div class="endpoint">
    <a href="/madness">/madness</a> - Pure, unfiltered MADness
  </div>
  
  <div class="endpoint">
    <a href="/mad/5">/mad/:level</a> - Scalable MADness (1-10)
  </div>
  
  <div class="endpoint">
    <a href="/method-to-madness">/method-to-madness</a> - Random method variations
  </div>
  
  <div class="endpoint">
    <a href="/mad/manifesto">/mad/manifesto</a> - The MAD methodology
  </div>
  
  <div class="endpoint">
    <a href="/mad/disclaimer">/mad/disclaimer</a> - Legal MADness
  </div>
  
  <div class="endpoint">
    <a href="/mad/status">/mad/status</a> - System MADness check
  </div>
  
  <h2>🎛️ Query Parameters</h2>
  <ul>
    <li><code>format</code> - Output format: json, xml, plain, html</li>
    <li><code>uppercase</code> - MAXIMUM IMPACT (true/false)</li>
    <li><code>philosophy</code> - Add MAD wisdom (true/false)</li>
  </ul>
  
  <h2>💡 Examples</h2>
  <div class="endpoint">
    <a href="/mad?format=json">/mad?format=json</a>
  </div>
  <div class="endpoint">
    <a href="/method?uppercase=true">/method?uppercase=true</a>
  </div>
  <div class="endpoint">
    <a href="/madness?philosophy=true">/madness?philosophy=true</a>
  </div>
  <div class="endpoint">
    <a href="/mad/10?format=html">/mad/10?format=html</a>
  </div>
  
  <div class="footer">
    <p>Made with method and MADness by Miguel De Los Santos</p>
    <p>⚡ Method to the MADness ⚡</p>
  </div>
</body>
</html>
  `);
});

// Simple MAD
app.get('/mad', (req, res) => {
  const content = getRandomItem(madResponses.simple);
  handleFormatting(res, content, req.query);
});

// Method wisdom
app.get('/method', (req, res) => {
  const content = getRandomItem(madResponses.methods);
  handleFormatting(res, content, req.query);
});

// Pure madness
app.get('/madness', (req, res) => {
  const content = getRandomItem(madResponses.pure);
  handleFormatting(res, content, req.query);
});

// Method to madness (alias)
app.get('/method-to-madness', (req, res) => {
  const content = getRandomItem(madResponses.methods);
  handleFormatting(res, content, req.query);
});

// Scalable madness
app.get('/mad/:level', (req, res) => {
  const level = parseInt(req.params.level);
  
  if (isNaN(level) || level < 1 || level > 10) {
    return res.status(400).json({
      error: "MADness level must be between 1 and 10",
      suggestion: "Try /mad/5 for optimal MADness"
    });
  }
  
  const content = madResponses.levels[level];
  handleFormatting(res, content, req.query);
});

// Manifesto
app.get('/mad/manifesto', (req, res) => {
  handleFormatting(res, manifesto, req.query);
});

// Disclaimer
app.get('/mad/disclaimer', (req, res) => {
  const content = "⚠️ No methods were harmed in the making of this MADness. All MADness is ethically sourced and sustainably delivered. Side effects may include: strategic thinking, creative breakthroughs, and an inexplicable urge to break conventional rules. Use responsibly.";
  handleFormatting(res, content, req.query);
});

// Status endpoint (always returns 418)
app.get('/mad/status', (req, res) => {
  res.status(418).json({
    status: "I'm a MAD pot",
    madness: "OPERATIONAL",
    method: "VERIFIED",
    uptime: "Since the beginning of MADness",
    message: "System is functioning with calculated chaos"
  });
});

// Random endpoint - picks any response type
app.get('/random', (req, res) => {
  const allResponses = [
    ...madResponses.simple,
    ...madResponses.methods,
    ...madResponses.pure
  ];
  const content = getRandomItem(allResponses);
  handleFormatting(res, content, req.query);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: "Even MADness has its limits",
    suggestion: "Try /mad, /method, or /madness",
    hint: "Visit / for full documentation"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   MAD as a Service is now running!   ║
║                                       ║
║   Port: ${PORT}                       ║
║   Method: ✓   MADness: ✓             ║
║                                       ║
║   There's a method to this MADness   ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
