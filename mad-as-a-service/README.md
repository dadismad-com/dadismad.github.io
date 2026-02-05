# 🤪 MAD as a Service (MaaS)

> Enterprise-grade MADness. Methodically delivered.

A delightfully absurd microservice that serves pure, unfiltered MADness with a methodical approach. Because sometimes you need an API that confirms: yes, there IS a method to the MADness.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` for full documentation.

## 📡 API Endpoints

### Core Endpoints

#### `GET /mad`
Returns a simple MAD affirmation.

```bash
curl http://localhost:3000/mad
# Output: "Absolutely MAD."
```

#### `GET /method`
Returns methodical wisdom about MADness.

```bash
curl http://localhost:3000/method
# Output: "There's a method to this MADness."
```

#### `GET /madness`
Returns pure, unfiltered MADness.

```bash
curl http://localhost:3000/madness
# Output: "MAGNIFICENTLY. AUDACIOUSLY. DELIBERATELY."
```

#### `GET /mad/:level`
Scalable MADness from 1-10.

```bash
curl http://localhost:3000/mad/1
# Output: "Slightly MAD"

curl http://localhost:3000/mad/10
# Output: "ABSOLUTELY UNHINGED (but methodically so)"
```

#### `GET /method-to-madness`
Random variations of the method to madness philosophy.

```bash
curl http://localhost:3000/method-to-madness
# Output: "Controlled chaos by MAD design."
```

### Special Endpoints

#### `GET /mad/manifesto`
The complete MAD manifesto and methodology.

```bash
curl http://localhost:3000/mad/manifesto
```

#### `GET /mad/disclaimer`
Legal MADness disclaimer.

```bash
curl http://localhost:3000/mad/disclaimer
```

#### `GET /mad/status`
Health check (always returns `418 I'm a MAD pot`).

```bash
curl http://localhost:3000/mad/status
```

#### `GET /random`
Returns any random MAD response.

```bash
curl http://localhost:3000/random
```

## 🎛️ Query Parameters

All endpoints support the following query parameters:

### `format`
Output format: `json`, `xml`, `plain`, `html`

```bash
# JSON format
curl http://localhost:3000/mad?format=json
# {"mad": "Absolutely MAD."}

# XML format
curl http://localhost:3000/mad?format=xml
# <?xml version="1.0" encoding="UTF-8"?>
# <mad>Absolutely MAD.</mad>

# HTML format (rendered page)
curl http://localhost:3000/mad?format=html
```

### `uppercase`
Enable MAXIMUM IMPACT mode.

```bash
curl http://localhost:3000/method?uppercase=true
# THERE'S A METHOD TO THIS MADNESS.
```

### `philosophy`
Add MAD wisdom to your response.

```bash
curl http://localhost:3000/mad?philosophy=true
# Absolutely MAD.
# 
# 💡 MAD Philosophy: Strategically unhinged.
```

## 💡 Examples

```bash
# JSON with philosophy
curl http://localhost:3000/mad?format=json&philosophy=true

# Maximum impact madness
curl http://localhost:3000/madness?uppercase=true

# Scalable MAD in HTML
curl http://localhost:3000/mad/7?format=html

# Method with all the bells and whistles
curl http://localhost:3000/method?format=json&uppercase=true&philosophy=true
```

## 🐳 Docker Support

```bash
# Build the image
docker build -t mad-as-a-service .

# Run the container
docker run -p 3000:3000 mad-as-a-service
```

## 🌐 Deploy

### Heroku
```bash
heroku create your-mad-service
git push heroku main
```

### Vercel
```bash
vercel deploy
```

### Railway
```bash
railway up
```

## 🧪 Use Cases

- **Motivation API**: Get methodical MADness when you need inspiration
- **Status Pages**: Show your service is MAD but functional
- **Webhook Testing**: Test endpoints with calculated chaos
- **Team Culture**: Embed MADness into your Slack bot
- **Portfolio**: Demonstrate your ability to ship delightfully absurd products

## 🎨 Philosophy

The MAD methodology is built on three principles:

1. **Meticulous**: Every detail matters
2. **Audacious**: Bold moves, calculated risks
3. **Deliberate**: There's always a method to the MADness

We believe conventional wisdom is overrated, and innovation requires a touch of strategic chaos.

## 🤝 Contributing

Found a bug? Have a MAD idea? PRs welcome!

1. Fork it
2. Create your feature branch (`git checkout -b feature/more-madness`)
3. Commit your changes (`git commit -am 'Add some MADness'`)
4. Push to the branch (`git push origin feature/more-madness`)
5. Create a new Pull Request

## 📜 License

MIT License - Because MADness should be free.

## 🙏 Credits

Inspired by [Yes as a Service](https://github.com/misterdim/yes-as-a-service)

Created by **Miguel De Los Santos (MAD)**

⚡ Method to the MADness ⚡

---

**Disclaimer**: No methods were harmed in the making of this MADness. All MADness is ethically sourced and sustainably delivered.
