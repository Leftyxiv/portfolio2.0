# Portfolio Development Plan 🍄

## Completed Features ✅

### 1. **Project Setup**
- ✅ Installed dependencies (Tailwind, Framer Motion, Three.js, React)
- ✅ Configured Astro with Tailwind and React integrations
- ✅ Set up cosmic color palette and global styles

### 2. **Hero Section**
- ✅ Cosmic gradient background with nebula effects
- ✅ Animated spore particles floating in background
- ✅ Interactive bioluminescent mushroom component
- ✅ Name, title, and role badges
- ✅ Responsive layout for mobile/desktop

### 3. **Wife Section** ❤️
- ✅ Dedicated page with aurora background effects
- ✅ Anniversary counter (years, months, days, hours, minutes, seconds)
- ✅ Interactive love story timeline
- ✅ Flip cards showing reasons you love her
- ✅ Photo gallery with lightbox (ready for photos)

### 4. **Interests Grid**
- ✅ Six interest cards with cosmic styling
- ✅ Hover effects and animations
- ✅ Proper sizing with minimum width
- ✅ Icons/emojis for each interest
- ✅ Link to wife section

### 5. **Privacy Page**
- ✅ Clean, minimal design
- ✅ Updated to match nudgenote.app style
- ✅ Clear sections and readable typography

### 6. **Name Update**
- ✅ Changed from Antonio to Manny throughout site
- ✅ Updated in navigation, titles, and all pages

### 7. **WoW Character Showcase**
- ✅ Created dedicated WoW page at `/wow`
- ✅ 3D character viewer with Three.js (placeholder model)
- ✅ Character stats display component
- ✅ Recent activity feed
- ✅ Achievement showcase
- ✅ Guild information section
- ✅ Added to navigation and linked from interest grid

### 8. **Checkr Fair Chance Page**
- ✅ Created dedicated page at `/checkr`
- ✅ Personal fair chance hire story
- ✅ Mission statement section
- ✅ Paying it forward section
- ✅ Call to action with Checkr links
- ✅ Linked from Engineering at Checkr card

## Remaining Features 🚀

### 1. **Projects/Work Section** 💻
- [ ] iOS apps showcase (NudgeNote, etc.)
- [ ] Checkr work highlights
- [ ] GitHub integration for contributions
- [ ] Tech stack visualization
- [ ] Live demos where applicable

### 3. **Mycelium Network Navigation** 🕸️
- [ ] Animated connecting lines between sections
- [ ] Organic growth animations
- [ ] Mobile-friendly alternative navigation
- [ ] Smooth scroll with network highlights

### 4. **Apple Music Integration** 🎸
- [ ] MusicKit JS setup
- [ ] "Currently Playing" widget
- [ ] Favorite metal albums grid
- [ ] Recently played tracks

### 5. **Hidden Photo Manager** 📱
- [ ] Mobile-first upload interface at /admin/photos
- [ ] Camera roll integration
- [ ] Quick categorization buttons
- [ ] Auto-compression and optimization
- [ ] Simple PIN/Face ID security
- [ ] PWA features for offline use

### 6. **Interactive Elements & Easter Eggs** 🎮
- [ ] Konami code → WoW achievement sound
- [ ] Hidden mushrooms that grow when found
- [ ] Metal horns emoji on certain interactions
- [ ] Particle effects respond to mouse movement
- [ ] Secret vegan recipe of the month

### 7. **Dark/Light Mode** 🌓
- [ ] Mushroom-shaped toggle switch
- [ ] Smooth theme transitions
- [ ] Persist user preference
- [ ] Adjust cosmic colors for light mode

### 8. **Additional Pages**
- [ ] About page with career timeline
- [ ] Projects detail pages
- [ ] Blog/thoughts section
- [ ] Contact form

### 9. **Performance & Polish**
- [ ] Image optimization
- [ ] Lazy loading
- [ ] SEO meta tags
- [ ] Open Graph images
- [ ] Analytics (privacy-friendly)
- [ ] Accessibility audit

## Tech Stack 🛠️
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D**: Three.js
- **APIs**: Blizzard, GitHub, Apple MusicKit
- **Hosting**: Static (Netlify/Vercel recommended)

## Design Principles 🎨
- Cosmic color palette (purples, blues, pinks)
- Bioluminescent mushroom accents
- Smooth animations and transitions
- Mobile-first responsive design
- Accessibility first
- Fast loading times

## Implementation TODOs 📋

### Blizzard API Integration
- [ ] Register for Blizzard API access at https://develop.battle.net/
- [ ] Get Client ID and Client Secret
- [ ] Set up environment variables:
  ```
  BLIZZARD_CLIENT_ID=your_client_id
  BLIZZARD_CLIENT_SECRET=your_client_secret
  ```
- [ ] Implement OAuth2 flow for API authentication
- [ ] API endpoints needed:
  - Character profile: `/profile/wow/character/{realmSlug}/{characterName}`
  - Character media: `/profile/wow/character/{realmSlug}/{characterName}/character-media`
  - Character achievements: `/profile/wow/character/{realmSlug}/{characterName}/achievements`
  - Character equipment: `/profile/wow/character/{realmSlug}/{characterName}/equipment`
  - Guild info: `/data/wow/guild/{realmSlug}/{nameSlug}`

### Wife Section Updates
- [ ] Add real photos to `/public/images/wife/` directory
- [ ] Update important dates:
  - **Got Together**: October 30, 2019
  - **Engaged**: April 28, 2020
  - **Married**: December 12, 2020
- [ ] Update AnniversaryCounter to use marriage date (12-12-2020)
- [ ] Add more milestones to LoveTimeline
- [ ] Consider adding engagement photos, wedding photos
- [ ] Maybe add a map component showing places you've traveled together

### Environment Variables Needed
```env
# Blizzard API
BLIZZARD_CLIENT_ID=
BLIZZARD_CLIENT_SECRET=
BLIZZARD_REGION=us
BLIZZARD_REALM=your-realm
BLIZZARD_CHARACTER_NAME=your-character

# Apple MusicKit
APPLE_MUSIC_DEVELOPER_TOKEN=
APPLE_MUSIC_APP_NAME=
APPLE_MUSIC_BUILD=

# GitHub API (for projects)
GITHUB_TOKEN=
GITHUB_USERNAME=

# Photo Upload Security
PHOTO_UPLOAD_PIN=
```

### Static Assets Needed
- [ ] Your photos for wife gallery
- [ ] WoW character screenshots (fallback if API fails)
- [ ] Project screenshots
- [ ] Mushroom photos for mycology section
- [ ] Concert photos for metal section
- [ ] Food photos for vegan section

### Hosting Considerations
- [ ] Choose hosting provider (Vercel, Netlify, Cloudflare Pages)
- [ ] Set up environment variables in hosting dashboard
- [ ] Configure custom domain (aledoux.net)
- [ ] Set up SSL certificate
- [ ] Configure build command: `npm run build`
- [ ] Set publish directory: `dist`

## Notes 📝
- Keep it fun and personal
- Easter eggs should be discoverable but not intrusive
- Performance is key for mobile users
- Privacy-first approach (no tracking without consent)
- Remember to update dates in Wife section components
- Test API integrations with fallbacks for when APIs are down