# Claude Instructions for Frame Extractor PWA

## Project Overview

### What This Project Is
A minimalist Progressive Web App (PWA) that allows users to extract individual frames from videos on their mobile device. Built for content creators working with AI video generation tools who need quick, high-quality frame extraction.

### Technical Specifications

#### Platform
- **Type**: Progressive Web App (PWA)
- **Primary Platform**: Mobile web browsers (iOS Safari, Android Chrome)
- **Display**: Mobile-first, portrait orientation optimized
- **Installation**: Installable to home screen, works offline
- **Development**: VSCode with Claude Code on Mac Studio

#### Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Video Processing**: HTML5 Video API + Canvas API
- **PWA**: Service Worker + Web App Manifest
- **Package Manager**: npm

### Core Concept
Single-purpose tool that does one thing exceptionally well: extract frames from videos with a smooth, intuitive mobile experience. Dark mode only, minimal interface, zero learning curve.

### Key Features
1. Upload video from camera roll
2. Frame-by-frame scrubbing (1/30 second precision) with visual tick marks
3. Extract current frame as PNG (native video resolution)
4. Direct download to device with sequential file naming
5. Sequential file naming (frame_001.png, frame_002.png, etc.)
6. Marline Design System aesthetic with celestial geometry
7. SVG play/pause icons with smooth animations
8. "TAP PLAY TO BEGIN" overlay for intuitive first interaction
9. Mobile-optimized layout (55vh video on mobile, 50vh on desktop)
10. iOS Safari compatibility (inline playback, scrubbing while paused)

---

## How to Work in This Project

### Development Principles
- **Mobile-First**: Always design and test for mobile screens first
- **Simplicity**: No feature creep - focus on core functionality
- **Performance**: Smooth 60fps scrubbing, fast frame extraction
- **Beginner-Friendly**: This is the developer's first coding project
- **Iterative**: Build in phases, test frequently, refine continuously

### Code Organization
```
src/
├── components/          # React components
│   ├── UploadScreen.jsx
│   ├── VideoPlayer.jsx
│   ├── Controls.jsx
│   └── SuccessMessage.jsx
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
│   ├── frameExtractor.js
│   └── fileNaming.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Tailwind + global styles
```

### Coding Guidelines

#### Component Structure
- Keep components small and focused
- Use functional components with hooks
- Props should be clearly named and documented
- Extract reusable logic into custom hooks

#### Styling Approach
- Use Tailwind utility classes primarily
- **Marline Design System**: "The Void" theme with atmospheric gradients
- Gradient background: `#1E2235 → #0B0F19 → #000000`
- Typography: Montserrat font family with wide letter-spacing for labels
- Celestial geometry: circular buttons with glows, horizon lines for separation
- Mobile-first responsive design
- Minimum touch target: 44x44px on mobile
- Generous spacing, breathing room is key (30-40% empty space)

#### File Naming
- Components: PascalCase (e.g., VideoPlayer.jsx)
- Utilities: camelCase (e.g., frameExtractor.js)
- Clear, descriptive names

#### Comments and Documentation
- Explain WHY, not WHAT (code should be self-documenting)
- Add comments for complex logic or browser-specific workarounds
- Keep comments concise and helpful for beginners

### Git Workflow
- Commit after each meaningful milestone
- Clear commit messages describing what was done
- Don't commit node_modules or build files (.gitignore handles this)

---

## Development Phases

### Phase 1: Core Functionality ✅ (Complete)
**Goal**: Get basic frame extraction working

**Tasks**:
- [x] Set up project (Vite + React + Tailwind)
- [x] Create upload screen with file picker
- [x] Implement video player component
- [x] Add timeline scrubber with frame-by-frame control
- [x] Build frame extraction logic (Canvas API)
- [x] Implement direct download functionality

**Success**: ✅ Can upload video, scrub to any point, extract and save frame

### Phase 2: UX Polish ✅ (Complete)
**Goal**: Make the experience smooth and intuitive

**Tasks**:
- [x] Refine scrubber behavior (1/30 second frame-accurate steps)
- [x] Implement sequential file naming system (frame_001.png, etc.)
- [x] Streamline download functionality (direct to device)
- [x] Create "New Video" button with celestial styling
- [x] Polish with Marline Design System ("The Void" theme)
- [x] Optimize mobile-responsive layout (55vh video on mobile)
- [x] Add SVG play/pause icons
- [x] Add "TAP PLAY TO BEGIN" overlay
- [x] Add timeline tick marks for frame visualization
- [x] iOS Safari compatibility (playsInline, webkit-playsinline)

**Success**: ✅ App feels polished, matches Marline aesthetic, works perfectly on iPhone

### Phase 3: PWA Implementation
**Goal**: Enable installation and offline capability

**Tasks**:
- [ ] Create manifest.json with app metadata
- [ ] Add app icons (192x192, 512x512)
- [ ] Implement service worker for offline support
- [ ] Configure standalone mode
- [ ] Test installation on iOS and Android

