import { useState, useRef, useEffect, useCallback } from 'react';

interface UseDraggableOptions {
  initialX?: number;
  initialY?: number;
  margin?: number; // unused, kept for flexibility
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const { initialX = 0, initialY = 0 } = options;
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const dragStart = useRef({ clientX: 0, clientY: 0, offsetX: 0, offsetY: 0 });

  const clampPosition = useCallback((x: number, y: number) => {
    if (!elementRef.current) return { x, y };
    const rect = elementRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    return {
      x: Math.min(Math.max(x, 0), maxX),
      y: Math.min(Math.max(y, 0), maxY),
    };
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragStart.current = {
      clientX,
      clientY,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
    };
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const { offsetX, offsetY } = dragStart.current;
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;
    const clamped = clampPosition(newX, newY);
    setPosition(clamped);
  }, [isDragging, clampPosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Set initial position after element mounts (e.g., bottom‑right)
  useEffect(() => {
    if (elementRef.current && initialX === 0 && initialY === 0) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - 24,
        y: window.innerHeight - rect.height - 24,
      });
    }
  }, [initialX, initialY]);

  // Re‑clamp on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => clampPosition(prev.x, prev.y));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition]);

  // Global listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    } else {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return {
    ref: elementRef,
    position,
    isDragging,
    dragHandlers: {
      onMouseDown: handleDragStart,
      onTouchStart: handleDragStart,
    },
  };
}