# The Natasha Pinto™ Design System
**Brand: Soul-led Identity Mentorship for the Ambitious & Awakening**

*Extracted from: thenatashapinto.com*  
*Created: 2026-04-16*

---

## Color Palette

### Primary Colors
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Dark Navy** | `#1a2e40` | `rgb(26, 46, 64)` | Text, headings, primary elements |
| **Warm Gold** | `#c9a846` | `rgb(201, 168, 70)` | Accents, highlights, CTAs, hover states |
| **Warm Cream** | `#faf9f6` | `rgb(250, 249, 246)` | Main background |
| **Red Accent** | `#e11d48` | `rgb(225, 29, 72)` | Emphasis, alerts (optional) |
| **Pure White** | `#ffffff` | `rgb(255, 255, 255)` | Cards, containers, contrast |

### Neutral Colors
- **Text** (`#1a2e40`) - Primary body text
- **Text Light** (`#666666`) - Secondary text
- **Text Muted** (`#999999`) - Tertiary/disabled text
- **Borders** (`#e0ddd8`) - Subtle borders
- **Light Borders** (`#d9d5ce`) - Form inputs

### Semantic Colors
- **Error**: `#e74c3c` - Error states, form validation
- **Success**: `#27ae60` - Success messages
- **Warning**: `#f39c12` - Warning states

---

## Typography

### Fonts
- **Headings**: `'Playfair Display'`, serif
  - Elegant, sophisticated, editorial style
  - Used for: H1-H6, page titles, sections
  - Web-safe fallback: Georgia, serif

- **Body Text**: `'Lato'`, sans-serif
  - Clean, readable, modern
  - Used for: paragraphs, labels, descriptions
  - Web-safe fallback: Segoe UI, Helvetica

### Font Sizes
- **H1**: 32px (mobile: 24px)
- **H2**: 28px (mobile: 20px)
- **H3**: 24px
- **H4**: 20px
- **H5**: 18px
- **H6**: 16px (uppercase)
- **Body**: 15px
- **Small**: 14px
- **Extra Small**: 12px

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Letter Spacing
- Headings: `-0.02em` to `-0.01em` (tighter)
- H6: `0.05em` (uppercase emphasis)
- Normal text: `0` (default)

---

## Spacing System

| Scale | Size | Usage |
|-------|------|-------|
| 1 | 4px | Micro spacing |
| 2 | 8px | Extra small padding |
| 3 | 12px | Small padding |
| 4 | 16px | Default padding |
| 6 | 24px | Standard spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | Extra large spacing |
| 16 | 64px | Sections |

---

## Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px (default for buttons, forms)
- **Extra Large**: 16px
- **Full**: 9999px (pills, circular elements)

---

## Buttons

### Primary Button
```css
Background: #c9a846 (Gold)
Color: #ffffff (White)
Padding: 12px 24px
Border-radius: 12px
Font-weight: 500
```
**States:**
- Hover: Darker gold (#b8963a) + shadow + slight lift (-2px)
- Active: Slightly darker
- Disabled: Reduced opacity

### Secondary Button
```css
Background: transparent
Color: #1a2e40 (Dark)
Border: 1px solid #e0ddd8
Padding: 12px 24px
```
**States:**
- Hover: Light background + gold border

### Ghost Button
```css
Background: transparent
Color: #1a2e40
Font-weight: 500
```
**States:**
- Hover: Color changes to gold (#c9a846)

---

## Forms

### Input Styles
```css
Background: #ffffff
Border: 1px solid #d9d5ce
Border-radius: 12px
Padding: 12px 16px
Font-size: 15px
Font-family: Lato
Color: #1a2e40
Placeholder: #999999
```

**Focus State:**
```css
Border-color: #c9a846 (Gold)
Box-shadow: 0 0 0 3px rgba(201, 168, 70, 0.1)
Outline: none
```

**Error State:**
```css
Border-color: #e74c3c (Red)
```

### Labels
```css
Font-size: 14px
Font-weight: 500
Color: #1a2e40
Margin-bottom: 8px
```

---

## Shadows

| Level | Box Shadow |
|-------|-----------|
| Small | `0 1px 2px rgba(26, 46, 64, 0.05)` |
| Medium | `0 4px 12px rgba(26, 46, 64, 0.1)` |
| Large | `0 12px 24px rgba(26, 46, 64, 0.15)` |

---

## Transitions & Animations

### Timing
- **Fast**: 150ms
- **Base**: 200ms (default)
- **Slow**: 300ms

**Easing**: `ease` (standard easing)

### Common Animations
- **Fade In**: Opacity 0 → 1
- **Slide Up**: translateY(20px) → translateY(0)
- **Hover**: Small lift + shadow (transform: translateY(-2px))

---

## Layout Principles

### Spacing Rules
- Page sections: 64px top/bottom padding
- Mobile sections: 32px top/bottom padding
- Container max-width: 1200px
- Horizontal padding: 16px (mobile), 24px+ (desktop)

### Grid
- Responsive, mobile-first approach
- Breakpoint: 768px (tablet), 480px (mobile)
- Content hierarchy through spacing

---

## Component Patterns

### Cards
```css
Background: #ffffff
Border: 1px solid #e0ddd8
Border-radius: 12px
Padding: 24px
Box-shadow: 0 1px 2px rgba(26, 46, 64, 0.05)
Transition: all 200ms ease
```
**Hover:** Shadow increases, border color → gold

### Section Headings
```css
Font-family: Playfair Display
Font-size: 28px
Font-weight: 700
Color: #1a2e40
Margin-bottom: 16px
```

---

## Brand Voice in Design

The design system reflects:
- **Sophistication**: Serif headings, restrained color palette
- **Clarity**: Clear typography hierarchy, ample whitespace
- **Premium**: Gold accents, high-quality spacing
- **Warmth**: Cream background over white, approachable text colors
- **Confidence**: Bold typography, clear CTAs
- **Authenticity**: Organic, human-centered spacing

---

## Accessibility Features

- ✅ High contrast ratios (dark navy on cream)
- ✅ Clear focus states (gold outline)
- ✅ Readable font sizes (min 14px for body)
- ✅ Semantic HTML structure
- ✅ Reduced motion support
- ✅ Proper heading hierarchy
- ✅ Alt text for images

---

## Global CSS Usage

**File**: `app/globals.css`

All CSS custom properties are defined at the `:root` level and can be used throughout the project:

```css
/* Usage Examples */
background-color: var(--color-gold);
color: var(--color-text);
font-family: var(--font-serif);
padding: var(--space-4);
border-radius: var(--radius-lg);
transition: all var(--transition-base);
box-shadow: var(--shadow-md);
```

---

## Future Projects

This design system should be imported into all projects under The Natasha Pinto™ brand umbrella:

1. **Main Website** (thenatashapinto.com) ✅
2. **Awakened Path Intake Form** ✅
3. **Mentorship Platform** (future)
4. **Blog** (future)
5. **Community Portal** (future)

**Implementation**: Copy `globals.css` and `DESIGN_SYSTEM.md` to new projects.

---

## Notes

- Brand colors are optimized for both light and dark modes
- Design system emphasizes readability and premium positioning
- Gold accent (#c9a846) creates visual cohesion and guides user focus
- Typography hierarchy ensures clear content hierarchy without requiring heavy font weights
- Spacing creates visual breathing room, reflecting the "soul-led" brand philosophy
