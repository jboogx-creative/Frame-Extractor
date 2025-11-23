# Frame Extractor PWA
## Project Brief

### Overview
A minimalist Progressive Web App designed for content creators to quickly extract individual frames from videos on their mobile device. Single-purpose tool optimized for speed, simplicity, and mobile user experience.

**Target User**: Content creators working with AI video generation tools who need to extract frames for use as input in their creative workflows.

**Core Value**: Fast, intuitive frame extraction with zero learning curve.

---

## Technical Specifications

### Platform & Technology
- **Type**: Progressive Web App (PWA)
- **Platform**: Mobile web browsers (iOS Safari primary, Android Chrome secondary)
- **Tech Stack**: React + Vite + Tailwind CSS
- **Video Processing**: HTML5 Video API + Canvas API
- **Installation**: Installable to home screen, offline-capable

### Display Requirements
- **Orientation**: Portrait primary (landscape supported)
- **Resolution**: Responsive, mobile-first (375px - 428px width)
- **Theme**: Dark mode only (#1a1a1a background)
- **Design Style**: Minimalist, clean, inspired by fitness tracking apps

### Workflow
1. Upload video from camera roll
2. Scrub through video timeline
3. Extract current frame
4. Save as PNG to camera roll
5. Repeat or start new video

---

## Core Features

### 1. Video Upload
- Source: Device camera roll only
- Formats: MP4, MOV, all standard mobile video formats
- Method: Native file picker
- Size limit: Up to 500MB

### 2. Video Playback
- Custom minimal player with Marline aesthetic
- SVG play/pause icons with smooth animations
- Frame-by-frame timeline scrubber (1/30 second steps)
- Real-time video preview while scrubbing
- Visual tick marks for frame indication
- Frame counter display while scrubbing
- Maintains video aspect ratio
- Mobile-optimized (55vh on mobile, 50vh on desktop)
- "TAP PLAY TO BEGIN" overlay for intuitive first interaction
- iOS Safari compatibility (inline playback, scrubbing while paused)

### 3. Frame Extraction
- Extract current frame as PNG
- Native video resolution (no scaling)
- Sequential naming: frame_001.png, frame_002.png, etc.
- Numbering resets each session
- Direct download to device
- Extraction time: < 2 seconds

### 4. User Flow
- Success message after save: "Saved to camera roll"
- Two post-extraction options:
  - "Extract Another" (stay on current video)
  - "Start New Video" (return to upload)

---

## Design Specifications

### Marline Design System - "The Void" Theme

#### Color Palette
- **Background Gradient**:
  - Top: #1E2235 (Midnight Blue)
  - Mid: #0B0F19 (Deep Space)
  - Bottom: #000000 (Pure Black)
- **Accent**: #FFFFFF (Pure White)
- **Text Colors**: White at varying opacities (70% for labels, 100% for data)

#### Typography
- **Font Family**: Montserrat (geometric sans-serif)
- **Label Style**:
  - UPPERCASE
  - Font weight: 300 (light)
  - Letter-spacing: 0.15em (wide tracking)
  - Opacity: 70%
- **Data Style**:
  - Font weight: 500 (medium)
  - Normal letter-spacing
  - Opacity: 100%

#### UI Elements
- **Celestial Orbs**: Circular buttons with glows and subtle borders
- **Horizon Lines**: 1px white lines at 15% opacity for separation
- **SVG Icons**: Custom play/pause icons
- **Spacing**: Generous breathing room (30-40% empty space)

### Layout

#### Upload Screen (Initial)
```
┌─────────────────────┐
│                     │
│   Frame Extractor   │
│                     │
│  [Upload Video Btn] │
│                     │
└─────────────────────┘
```

#### Player Screen
```
┌─────────────────────┐
│                     │
│  [Video Display]    │
│                     │
├─────────────────────┤
│ ▶️ [====●====] 00:45│
├─────────────────────┤
│ [Extract Frame Btn] │
├─────────────────────┤
│ [Start New Video]   │
└─────────────────────┘
```

### Interaction Design
- **Touch Targets**: Minimum 44x44px
- **Spacing**: Generous whitespace
- **Animations**: Subtle, smooth transitions
- **Feedback**: Clear visual response to all interactions
- **No Navigation**: Single-purpose, no complex menus

---

## Performance Requirements

### Speed Targets
- **Video Load**: Ready to scrub within 2-3 seconds
- **Scrubber**: Smooth 60fps response, no lag
- **Frame Extraction**: Complete within 1-2 seconds
- **File Size Support**: Handle 500MB videos without issues

### Usability
- **Learning Curve**: Zero - immediately intuitive
- **Frame Extraction**: Complete flow in < 30 seconds
- **Reliability**: No crashes, graceful error handling

---

## Out of Scope (MVP)

**NOT included in initial version:**
- ❌ Video recording in app
- ❌ Batch frame extraction
- ❌ Frame editing capabilities
- ❌ Cloud storage or sharing
- ❌ User accounts
- ❌ Video trimming/editing
- ❌ Custom file naming
- ❌ Image format options (PNG only)
- ❌ Light mode theme
- ❌ Desktop optimization

---

## Development Phases

### Phase 1: Core Functionality ✅ (Complete)
- [x] Video upload from camera roll
- [x] Video player with play/pause
- [x] Timeline scrubber with frame-by-frame control
- [x] Frame extraction to PNG
- [x] Direct download functionality

**Milestone**: ✅ Can upload, scrub, and extract frames

### Phase 2: UX Polish ✅ (Complete)
- [x] Frame-accurate scrubbing (1/30 second steps)
- [x] Sequential file naming (frame_001.png, etc.)
- [x] Streamlined direct download functionality
- [x] Marline Design System implementation
- [x] Mobile-optimized responsive layout (55vh video on mobile)
- [x] SVG play/pause icons
- [x] "TAP PLAY TO BEGIN" overlay
- [x] Timeline tick marks
- [x] iOS Safari compatibility fixes

**Milestone**: ✅ App feels polished and intuitive, matches Marline aesthetic

### Phase 3: PWA Implementation (Week 3)
- manifest.json configuration
- Service worker for offline support
- App icons (192x192, 512x512)
- Splash screen
- Standalone mode

**Milestone**: Installable, works offline

### Phase 4: Testing & Refinement (Week 4)
- Cross-browser testing
- Edge case handling
- Performance optimization
- Final polish

**Milestone**: Production-ready app

---

## Success Criteria

### User Experience
✅ Extract frame in under 30 seconds from upload to save
✅ Scrubber provides smooth, precise control
✅ Zero confusion about functionality
✅ Feels fast and responsive

### Technical Performance
✅ 60fps scrubber response
✅ < 2 second frame extraction
✅ Handles 500MB videos
✅ No unhandled errors

### Design Quality
✅ Matches minimalist dark aesthetic
✅ High contrast, readable text
✅ Balanced spacing
✅ Smooth animations

---

## Technical Notes

### Frame Extraction Method
```javascript
// 1. Load video in <video> element
// 2. Create hidden <canvas> element
// 3. Draw current video frame to canvas with drawImage()
// 4. Convert canvas to PNG using toBlob()
// 5. Trigger download with <a download> attribute
```

### Browser Compatibility
- **iOS Safari**: Primary target, test extensively
- **Android Chrome**: Secondary target
- **File Saving**: Use download attribute, handle iOS restrictions
- **Video Codecs**: Support common mobile formats

### Known Challenges
1. iOS Safari download restrictions
2. Large file memory management
3. Touch gesture smoothness
4. Video codec compatibility

---

## Key Design Principles

### For Development
- **Mobile-First**: Design for phone screens first
- **Keep It Simple**: One feature, done exceptionally well
- **Performance Matters**: Smooth 60fps is non-negotiable
- **Test Often**: Use real iPhone for testing
- **Beginner-Friendly**: This is a first coding project

### For User Experience
- **Intuitive**: Should work without instructions
- **Fast**: Every interaction feels instant
- **Reliable**: Always works as expected
- **Minimal**: No unnecessary features or complexity

---

## Resources

- **Full Requirements**: `Docs/frame-extractor-requirements.md`
- **Claude Instructions**: `CLAUDE.md`
- **Developer**: First coding project - learning as we build

---

**Current Status**: Phase 1 & 2 Complete ✅ - Fully functional frame extractor with Marline design
**Next Step**: Phase 3 - PWA Implementation (manifest, service worker, offline support)
**Timeline**: 4-week development cycle (2 weeks complete)
**Developer Experience**: First project - prioritize learning and solid fundamentals
**Key Features Working**: Upload, frame-by-frame scrubbing, direct download extraction, Marline aesthetic, mobile-optimized
