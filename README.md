# Frame Extractor

A minimalist Progressive Web App for extracting frames from videos on mobile devices.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Phase](https://img.shields.io/badge/phase-3%20complete-success)
![Live](https://img.shields.io/badge/live-Vercel-black)

## Overview

Frame Extractor is a mobile-first PWA designed for content creators who need to quickly extract individual frames from videos. Built with simplicity and performance in mind, it offers a smooth, intuitive experience for frame extraction on mobile devices.

**Perfect for**: Content creators working with AI video generation tools who need high-quality frame extraction.

**🌐 Live App**: [https://frame-extractor-bice.vercel.app/](https://frame-extractor-bice.vercel.app/)
**📱 Install**: Open in Safari on iOS → Share → Add to Home Screen

## Features

- 📱 **Mobile-First Design** - Optimized for iOS Safari, fits on one screen without scrolling
- 🎬 **Video Upload** - Import videos directly from your camera roll
- 🎯 **Frame-by-Frame Scrubbing** - Precise 1/30 second steps with visual tick marks
- 📸 **Frame Extraction** - Save frames as high-quality PNG (native resolution)
- 💾 **Direct Download** - Simple, instant download to device
- 📝 **Auto-Naming** - Sequential file naming (frame_001.png, frame_002.png, etc.)
- 🌌 **Marline Design** - Beautiful atmospheric gradient background ("The Void" theme)
- ✨ **Celestial UI** - Glowing orb buttons, horizon lines, Montserrat typography
- 🎮 **SVG Controls** - Custom play/pause icons with smooth animations
- 👆 **Intuitive UX** - "TAP PLAY TO BEGIN" overlay for clear first interaction
- ⚡ **Fast & Lightweight** - No bloat, just core functionality
- 🍎 **iOS Safari Compatible** - Inline playback, scrubbing while paused
- 📲 **PWA Installable** - Add to home screen on iPhone for native-like experience
- ☁️ **Deployed** - Live at https://frame-extractor-bice.vercel.app/

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Design System**: Marline Design System ("The Void" theme)
- **Typography**: Montserrat (Google Fonts)
- **Video Processing**: HTML5 Video API + Canvas API
- **PWA**: Service Worker + Web App Manifest (vite-plugin-pwa)
- **Deployment**: Vercel
- **Repository**: GitHub

## Design System

Frame Extractor uses the **Marline Design System** with "The Void" theme:

- **Atmospheric Gradient Background**: Midnight Blue (#1E2235) → Deep Space (#0B0F19) → Pure Black (#000000)
- **Celestial Geometry**: Circular orb buttons with subtle glows and shadows
- **Typography**: Montserrat font with wide letter-spacing for labels (0.15em)
- **Hierarchy**: UPPERCASE light labels (300 weight) + medium data values (500 weight)
- **Breathing Room**: Generous spacing, 30-40% empty space for atmospheric feel
- **Smooth Animations**: 500ms ease-out transitions for celestial elegance

Full design system documentation: [Docs/marline-design-system.md](Docs/marline-design-system.md)

## Getting Started

### Prerequisites

- Node.js v18+ and npm v9+
- Modern web browser (Chrome, Safari, Firefox, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frame-extractor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173/`
   - For mobile testing, use your local IP address on the same network

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frame-extractor/
├── public/              # Static assets (icons, manifest)
├── src/
│   ├── components/      # React components
│   │   ├── UploadScreen.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── Controls.jsx
│   │   └── SuccessMessage.jsx
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   │   ├── frameExtractor.js
│   │   └── fileNaming.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── Docs/               # Project documentation
├── CLAUDE.md           # Development instructions
├── PROJECT_BRIEF.md    # Project overview
└── README.md           # This file
```

## Development Phases

### ✅ Phase 0: Setup (Complete)
- [x] Project initialization with Vite + React
- [x] Tailwind CSS v3 configuration
- [x] Development environment setup

### ✅ Phase 1: Core Functionality (Complete)
- [x] Video upload interface with celestial orb button
- [x] Video player component
- [x] Frame-by-frame timeline scrubber (1/30 second steps)
- [x] Frame extraction logic (Canvas API)
- [x] Direct download functionality

### ✅ Phase 2: UX Polish (Complete)
- [x] Frame-accurate scrubber with tick marks
- [x] Sequential file naming (frame_001.png, etc.)
- [x] Streamlined direct download
- [x] Marline Design System implementation
- [x] Mobile-responsive layout (55vh video on mobile)
- [x] SVG play/pause icons
- [x] "TAP PLAY TO BEGIN" overlay
- [x] iOS Safari compatibility fixes

### ✅ Phase 3: PWA Implementation (Complete)
- [x] Web App Manifest
- [x] Service Worker (vite-plugin-pwa)
- [x] App icons (192x192, 512x512)
- [x] Offline support with Workbox caching
- [x] iOS installation support
- [x] Deployed to Vercel
- [x] Tested on iPhone

### ⏳ Phase 4: Testing & Refinement
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Error handling
- [ ] Final polish

## Usage

1. **Upload a Video**
   - Tap the celestial orb "CHOOSE VIDEO" button
   - Select a video from your camera roll

2. **Navigate the Video**
   - Tap the play button to begin (removes "TAP PLAY TO BEGIN" overlay)
   - Use the timeline scrubber for frame-by-frame control (1/30 second steps)
   - Watch the frame counter while scrubbing
   - Tap play/pause to control playback

3. **Extract Frame**
   - Tap "FRAME" button
   - Frame downloads instantly as PNG to your device

4. **Start New Video**
   - Tap "NEW VIDEO" button to return to upload screen
   - Frame numbering resets for each new video

## Performance Targets

- ✅ **Scrubber Response**: Frame-by-frame precision (1/30 second steps)
- ✅ **Frame Extraction**: Instant download (< 1 second)
- ✅ **Video Support**: Up to 500MB files
- ✅ **Mobile Layout**: Fits on one iPhone screen without scrolling
- ✅ **Load Time**: Instant with "TAP PLAY TO BEGIN" overlay

## Browser Support

- ✅ iOS Safari (primary target)
- ✅ Android Chrome (secondary target)
- ✅ Desktop browsers (limited testing)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Testing on Mobile

1. Make sure your mobile device and development machine are on the same WiFi
2. Find your computer's local IP address
3. On mobile, navigate to `http://[YOUR-IP]:5173/`
4. Test the app as a real user would

## Contributing

This is a personal learning project, but suggestions and feedback are welcome!

## Roadmap

### Phase 3 (Next)
- PWA implementation (manifest, service worker, offline support)
- App icons and splash screen
- Installation prompt

### Future Enhancements
- Batch frame extraction (multiple frames at once)
- Custom file naming templates
- Additional image formats (JPEG, WebP)
- Frame preview before saving
- Basic frame editing (crop, rotate)
- Video recording in-app

## License

MIT

## Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Developed with [Claude Code](https://claude.ai/)

---

**Status**: Phase 1, 2 & 3 Complete ✅ - Production-Ready PWA
**Version**: 1.0.0
**Live URL**: https://frame-extractor-bice.vercel.app/
**Next**: Phase 4 - Testing & Refinement (optional enhancements)
**Last Updated**: November 22, 2024
