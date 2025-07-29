import React from "react";

interface ImageUploadAreaProps {
  hasImage: boolean;
  setHasImage: (hasImage: boolean) => void;
  setImageUrl: (url: string) => void;
  onImageLoad?: (imageUrl: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  dragOver: boolean;
  setDragOver: (dragOver: boolean) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps & { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({
  hasImage,
  setHasImage,
  setImageUrl,
  onImageLoad,
  fileInputRef,
  dragOver,
  setDragOver,
  handleFileChange,
}) => {
  // Drag and drop handlers
  const handleDragOver = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setHasImage(true);
      onImageLoad?.(url);
    }
  };

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden transition-all ${
        dragOver ? "border-2 border-blue-500 bg-blue-50" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ width: 384, height: 384, position: "absolute", top: 0, left: 0, userSelect: "none" }}
    >
      {!hasImage ? (
        <div className="text-center p-3">
          <h3 className="font-bold text-sm sm:text-base mb-1">Upload an image</h3>
          <p className="text-gray-600 mb-3 text-xs sm:text-sm">Drag & drop or click to browse</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg border-2 border-black dark-shadow hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs"
          >
            <span>Choose Image</span>
          </button>
        </div>
      ) : null}
      
      {/* File input - always available for the plus icon */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadArea;
