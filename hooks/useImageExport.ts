// ... (imports and code above unchanged)

// --- in exportImage useCallback, replace the Pix Art and uploaded image draw order section ---
// Draw uploaded image with all transforms and filters (use full canvas center)
if (imageUrl) {
  const img = new window.Image()
  img.crossOrigin = "anonymous"
  img.src = imageUrl
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  ctx.save()
  ctx.filter = getFilterStyle()

  // Calculate image size exactly like the browser (objectFit: contain)
  const imageNaturalWidth = img.naturalWidth
  const imageNaturalHeight = img.naturalHeight

  // Calculate the scale to fit the image within the full canvas area (like objectFit: contain)
  const scaleX = exportSize / imageNaturalWidth
  const scaleY = exportSize / imageNaturalHeight
  const scale = Math.min(scaleX, scaleY) // Use the smaller scale to fit within bounds

  // Calculate the base image dimensions (before zoom)
  const baseDrawWidth = imageNaturalWidth * scale
  const baseDrawHeight = imageNaturalHeight * scale

  // Apply zoom to get final dimensions
  const finalDrawWidth = baseDrawWidth * zoom
  const finalDrawHeight = baseDrawHeight * zoom

  // Position should be relative to the canvas center (like browser's flex centering)
  const canvasCenterX = exportSize / 2
  const canvasCenterY = exportSize / 2

  ctx.translate(canvasCenterX + scaledPositionX, canvasCenterY + scaledPositionY)
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
  ctx.drawImage(img, -finalDrawWidth / 2, -finalDrawHeight / 2, finalDrawWidth, finalDrawHeight)
  ctx.restore()
}

// Draw Pix Art overlay (after image but before borders)
if (selectedPixArt) {
  const pixArtImage = new window.Image()
  pixArtImage.crossOrigin = "anonymous"
  pixArtImage.src = selectedPixArt
  await new Promise((resolve) => (pixArtImage.onload = resolve))

  ctx.save()

  // Apply the EXACT same clipping path as the border
  ctx.beginPath()

  if (borderCapStyle === "rounded") {
    const borderCenter = exportSize / 2
    const edgeRadius = exportSize / 2 - scaledBorderWidth / 2
    const borderRadius = edgeRadius - scaledBorderOffset
    const minRadius = scaledBorderWidth / 2
    const clampedRadius = Math.max(minRadius, borderRadius)
    ctx.arc(borderCenter, borderCenter, clampedRadius, 0, 2 * Math.PI)
  } else if (borderCapStyle === "square") {
    const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
    const x = scaledBorderWidth / 2 + scaledBorderOffset
    const y = scaledBorderWidth / 2 + scaledBorderOffset
    ctx.rect(x, y, squareSize, squareSize)
  } else if (borderCapStyle === "beveled") {
    const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
    const x = scaledBorderWidth / 2 + scaledBorderOffset
    const y = scaledBorderWidth / 2 + scaledBorderOffset
    const cornerRadius = 10 // EXACT same as border

    // Create rounded rectangle path EXACTLY like the border
    ctx.moveTo(x + cornerRadius, y)
    ctx.lineTo(x + squareSize - cornerRadius, y)
    ctx.quadraticCurveTo(x + squareSize, y, x + squareSize, y + cornerRadius)
    ctx.lineTo(x + squareSize, y + squareSize - cornerRadius)
    ctx.quadraticCurveTo(x + squareSize, y + squareSize, x + squareSize - cornerRadius, y + squareSize)
    ctx.lineTo(x + cornerRadius, y + squareSize)
    ctx.quadraticCurveTo(x, y + squareSize, x, y + squareSize - cornerRadius)
    ctx.lineTo(x, y + cornerRadius)
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
    ctx.closePath()
  }
  ctx.clip()

  // Calculate size and position for pix art (perfect centering)
  const scaledSize = exportSize * (pixArtSize / 100)
  const offsetX = (exportSize - scaledSize) / 2
  const offsetY = (exportSize - scaledSize) / 2

  // Draw pix art with size scaling (perfect centering, creates empty space in center when size > 100%)
  ctx.drawImage(pixArtImage, offsetX, offsetY, scaledSize, scaledSize)
  ctx.restore()
}

// ... (rest of the file unchanged)