# Frame Extractor PWA - Requirements Document

## Project Overview

**Project Name**: Frame Extractor  
**Type**: Progressive Web App (PWA)  
**Primary Goal**: Enable users to quickly extract individual frames from videos on their mobile device with an intuitive, beautiful interface  
**Target Platform**: Mobile web browsers (iOS Safari, Android Chrome) with PWA installation capability  
**Development Environment**: VSCode with Claude Code on Mac Studio  
**Developer Experience Level**: First coding project

---

## Core Purpose

Create a minimalist, dark-mode mobile web application that allows users to:
1. Upload videos from their phone's camera roll
2. Scrub through the video using an intuitive timeline slider
3. Extract specific frames as high-quality PNG images
4. Save extracted frames directly to their camera roll

---

## Target Audience

**Primary User**: Content creators working in social media and AI image/video generation who need to quickly extract frames from videos for use as input in video generation models or other creative workflows.

**User Needs**:
- Fast, intuitive frame extraction on mobile device
- No complex features or learning curve
- Clean, distraction-free interface
- Reliable save-to-camera-roll functionality

---

## Functional Requirements

### 1. Video Upload
- **Upload Source**: Device camera roll only
- **Supported Formats**: MP4, MOV, and all standard video formats supported by modern mobile browsers
- **Upload Method**: Native file picker accessed via button/upload zone
- **UX Flow**: 
  - User taps "Upload Video" or similar CTA
  - Native file picker opens
  - User selects video from camera roll
  - Video loads into player interface

### 2. Video Playback Interface
- **Video Player**: Custom-built player with minimal controls
- **Playback Controls**:
  - Play/Pause button
  - Timeline scrubber (slider)
  - Current timestamp display (MM:SS format)
- **Scrubber Behavior**: 
  - Smooth scrubbing experience matching iPhone camera roll behavior
  - Shows video thumbnail/preview while scrubbing
  - Precise frame-level control
  - Visual feedback during scrub (video updates in real-time)
- **Video Display**: 
  - Video fills available space while maintaining aspect ratio
  - No distortion or letterboxing that looks awkward
  - Centered on screen

### 3. Frame Extraction
- **Extract Button**: Clear, prominent button (e.g., "Extract Frame" or capture icon)
- **Extraction Behavior**:
  - Captures current frame shown in video player
  - Immediately triggers download to camera roll
  - No preview/confirmation step
  - Shows success message after save completes
- **Output Format**: PNG
- **Output Quality**: Matches native video resolution exactly (no upscaling or downscaling)
- **File Naming**: Sequential numbering system
  - Format: `frame_001.png`, `frame_002.png`, `frame_003.png`, etc.
  - Numbering resets when app session ends (user closes/refreshes app)
  - Numbers increment for each frame extracted during the session

### 4. Post-Extraction Flow
- **Success Message**: 
  - Brief, non-intrusive confirmation: "Saved to camera roll"
  - Appears for 2-3 seconds
- **Action Options**:
  - "Extract Another" - stays on current video, allows user to scrub to new position
  - "Start New Video" - returns to upload screen for fresh video
- **Layout**: Two clear buttons/options, equal visual weight

### 5. Session Management
- **Sequential Numbering**: Resets each time user opens/refreshes the app
- **Video State**: If user chooses "Extract Another," video remains loaded at current position
- **No Multi-Frame Queue**: One frame extracted at a time (no batch operations)

---

## Non-Functional Requirements

### Performance
- **Load Time**: Video should load and be ready to scrub within 2-3 seconds of selection
- **Scrubber Responsiveness**: No lag when scrubbing - smooth 60fps experience
- **Extraction Speed**: Frame extraction and save should complete within 1-2 seconds
- **File Size Handling**: Support videos up to 500MB without performance degradation

### Usability
- **Intuitive Design**: Zero learning curve - users should understand all functions immediately
- **Touch Targets**: All buttons and controls minimum 44x44px for easy mobile tapping
- **Gesture Support**: Scrubber works smoothly with touch/swipe gestures
- **Feedback**: Clear visual feedback for all interactions (button presses, loading states, success/error states)

