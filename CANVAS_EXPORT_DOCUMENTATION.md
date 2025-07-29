# Canvas Export Documentation
## Profile Picture Editor - Technical Implementation Guide

This document covers all the fixes and implementations for the profile picture editor's canvas, border, and export functionality.

---

## Table of Contents
1. [Border System](#border-system)
2. [Responsive Canvas](#responsive-canvas)
3. [Export System](#export-system)
4. [Image Positioning](#image-positioning)
5. [Common Issues & Solutions](#common-issues--solutions)
6. [Key Files & Components](#key-files--components)

---

## Border System

### Border Offset Behavior
- **Range**: 0-20px (no negative values)
- **0px**: Border at the very edge of the canvas
- **20px**: Border 20px inward from the edge
- **Calculation**: `edgeRadius - borderOffset`

### Border Width
- **Default**: 10px (not 0px to ensure border visibility)
- **Minimum**: 2px (prevents border from disappearing)

### Border Cap Styles
- **Rounded**: Circular border
- **Square**: Square border with sharp corners
- **Beveled**: Square border with rounded corners

### Border Calculations (useBorderProps.ts)
```typescript
const edgeRadius = containerSize / 2 - borderWidth / 2 // Border at edge
const borderRadius = edgeRadius - borderOffset // Calculate radius: edgeRadius - offset
const clampedRadius = Math.max(minRadius, borderRadius)
```

---

## Responsive Canvas

### Container Size System
- **Desktop**: Fixed 384px
- **Mobile**: Responsive `min(320px, 85vw)`
- **Dynamic**: Updates on window resize

### Implementation
```typescript
// Mobile size calculation
const newSize = Math.min(320, vw * 0.85)
setMobileContainerSize(newSize)

// Container size prop
containerSize={mobileContainerSize} // Mobile
containerSize={384} // Desktop (default)
```

### Responsive Behavior
- **Large Mobile**: ~320px (max size)
- **Medium Mobile**: ~85% of screen width
- **Small Mobile**: ~85% of screen width
- **Desktop**: Always 384px

---

## Export System

### Perfect Match Requirements
1. **Same Container Size**: Export uses same size as preview
2. **Same Border Calculations**: Export uses identical border logic
3. **Same Image Scaling**: Export uses identical image scaling
4. **Same Clipping**: Export uses Border Cap Style clipping

### Export Process Flow
1. **Canvas Setup**: Use container size for export dimensions
2. **Background**: Fill content area only (inside border)
3. **Image**: Extend to full canvas area
4. **Clipping**: Apply Border Cap Style to full canvas
5. **Border**: Render using same calculations as preview

### Key Export Settings
```typescript
const exportSize = containerSize // Match preview size exactly
const contentSize = containerSize - 2 * borderOffset - 2 * borderWidth
const contentX = (exportSize - contentSize) / 2
const contentY = (exportSize - contentSize) / 2
```

---

## Image Positioning

### Browser vs Export Alignment
- **Browser**: Uses `flex items-center justify-center` + `translate()`
- **Export**: Uses `canvasCenter + position` for same behavior

### Position Calculation
```typescript
// Browser (CSS)
transform: translate(${position.x}px, ${position.y}px)

// Export (Canvas)
const canvasCenterX = exportSize / 2
const canvasCenterY = exportSize / 2
ctx.translate(canvasCenterX + position.x, canvasCenterY + position.y)
```

### Image Scaling (objectFit: contain)
```typescript
// Calculate scale to fit within bounds
const scaleX = containerSize / imageNaturalWidth
const scaleY = containerSize / imageNaturalHeight
const scale = Math.min(scaleX, scaleY) // Use smaller scale

// Apply zoom
const finalDrawWidth = baseDrawWidth * zoom
const finalDrawHeight = baseDrawHeight * zoom
```

---

## Common Issues & Solutions

### Issue: Border Disappears
**Cause**: Border width set to 0
**Solution**: Set default border width to 10px
```typescript
const [borderWidth, setBorderWidth] = useState(10) // Not 0
```

### Issue: Border in Wrong Position
**Cause**: Export using different calculations than preview
**Solution**: Use identical border calculation logic
```typescript
// Same logic in both useBorderProps and export
const edgeRadius = containerSize / 2 - borderWidth / 2
const borderRadius = edgeRadius - borderOffset
```

### Issue: Blue Border Appears
**Cause**: Background filling entire canvas instead of content area
**Solution**: Fill only content area
```typescript
// Wrong
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Correct
ctx.fillRect(contentX, contentY, contentSize, contentSize)
```

### Issue: Image Cut Off at Border
**Cause**: Image clipped to content area instead of full canvas
**Solution**: Clip image to full canvas with Border Cap Style
```typescript
// Wrong
const clipRadius = contentSize / 2

// Correct
const clipRadius = exportSize / 2
```

### Issue: Mobile/Desktop Image Mismatch
**Cause**: Different container sizes between preview and export
**Solution**: Pass container size to export
```typescript
const { exportImage } = useImageExport({
  // ... other props
  containerSize, // Pass the actual container size
})
```

### Issue: Position Offset in Export
**Cause**: Different positioning reference points
**Solution**: Use canvas center for both browser and export
```typescript
// Browser: flex centering + translate
// Export: canvas center + position
const canvasCenterX = exportSize / 2
const canvasCenterY = exportSize / 2
```

---

## Key Files & Components

### Core Components
- **`app/page.tsx`**: Main state management and responsive sizing
- **`components/image-canvas.tsx`**: Canvas container and layer management
- **`components/image-canvas/ImagePreview.tsx`**: Image display with transforms
- **`components/image-canvas/BorderSVG.tsx`**: Border rendering

### Hooks
- **`hooks/useBorderProps.ts`**: Border calculations and properties
- **`hooks/useImageExport.ts`**: Export logic and canvas rendering
- **`hooks/useImageUpload.tsx`**: Image upload and state management
- **`hooks/useImageDrag.ts`**: Image positioning and dragging

### Key Interfaces
```typescript
interface ImageCanvasProps {
  containerSize?: number // Responsive sizing
  // ... other props
}

interface UseBorderProps {
  containerSize?: number // Border calculations
  // ... other props
}

interface UseImageExportProps {
  containerSize?: number // Export sizing
  // ... other props
}
```

---

## Best Practices

### 1. Container Size Consistency
- Always pass `containerSize` to all components and hooks
- Use same size for preview and export
- Handle responsive sizing at the top level

### 2. Border Calculations
- Use identical logic in `useBorderProps` and export
- Never hardcode border positions
- Always account for `borderOffset`

### 3. Image Scaling
- Use `objectFit: contain` logic consistently
- Scale relative to container size, not content area
- Apply zoom after base scaling

### 4. Export Process
- Background: Fill content area only
- Image: Extend to full canvas
- Clipping: Use Border Cap Style on full canvas
- Border: Use same calculations as preview

### 5. Responsive Design
- Calculate mobile size dynamically
- Update on window resize
- Maintain aspect ratios

---

## Testing Checklist

### Border Functionality
- [ ] Border appears at correct position
- [ ] Border offset works (0-20px range)
- [ ] Border width changes visible
- [ ] Border opacity works
- [ ] Border amount (partial borders) works
- [ ] Border rotation works
- [ ] Border cap styles work (rounded, square, beveled)

### Responsive Behavior
- [ ] Desktop: 384px fixed size
- [ ] Mobile: Responsive sizing
- [ ] Border scales proportionally
- [ ] Image scales proportionally
- [ ] Export matches preview size

### Export Accuracy
- [ ] Export size matches preview
- [ ] Border position matches preview
- [ ] Image position matches preview
- [ ] Background fills correct area
- [ ] No unwanted borders/colors
- [ ] Border cap style clipping works

### Image Behavior
- [ ] Image extends beyond border
- [ ] Image clipped by Border Cap Style
- [ ] Image positioning works
- [ ] Image scaling works
- [ ] Image zoom works
- [ ] Image rotation works

---

## Future Considerations

### Performance Optimizations
- Consider using `useMemo` for expensive calculations
- Implement image caching for repeated exports
- Optimize canvas rendering for large images

### Feature Additions
- Support for different export formats (JPEG, WebP)
- Export quality settings
- Batch export functionality
- Custom export dimensions

### Maintenance
- Keep border calculations synchronized
- Test responsive behavior on new devices
- Monitor export performance with large images
- Update documentation when adding new features

---

*Last Updated: [Current Date]*
*Version: 1.0* 