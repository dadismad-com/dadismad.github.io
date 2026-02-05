# 🚀 Quick Start Guide - MAD as a Service

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Test It Out
Open your browser to `http://localhost:3000`

Or try these quick curl commands:

```bash
# Simple MAD
curl http://localhost:3000/mad

# Get method wisdom
curl http://localhost:3000/method

# Pure MADness
curl http://localhost:3000/madness

# Scalable MADness (1-10)
curl http://localhost:3000/mad/7

# JSON format
curl http://localhost:3000/mad?format=json

# HTML with maximum impact
curl http://localhost:3000/madness?format=html&uppercase=true
```

## What's Next?

### Deploy It
Choose your platform:

**Heroku**
```bash
heroku create your-mad-service
git push heroku main
```

**Vercel**
```bash
npm i -g vercel
vercel deploy
```

**Docker**
```bash
docker build -t mad-as-a-service .
docker run -p 3000:3000 mad-as-a-service
```

### Customize It
- Edit `server.js` to add more MAD responses
- Modify the manifesto in the `manifesto` variable
- Add new endpoints following the existing pattern
- Update the home page HTML to match your style

### Share It
Use it as:
- A portfolio piece showing you can ship fun products
- An API for your personal website
- A webhook testing endpoint
- Team motivation service
- Status page backend

## File Structure
```
mad-as-a-service/
├── server.js           # Main application
├── package.json        # Dependencies
├── README.md          # Full documentation
├── Dockerfile         # Container config
├── docker-compose.yml # Docker setup
├── vercel.json        # Vercel config
├── Procfile           # Heroku config
├── test.js            # Simple tests
├── LICENSE            # MIT License
└── CONTRIBUTING.md    # Contribution guide
```

## Troubleshooting

**Port already in use?**
```bash
# Change the port
PORT=4000 npm start
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Want to contribute?**
Check out `CONTRIBUTING.md` for guidelines.

---

⚡ **Remember**: There's always a method to the MADness ⚡

**Questions?** Open an issue on GitHub or check the full README.md
