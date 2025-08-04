# Canvas Export Documentation
## Profile Picture Editor - Technical Implementation Guide

This document covers all the fixes and implementations for the profile picture editor's canvas, border, and export functionality.

---

## Table of Contents
1. [Border System](#border-system)
2. [Responsive Canvas](#responsive-canvas)
3. [Export System](#export-system)
4. [High-Quality Export](#high-quality-export)
5. [Image Positioning](#image-positioning)
6. [Common Issues & Solutions](#common-issues--solutions)
7. [Key Files & Components](#key-files--components)

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

## High-Quality Export

### Overview
The export system now supports high-resolution exports while maintaining the same visual appearance as the preview. This is achieved by using a high-resolution canvas for export while keeping the preview at the original size.

### Implementation Details
- **Preview**: Maintains original size (320px mobile, 384px desktop)
- **Export**: Uses quality multiplier (default 4x) for high-resolution output
- **Example**: 320px preview → 1280px export (4x quality)

### Quality Multiplier
```typescript
// Default export quality (4x multiplier)
exportQuality: 4

// Examples:
// Mobile (320px) → 1280px export
// Desktop (384px) → 1536px export
```

### Technical Implementation
```typescript
// Calculate high-resolution export size
const baseExportSize = containerSize
const exportSize = baseExportSize * exportQuality
const scaleFactor = exportQuality

// Set canvas to high resolution
canvas.width = exportSize
canvas.height = exportSize

// Scale the context to maintain visual appearance
ctx.scale(scaleFactor, scaleFactor)

// All drawing operations use baseExportSize coordinates
ctx.clearRect(0, 0, baseExportSize, baseExportSize)
```

### Benefits
- **High Quality**: Exports are 4x higher resolution than preview
- **Perfect Match**: Export appearance matches preview exactly
- **Performance**: Preview remains fast and responsive
- **Scalability**: Quality multiplier can be adjusted as needed

### Usage
```typescript
const { exportImage } = useImageExport({
  // ... other props
  containerSize, // Preview size (e.g., 320px)
  exportQuality: 4, // Export quality multiplier
})
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

### Issue: Low Quality Exports
**Cause**: Export using same resolution as preview
**Solution**: Use high-quality export with quality multiplier
```typescript
const { exportImage } = useImageExport({
  // ... other props
  exportQuality: 4, // 4x quality multiplier
})
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
  exportQuality?: number // Export quality multiplier
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

### 5. High-Quality Export
- Use quality multiplier for high-resolution exports
- Maintain visual consistency between preview and export
- Scale context appropriately for high-resolution canvas

### 6. Responsive Design
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
- [ ] High-quality export produces sharp images
- [ ] Export quality multiplier works correctly

### High-Quality Export
- [ ] Export resolution is 4x higher than preview
- [ ] Visual appearance matches preview exactly
- [ ] No quality loss in exported images
- [ ] Export performance is acceptable
- [ ] Quality multiplier can be adjusted

---

## Performance Considerations

### Preview Performance
- Keep preview canvas at original size for performance
- Use CSS transforms for smooth interactions
- Minimize re-renders during editing

### Export Performance
- High-resolution exports may take longer to process
- Consider showing loading indicator during export
- Optimize image loading for high-resolution canvas

### Memory Usage
- High-resolution canvas uses more memory
- Clean up canvas after export
- Consider garbage collection for large images

---

## Future Enhancements

### Quality Options
- Allow users to choose export quality (2x, 4x, 8x)
- Add quality presets (web, print, high-res)
- Implement progressive quality loading

### Format Options
- Support multiple export formats (PNG, JPEG, WebP)
- Add format-specific quality settings
- Implement format optimization

### Batch Export
- Export multiple sizes simultaneously
- Generate different aspect ratios
- Create export presets for different platforms 