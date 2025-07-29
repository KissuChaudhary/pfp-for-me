import { useState, useCallback, useEffect } from "react";

interface UseImageDragProps {
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
  gridSnap: boolean;
  gridSize: number;
}

export function useImageDrag({ position, setPosition, gridSnap, gridSize }: UseImageDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      if (gridSnap) {
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
      }
      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragStart, setPosition, gridSnap, gridSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;
        if (gridSnap) {
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }
        setPosition({ x: newX, y: newY });
      };
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart, setPosition, gridSnap, gridSize]);

  return { handleMouseDown, handleMouseMove, handleMouseUp, isDragging };
}
