# Marline Design System

**Aesthetic Profile**: Atmospheric · Celestial · Minimalist · Ethereal

---

## 1. Core Philosophy

The Marline aesthetic is defined by the **absence of clutter** and the **presence of atmosphere**. 

### Key Principles:
- Elements never feel stuck on a flat plane — they **float within a colored void**
- Design relies on **verticality** and **celestial geometry** (circles, lines)
- Strict **typographic hierarchy**
- Emphasis on breathing room and empty space

---

## 2. Color Palette & Themes

The system does **not** use a single background color. Instead, it uses **Atmospheric Gradients** representing states of nature (Time, Tide, Weather).

### Theme A: "The Shallows" (Tides/Day)

**Concept**: Tropical water, calm clarity

**Gradient Type**: Vertical Linear

**Color Stops**:
```css
background: linear-gradient(
  to bottom,
  #89C4D1,  /* Soft Turquoise */
  #52BDB8,  /* Teal */
  #4CBFB4   /* Aquamarine */
);
```

**Accent Color**: Pure White `#FFFFFF`

---

### Theme B: "The Dusk" (Sunset/Rising)

**Concept**: Haze, warmth fading into night

**Gradient Type**: Vertical Linear

**Color Stops**:
```css
background: linear-gradient(
  to bottom,
  #8E819F,  /* Muted Lavender */
  #B58B9C,  /* Soft Plum */
  #E09296   /* Salmon Pink */
);
```

---

### Theme C: "The Void" (Night/Moon)

**Concept**: Deep space, absolute contrast

**Gradient Type**: Radial or Vertical

**Color Stops**:
```css
background: linear-gradient(
  to bottom,
  #1E2235,  /* Midnight Blue */
  #0B0F19,  /* Deep Space */
  #000000   /* Pure Black */
);
```

**Texture**: Subtle noise or star speckles (opacity 0.1-0.2) often overlaid

---

### Theme D: "The Mist" (Clouds/Overcast)

**Concept**: Fog, diffusion, neutrality

**Gradient Type**: Vertical Linear

**Color Stops**:
```css
background: linear-gradient(
  to bottom,
  #5E6F7A,  /* Slate Blue */
  #7F8C95   /* Cool Grey */
);
```

---

## 3. Typography

The typography is **stark, geometric**, and utilizes **extreme tracking** (letter-spacing) to create elegance.

### Font Family
**Primary Font**: `Montserrat`, `Futura`, or `Avenir` (Geometric Sans-serif)

```css
font-family: 'Montserrat', 'Futura', 'Avenir', sans-serif;
```

---

### Label Style (Headers/Metadata)

Used for section headers, timestamps, and metadata labels.

```css
.label {
  text-transform: uppercase;
  font-weight: 300;        /* Light / Thin */
  letter-spacing: 0.15em;  /* Very Wide tracking */
  color: rgba(255, 255, 255, 1.0);  /* or 0.7 opacity */
}
```

**Specifications**:
- Case: UPPERCASE
- Weight: Light / Thin (300-400)
- Tracking: Very Wide (`0.15em` to `0.2em`)
- Color: White (100% or 70% opacity)

---

### Data Style (Values/Time)

Used for primary data, numbers, and time displays.

```css
.data {
  text-transform: none;     /* Standard case */
  font-weight: 500;         /* Medium */
  letter-spacing: 0;        /* Normal tracking */
  color: rgba(255, 255, 255, 1.0);
}
```

**Specifications**:
- Case: Standard or Caps
- Weight: Medium (500)
- Tracking: Normal (`0.0em`)
- Color: White (100%)

---

## 4. UI Elements & Components

### The "Celestial Orb"

The central focal point of most screens.

**Shape**: Perfect circle

**Specifications**:
```css
.celestial-orb {
  width: 200px;           /* Adjust as needed */
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);  /* Glow effect */
}
```

**Properties**:
- Often has a "glow" effect (using `box-shadow`)
- May have a semi-transparent outer ring
- Used as a handle for sliders or a static status indicator

---

### The "Horizon Line"

**Style**: 1px solid line

**Specifications**:
```css
.horizon-line {
  width: 100%;            /* Full width or inset with margins */
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 24px 0;         /* Vertical spacing */
}
```

