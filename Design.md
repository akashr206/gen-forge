---
name: AI Precision Studio
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#46494b'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6163'
  on-tertiary-container: '#dadcde'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  preview-serif:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  section-padding: 64px
  editor-sidebar: 400px
---

## Brand & Style

This design system is built for an automated LaTeX resume builder, prioritizing "invisible efficiency" and professional sophistication. The aesthetic bridges the gap between high-end editorial design and technical precision.

The design style is **Minimalist with Glassmorphic accents**. It utilizes heavy whitespace to reduce cognitive load during the data-entry process. The interface should feel like a premium digital workspace—calm, structured, and deliberate. High-end typography is the centerpiece, ensuring that the utility of the tool matches the aesthetic quality of the output.

## Colors

The palette is designed to maintain a "low-glare" environment for long periods of writing and editing.

*   **Primary (Electric Indigo):** Used sparingly for high-intent actions (e.g., "Export PDF," "Save Changes") and active states.
*   **Secondary (Deep Slate):** Used for primary text and structural UI elements where focus is required.
*   **Tertiary/Background (Soft Ivory/Off-White):** A warm, non-white background (`#FCFBF9`) to reduce eye strain and provide a premium, paper-like feel.
*   **Neutral:** A range of slates used for borders, secondary labels, and inactive icons.

## Typography

The typography system uses a dual-font approach to distinguish between the "Editor" and the "Output."

1.  **UI Typeface (Hanken Grotesk):** A contemporary, sharp sans-serif for all interface elements. It provides a modern, tech-forward feel.
2.  **Label Typeface (JetBrains Mono):** Used for small metadata, LaTeX tags, or status indicators to lean into the technical nature of the product.
3.  **Preview Typeface (Source Serif 4):** A professional serif used exclusively within the resume preview pane to simulate high-quality printed output.

**Tracking:** Use generous tracking (0.02em to 0.05em) for small labels and uppercase headers to maintain the "spacious" brand identity.

## Layout & Spacing

The design system employs a **Fixed Grid** for the main workspace to ensure the resume preview remains at a constant, legible scale.

*   **The Workspace:** Split layout. The left pane (Editor) is 40% width or a fixed 400px-500px. The right pane (Preview) is fluid but centered within its container.
*   **Spacing Rhythm:** An 8px base unit. All internal component padding should be at least 16px (2 units) to maintain the premium, breathable feel.
*   **Margins:** Use wide 64px margins on desktop for landing pages and 32px for the editor application to maximize focus area.

## Elevation & Depth

Visual hierarchy is achieved through **Glassmorphism and Tonal Layering** rather than traditional heavy shadows.

*   **Panels:** Use a background blur (12px to 20px) with a semi-transparent off-white fill (e.g., `rgba(255, 255, 255, 0.7)`) for floating panels or sidebars.
*   **Borders:** Instead of shadows, use "ghost borders"—thin 1px strokes in a slightly darker version of the surface color (`#E2E8F0`).
*   **Focus State:** When an input is active, use a subtle, extra-diffused indigo glow (`box-shadow: 0 0 20px rgba(79, 70, 229, 0.1)`).

## Shapes

The shape language is **Soft (0.25rem - 0.75rem)**. This provides enough roundness to feel modern and friendly, but maintains the sharp corners necessary for a tool associated with "Professionalism" and "Structure."

*   **Buttons & Inputs:** 4px (Soft) for a disciplined, architectural look.
*   **Cards & Preview Containers:** 12px (Large) to gently separate the resume paper from the UI.

## Components

*   **Buttons:** Primary buttons use a solid Indigo fill with white text. Secondary buttons use a ghost style (border only) with Slate text. All buttons have a transition effect on hover that increases letter-spacing slightly (+0.01em).
*   **Input Fields:** Spacious 16px vertical padding. Use the Label Typeface (JetBrains Mono) for input field titles in all-caps at 11px size.
*   **Glass Panels:** Use for the "Tools" or "Settings" overlay. Must include a 1px white inner border for a "polished glass" edge effect.
*   **Resume Preview Card:** A pure white surface with a slight 24px shadow to mimic a physical sheet of paper.
*   **Chips/Tags:** Used for "LaTeX Skills" or "Keywords." Rectangular with 2px radius, light gray background, and monospaced text.
*   **Progress Indicator:** A thin, high-contrast bar at the top of the screen to show "Exporting..." or "Compiling..." status.