### Accessibility
- **Dark Mode**: Primary and only theme (no light mode required for MVP)
- **Contrast**: Sufficient contrast between text and background for readability
- **Status Messages**: Clear, readable success/error messages

### Reliability
- **Browser Compatibility**: Works flawlessly on iOS Safari and Android Chrome
- **Error Handling**: 
  - Graceful handling of unsupported video formats
  - Clear error messages if save fails
  - Recovery options if video fails to load
- **Offline Capability**: Once installed as PWA, should work offline for already-loaded videos

### Security & Privacy
- **Local Processing**: All video processing happens client-side (no uploads to servers)
- **No Data Storage**: No videos or frames stored in app (only temporary session state)
- **Camera Roll Permissions**: Properly request and handle camera roll access permissions

---

## Technical Requirements

### Technology Stack
- **Frontend Framework**: React + Vite (modern, fast, developer-friendly)
- **Styling**: Tailwind CSS (utility-first, rapid development)
- **Video Processing**: HTML5 Video API + Canvas API for frame extraction
- **PWA Features**: Service worker, manifest.json, offline support
- **File Handling**: File System Access API or fallback download mechanisms

### PWA Configuration
- **Installable**: Proper manifest.json with icons and display settings
- **Standalone Mode**: Opens as full-screen app when installed (no browser chrome)
- **Orientation**: Portrait and landscape support
- **Icons**: App icons for home screen (multiple sizes: 192x192, 512x512)
- **Splash Screen**: Simple branded splash screen during load

### Browser APIs Required
- **File Input API**: For video upload from camera roll
- **HTML5 Video API**: For video playback and scrubbing
- **Canvas API**: For capturing video frames
- **Download/Save API**: For saving PNG to camera roll
- **Service Worker API**: For PWA installation and offline support

### Development Environment
- **IDE**: VSCode
- **Development Tool**: Claude Code (AI-assisted vibe coding)
- **Local Development Server**: Vite dev server
- **Testing Device**: iPhone (primary), Mac Studio for development
- **Version Control**: Git recommended for tracking changes

---

## Design Requirements

