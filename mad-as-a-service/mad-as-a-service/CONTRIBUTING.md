# Contributing to MAD as a Service

First off, thanks for taking the time to contribute! 🤪

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Describe the bug clearly
- Include steps to reproduce
- Mention your environment (Node version, OS, etc.)

### Suggesting Enhancements

Have a MAD idea? We'd love to hear it!

- Open an issue with the label "enhancement"
- Clearly describe your suggestion
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-mad-feature`)
3. Make your changes
4. Test your changes (`npm test`)
5. Commit your changes (`git commit -am 'Add some MADness'`)
6. Push to the branch (`git push origin feature/your-mad-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/mad-as-a-service.git

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test
```

## Code Style

- Use consistent formatting (we're methodical about MADness)
- Write clear commit messages
- Add comments for complex logic
- Keep it simple and readable

## Adding New MAD Responses

Want to add more MADness? Edit the `madResponses` object in `server.js`:

```javascript
const madResponses = {
  simple: [
    "Your new MAD response here"
  ],
  // ... etc
};
```

## Adding New Endpoints

1. Add the route in `server.js`
2. Update the README.md documentation
3. Update the home page HTML in the root route
4. Add tests if applicable

## Questions?

Feel free to open an issue with the "question" label.

## Code of Conduct

Be kind, be respectful, be MAD (methodically).

---

**Remember**: There's a method to the MADness. Keep your contributions methodical! ⚡
