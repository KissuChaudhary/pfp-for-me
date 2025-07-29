import React from "react";

interface ExportCanvasProps {
  exportCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const ExportCanvas: React.FC<ExportCanvasProps> = ({ exportCanvasRef }) => {
  return <canvas ref={exportCanvasRef} style={{ display: "none" }} />;
};

export default ExportCanvas;