**Success**: App installs to home screen, works offline

### Phase 4: Testing & Refinement
**Goal**: Bug fixes and final polish

**Tasks**:
- [ ] Cross-browser testing (iOS Safari, Android Chrome)
- [ ] Test with various video formats and sizes
- [ ] Handle edge cases and errors gracefully
- [ ] Performance optimization
- [ ] Final design tweaks

**Success**: Reliable, fast, works across devices

---

## Technical Considerations

### Frame Extraction Method
```javascript
// Basic approach:
// 1. Load video in <video> element
// 2. Create hidden <canvas> element
// 3. Draw current video frame to canvas
// 4. Convert canvas to PNG blob
// 5. Trigger download with <a> download attribute
```

### Critical Browser Compatibility
- iOS Safari: Primary target, test extensively
- Android Chrome: Secondary target
- File download: Use download attribute on <a> tag
- Video formats: Support MP4, MOV, WebM

### Performance Targets
- Scrubber: 60fps response time
- Frame extraction: < 2 seconds
- Video file size: Support up to 500MB
- Load time: < 3 seconds after video selection

### Known Challenges
1. **iOS Save Restrictions**: iOS Safari has specific requirements for triggering downloads
2. **Video Codec Support**: Different browsers support different codecs
3. **Memory Management**: Large videos can cause memory issues
4. **Touch Gestures**: Smooth scrubbing requires careful event handling

---

## Key Requirements Reference

### What to Build
✅ Video upload from camera roll
✅ Video player with play/pause
✅ Timeline scrubber (smooth, precise)
✅ Frame extraction to PNG
✅ Save to camera roll
✅ Sequential file naming
✅ Dark mode UI
✅ Mobile-optimized layout
✅ PWA installation

### What NOT to Build (Out of Scope)
❌ Video recording in app
❌ Multiple frame batch extraction
❌ Frame editing features
❌ Cloud storage/sharing
❌ User accounts
❌ Video trimming/editing
❌ Custom file naming by user
❌ Light mode theme
❌ Desktop optimization

### Design Requirements
- **Design System**: Marline Design System - "The Void" theme
- **Background**: Atmospheric gradient (#1E2235 → #0B0F19 → #000000)
- **Font**: Montserrat (geometric sans-serif)
- **Typography**:
  - Labels: UPPERCASE, light weight (300), wide tracking (0.15em)
  - Data: Medium weight (500), normal tracking
- **UI Elements**:
  - Celestial orbs (circular buttons with glows)
  - Horizon lines (1px separator lines)
  - SVG icons for controls
- **Style**: Atmospheric, celestial, minimalist, ethereal
- **Spacing**: Generous whitespace (30-40% breathing room)
- **Animations**: Smooth fade-ins and transitions (500ms ease-out)

### User Flow
1. User opens app → sees upload button
2. User taps upload → file picker opens
3. User selects video → video loads in player
4. User scrubs timeline → video updates in real-time
5. User taps "Extract Frame" → frame saves to camera roll
6. User sees success message → can extract another or start new video

---

## Working with the Developer

### Communication Style
- **Beginner-Friendly**: Explain concepts clearly, no jargon without explanation
- **Step-by-Step**: Break complex tasks into small, manageable steps
- **Encourage Questions**: Always invite questions and clarifications
- **Teach as You Go**: Explain WHY things work, not just HOW

### When Writing Code
- Add helpful comments explaining what code does
- Use clear, descriptive variable and function names
- Prefer simplicity over cleverness
- Show examples and explain patterns

### Testing and Debugging
- Test on actual iPhone whenever possible
- Explain what to look for when testing
- Help interpret error messages
- Provide clear debugging steps

---

## Success Criteria

### User Experience
✅ Can extract a frame in under 30 seconds
✅ Scrubber feels smooth and precise
✅ Zero confusion about what buttons do
✅ App feels fast and responsive

### Technical Performance
✅ 60fps scrubber response
✅ Frame extraction in < 2 seconds
✅ Handles videos up to 500MB
✅ No crashes or unhandled errors

### Design Quality
✅ Matches minimalist dark aesthetic
✅ All text is readable
✅ Spacing feels balanced
✅ Animations are smooth

---

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [PWA Guide](https://web.dev/progressive-web-apps/)

### Project Files
- Full requirements: `Docs/frame-extractor-requirements.md`
- This file: `CLAUDE.md`
- Project brief: `PROJECT_BRIEF.md`

---

**Current Status**: Phase 1 & 2 Complete ✅ - Core functionality and UX polish done
**Next Milestone**: Phase 3 - PWA Implementation (manifest, service worker, offline support)
**Developer Level**: First coding project - be patient, explain thoroughly, encourage learning
**What Works**: Upload videos, frame-by-frame scrubbing, extract frames with direct download, Marline design, mobile-optimized
