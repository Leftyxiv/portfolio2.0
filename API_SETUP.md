# API Setup Guide

This guide walks you through setting up the required API keys for the portfolio.

## Required Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

## 1. GitHub Configuration

The GitHub integration displays your contribution stats and repository information using public GitHub stats services.

### Steps:
1. No API token required!
2. Simply add your GitHub username to `GITHUB_USERNAME` in your `.env` file
3. The portfolio uses public services like github-readme-stats which don't require authentication

### What's Displayed:
- Contribution statistics
- Most used programming languages
- Contribution streak
- Public repository count

## 2. Blizzard API (Battle.net)

For displaying live WoW character data.

### Steps:
1. Go to [Blizzard Battle.net Developer Portal](https://develop.battle.net/)
2. Create an account or log in
3. Create a new application
4. Copy the Client ID and Client Secret
5. Add to your `.env` file:
   - `BLIZZARD_CLIENT_ID`
   - `BLIZZARD_CLIENT_SECRET`
   - `BLIZZARD_REGION` (us, eu, kr, or tw)
   - `BLIZZARD_REALM` (your character's realm name)
   - `BLIZZARD_CHARACTER_NAME` (your character name)

## 3. Optional APIs

### Apple Music (if adding music integration)
1. Enroll in the [Apple Developer Program](https://developer.apple.com/programs/)
2. Create a MusicKit identifier and private key
3. Add credentials to `.env`

### Email Service (for contact form)
- Options: SendGrid, Mailgun, or AWS SES
- Add API key and destination email

### Image Optimization (Cloudinary)
- Sign up at [Cloudinary](https://cloudinary.com/)
- Free tier is sufficient for most portfolios
- Helps with automatic image optimization

## Security Notes

- **NEVER** commit your `.env` file to version control
- Rotate API keys regularly
- Use environment-specific keys (dev vs production)
- Consider using a secrets manager for production

## Testing Your Setup

After adding your API keys, test each integration:

```bash
# Start the dev server
npm run dev

# Check the console for any API errors
```

Visit these pages to verify:
- `/projects` - GitHub stats should load
- `/wow` - Character data should display
- Any page with images - Should load optimized versions if Cloudinary is set up