### Visual Style
- **Design Language**: Minimalist, clean, inspired by modern fitness/health tracking apps
- **Color Scheme**: 
  - **Primary Background**: Dark gray (#1a1a1a or similar)
  - **Secondary Elements**: Slightly lighter gray (#2a2a2a - #3a3a3a)
  - **Text**: White (#ffffff) with high contrast
  - **Accent Color**: Subtle, possibly white or light gray for active states
  - **Success State**: Subtle green or white indication
- **Typography**:
  - Clean, modern sans-serif font (system font stack or Inter/SF Pro)
  - Clear hierarchy (larger text for headings, smaller for secondary info)
  - Readable sizes for mobile (minimum 16px for body text)
- **Spacing**: Generous whitespace, not cramped
- **Animations**: Subtle, smooth transitions (buttons, state changes)

### Layout & Components

#### Upload Screen (Initial State)
- Centered content
- App name/logo at top (optional, can be minimal)
- Large, clear "Upload Video" button or drop zone
- Minimal instructions if any

#### Player Screen (After Upload)
```
┌─────────────────────────────┐
│                             │
│     [Video Display Area]    │
│                             │
│                             │
├─────────────────────────────┤
│  ▶️  [=========●===]  00:45  │  ← Play button, scrubber, timestamp
├─────────────────────────────┤
│   [ Extract Frame Button ]  │  ← Prominent CTA
├─────────────────────────────┤
│   [Start New Video Button]  │  ← Secondary action
└─────────────────────────────┘
```

#### Success State
- Brief overlay or toast message: "Saved to camera roll"
- Two options displayed:
  - "Extract Another" (stays on video)
  - "Start New Video" (returns to upload)

### Interaction Design
- **Upload Button**: Large, inviting, primary action
- **Play/Pause**: Clear icon (▶️/⏸️), positioned near scrubber
- **Scrubber**: 
  - Smooth, responsive slider
  - Shows current position with dot/handle
  - Updates video in real-time during scrub
  - Displays timestamp
- **Extract Frame Button**: 
  - Primary button style
  - Prominent placement below video
  - Clear label or icon
- **Post-Extract Actions**: Two equally weighted buttons
- **No Menu/Nav**: Single-purpose app, no complex navigation

### Responsive Design
- **Mobile-First**: Designed primarily for phone screens (375px - 428px width)
- **Portrait Optimization**: Primary orientation, but landscape should work
- **Safe Areas**: Respect iOS notches and Android navigation bars
- **Scrolling**: Minimal or no scrolling required on standard screens

---

## Out of Scope (Not Included in MVP)

The following features are explicitly **NOT** part of this initial version:
- ❌ Video recording directly in app
- ❌ Multiple frame selection/batch extraction
- ❌ Frame editing capabilities
- ❌ First frame/last frame labeling
- ❌ Cloud storage or sharing features
- ❌ User accounts or authentication
- ❌ Video trimming or editing
- ❌ Multiple video projects open simultaneously
- ❌ Image format options (only PNG for now)
- ❌ Custom file naming by user
- ❌ Frame preview before saving
- ❌ Installation instructions or onboarding
- ❌ Light mode theme
- ❌ Desktop optimization (mobile-only focus)

---

## Development Phases

### Phase 1: Core Functionality (Week 1)
**Goal**: Get basic frame extraction working

**Deliverables**:
- Video upload from camera roll
- Basic video player with play/pause
- Timeline scrubber that updates video
- Frame extraction to PNG
- Download to device

**Success Criteria**: Can upload a video, scrub to any point, and extract a frame that saves to camera roll

---

### Phase 2: UX Polish (Week 2)
**Goal**: Make the experience smooth and intuitive

**Deliverables**:
- Refined scrubber behavior (iPhone-like smoothness)
- Sequential file naming system
- Post-extraction success message
- "Extract Another" vs "Start New Video" flow
- Dark mode styling
- Responsive layout optimization

**Success Criteria**: App feels polished and intuitive to use, matches design reference

---

### Phase 3: PWA Implementation (Week 3)
**Goal**: Enable installation and offline capability

**Deliverables**:
- PWA manifest.json
- Service worker for offline support
- App icons (home screen)
- Splash screen
- Standalone mode configuration

**Success Criteria**: App can be installed to home screen, works offline, feels like native app

---

### Phase 4: Testing & Refinement (Week 4)
**Goal**: Bug fixes and final polish

**Deliverables**:
- Cross-browser testing (iOS Safari, Android Chrome)
- Edge case handling (large files, unsupported formats, errors)
- Performance optimization
- Final design tweaks

**Success Criteria**: App works reliably across devices, handles errors gracefully

---

## Success Metrics

### User Experience
- ✅ User can extract a frame in under 30 seconds from upload to save
- ✅ Scrubber provides smooth, precise control
- ✅ Zero confusion about what buttons do
- ✅ App feels fast and responsive

### Technical Performance
- ✅ Scrubber responds within 16ms (60fps)
- ✅ Frame extraction completes within 2 seconds
- ✅ Works on videos up to 500MB
- ✅ No crashes or unhandled errors

### Design Quality
- ✅ Matches the minimalist, dark aesthetic of reference design
- ✅ All text is readable against dark background
- ✅ Spacing and layout feel balanced
- ✅ Animations are subtle and smooth

---

## Technical Considerations & Notes

### Frame Extraction Method
- Use HTML5 `<video>` element to load and play video
- Use `<canvas>` element to capture current video frame
- Draw current video frame to canvas using `drawImage()`
- Convert canvas to PNG using `toDataURL()` or `toBlob()`
- Trigger download using temporary `<a>` element with download attribute

### Scrubber Implementation
- Use `<input type="range">` styled with custom CSS
- Listen to `input` event for real-time scrubbing
- Update video `currentTime` property as user scrubs
- Display current time from video `currentTime` property
- Consider `timeupdate` event for smooth timestamp display

### PWA Manifest Example
```json
{
  "name": "Frame Extractor",
  "short_name": "FrameX",
  "description": "Extract frames from videos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#1a1a1a",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### File Naming Logic
```javascript
// Session-based counter (resets on app open/refresh)
let frameCounter = 1;

function generateFrameName() {
  const paddedNumber = String(frameCounter).padStart(3, '0');
  frameCounter++;
  return `frame_${paddedNumber}.png`;
}
```

### Save to Camera Roll
- iOS Safari: Use download attribute on `<a>` tag
- Android Chrome: Use File System Access API if available, fallback to download
- Ensure user gesture triggers save (button click) to avoid popup blockers

---

## Risks & Mitigations

### Risk 1: Browser Compatibility Issues
**Description**: Different browsers may handle video/canvas APIs differently  
**Likelihood**: Medium  
**Impact**: High  
**Mitigation**: 
- Test early and often on target devices (iOS Safari, Android Chrome)
- Use feature detection and provide fallbacks
- Reference MDN Web Docs for browser compatibility

### Risk 2: File Size/Performance
**Description**: Large video files may cause performance issues or crashes  
**Likelihood**: Medium  
**Impact**: Medium  
**Mitigation**:
- Set reasonable file size limits (500MB recommended)
- Show loading states during processing
- Test with various file sizes during development

### Risk 3: Save to Camera Roll Not Working
**Description**: iOS Safari has restrictions on saving files  
**Likelihood**: Low-Medium  
**Impact**: High (core feature)  
**Mitigation**:
- Research iOS-specific save mechanisms early
- Test download functionality as soon as implemented
- Consider alternative save methods if needed (share API)

### Risk 4: First-Time Developer Learning Curve
**Description**: No prior coding experience may slow development  
**Likelihood**: High  
**Impact**: Medium  
**Mitigation**:
- Work with Claude Code for guidance and code generation
- Break project into small, manageable milestones
- Focus on getting things working before making them perfect
- Iterate and refine over multiple passes

---

## Future Enhancements (Post-MVP)

Ideas to consider after the core app is working well:

1. **Frame Previews**: Show thumbnail preview before saving
2. **Batch Extraction**: Extract multiple frames in one session
3. **Custom Naming**: Let user input custom filename
4. **Image Formats**: Support JPEG, WebP in addition to PNG
5. **Quality Settings**: Let user choose output resolution/quality
6. **Frame History**: View recently extracted frames in-app
7. **Video Recording**: Record video directly in app
8. **Basic Editing**: Crop, rotate, or adjust extracted frames
9. **Sharing**: Direct share to social media or other apps
10. **AI Integration**: Google Imagen or other editing APIs

---

## Notes for Development

### Getting Started with Claude Code
1. Open VSCode on your Mac Studio
2. Create a new project folder for Frame Extractor
3. Initialize a Vite + React project: `npm create vite@latest frame-extractor -- --template react`
4. Install Tailwind CSS following their Vite guide
5. Work with Claude Code to build components iteratively
6. Test frequently in your iPhone browser (use `npm run dev` and access via local network IP)

### Development Workflow
1. **Start Simple**: Get video upload working first
2. **Iterate**: Build one feature at a time, test as you go
3. **Mobile Test**: Constantly check on actual phone, not just desktop browser
4. **Ask Questions**: Use Claude Code to explain concepts you don't understand
5. **Commit Often**: Save your progress with git commits at each milestone

### Learning Resources
- MDN Web Docs: https://developer.mozilla.org/
- React Documentation: https://react.dev/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- PWA Documentation: https://web.dev/progressive-web-apps/

---

## Conclusion

This Frame Extractor PWA is designed to be a perfect first vibe coding project:
- ✅ **Clear scope**: One core feature done really well
- ✅ **Practical use**: Solves a real problem in your workflow
- ✅ **Achievable**: Can be built in 3-4 weeks with Claude Code
- ✅ **Expandable**: Solid foundation for future enhancements
- ✅ **Learning opportunity**: Covers web fundamentals, APIs, and PWA concepts

By focusing on clean design and smooth user experience, you'll create a tool you actually want to use while building confidence in vibe coding. The key is to build iteratively, test on real devices, and not get overwhelmed by trying to do everything at once.

**Remember**: Done is better than perfect. Get the core working first, then polish!

---

**Document Version**: 1.0  
**Last Updated**: November 22, 2024  
**Project Status**: Ready for Development  
**Next Step**: Set up development environment and start Phase 1