**Usage**: Separates data points vertically. Spans full width or inset with margins.

---

### The "Card"

**Shape**: Tall, vertical rectangle (Mobile portrait aspect ratio)

**Specifications**:
```css
.card {
  border-radius: 8px;     /* Subtle: 8px-12px, or sharp (0px) */
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.05);  /* Subtle if used */
  
  /* Optional: Floating effect */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

**Properties**:
- Corner Radius: Subtle rounded corners (`8px` to `12px`) or sharp, depending on container
- Elevation: Flat (no shadow) or deep, soft shadows if floating

---

## 5. Layout Rules

### 1. Central Axis
Everything aligns to the **vertical center**.

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;      /* Center horizontally */
  justify-content: center;  /* Center vertically if needed */
}
```

### 2. Vertical Rhythm
Generous padding between data points. Use **Horizon Lines** to create a structured grid without using boxes.

```css
.section {
  padding: 40px 0;  /* Generous vertical spacing */
}
```

### 3. Breathing Room
**30-40% of the screen should be empty space** (usually the gradient).

- Avoid cramming content
- Let the atmospheric gradient show through
- Use vertical spacing generously
- Embrace negative space as a design element

---

## Implementation Guidelines for Claude Code

### Color Variables (CSS Custom Properties)

```css
:root {
  /* Theme A: The Shallows */
  --shallows-start: #89C4D1;
  --shallows-mid: #52BDB8;
  --shallows-end: #4CBFB4;
  
  /* Theme B: The Dusk */
  --dusk-start: #8E819F;
  --dusk-mid: #B58B9C;
  --dusk-end: #E09296;
  
  /* Theme C: The Void */
  --void-start: #1E2235;
  --void-mid: #0B0F19;
  --void-end: #000000;
  
  /* Theme D: The Mist */
  --mist-start: #5E6F7A;
  --mist-end: #7F8C95;
  
  /* Accent */
  --accent: #FFFFFF;
  
  /* Typography */
  --font-primary: 'Montserrat', 'Futura', 'Avenir', sans-serif;
  --label-weight: 300;
  --data-weight: 500;
  --label-tracking: 0.15em;
}
```

### Example Background Application

```css
/* The Shallows Theme */
.theme-shallows {
  background: linear-gradient(
    to bottom,
    var(--shallows-start),
    var(--shallows-mid),
    var(--shallows-end)
  );
}

/* The Void Theme with Texture */
.theme-void {
  background: linear-gradient(
    to bottom,
    var(--void-start),
    var(--void-mid),
    var(--void-end)
  );
  position: relative;
}

.theme-void::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('noise-texture.png'); /* Subtle noise */
  opacity: 0.15;
  pointer-events: none;
}
```

### Typography Classes

```css
.label {
  font-family: var(--font-primary);
  text-transform: uppercase;
  font-weight: var(--label-weight);
  letter-spacing: var(--label-tracking);
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.data {
  font-family: var(--font-primary);
  font-weight: var(--data-weight);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
}
```

### Component Examples

```css
/* Celestial Orb */
.orb {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 0 40px rgba(255, 255, 255, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Horizon Line */
.horizon {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 32px 0;
}

/* Card */
.card {
  border-radius: 12px;
  padding: 40px 32px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 400px;
  margin: 0 auto;
}
```

---

## Design Checklist for Implementation

When implementing the Marline Design System, ensure:

- [ ] Background uses atmospheric gradient (not solid color)
- [ ] Typography uses geometric sans-serif with proper tracking
- [ ] Labels are UPPERCASE with wide letter-spacing (0.15em+)
- [ ] Generous vertical spacing between elements (30-40px+)
- [ ] Central vertical alignment for primary elements
- [ ] 30-40% of viewport is empty space (breathing room)
- [ ] Horizon lines separate data sections
- [ ] Celestial orbs (circles) used for key focal points
- [ ] White or light colors at high opacity for text
- [ ] Subtle shadows/glows for depth (not harsh borders)
- [ ] No visual clutter — elements "float" in the void

---

## End of Design System Specification

This design system prioritizes **atmosphere over ornamentation** and **space over density**. The goal is to create interfaces that feel like looking at the sky, the ocean, or space itself — vast, calm, and infinite.
