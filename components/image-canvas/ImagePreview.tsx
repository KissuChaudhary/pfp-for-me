import React from "react";

interface ImagePreviewProps {
  imageUrl: string | null;
  imageTransform: string;
  filterStyle: string;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
  hasImage: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  borderOffset: number;
  imageBorderRadius: string;
  backgroundStyle: React.CSSProperties;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  imageTransform,
  filterStyle,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  hasImage,
  containerRef,
  borderOffset,
  imageBorderRadius,
  backgroundStyle,
}) => {
  if (!hasImage) return null;
  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        borderRadius: imageBorderRadius,
        // Remove overflow hidden to prevent clipping the border
        zIndex: 2,
        position: "relative",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background layer */}
      <div
        style={{
          ...backgroundStyle,
          position: "absolute",
          inset: 0,
          zIndex: 1, // Background at the bottom
        }}
      />
      
      {/* Image layer */}
      {hasImage && (
        <img
          src={imageUrl || undefined}
          alt="Preview"
          style={{
            transform: imageTransform,
            filter: filterStyle,
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            position: "relative",
            zIndex: 3, // Image above Drip Art back layer (zIndex: 1.5)
          }}
        />
      )}
    </div>
  );
};

export default ImagePreview;
