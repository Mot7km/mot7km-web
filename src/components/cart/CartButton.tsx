'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';

// ===== CONFIGURATION =====
const IDLE_TIME = 2000; // 3 seconds before it tucks away
// =========================

interface FloatingCartButtonProps {
  itemCount: number;
  totalPrice: number;
  onOpenDrawer: () => void;
  isVisible?: boolean; // Prop from parent to safely hide without unmounting
}

export function FloatingCartButton({ itemCount, totalPrice, onOpenDrawer, isVisible = true }: FloatingCartButtonProps) {
  const t = useTranslations('cart');

  const BUTTON_SIZE = 64; 
  const HALF = BUTTON_SIZE / 2;
  const MARGIN = 20;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [snapSide, setSnapSide] = useState<'left' | 'right'>('right');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  
  // Track movement to prevent clicks from canceling if your finger wiggles slightly
  const dragHasMovedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ---- Smart Timer Logic ----
  const wakeUp = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const wakeUpAndResetTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, IDLE_TIME);
  }, []);

  // ---- Initial placement ----
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - MARGIN,
        y: MARGIN,
      });
      setSnapSide('right');
    }
    wakeUpAndResetTimer(); // Start timer when first loaded
  }, [wakeUpAndResetTimer]);

  // ---- Snap to nearest edge ----
  const snapToEdge = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxX = window.innerWidth - rect.width - MARGIN;
    const maxY = window.innerHeight - rect.height - MARGIN;

    const distLeft = centerX;
    const distRight = window.innerWidth - centerX;
    const newSide = distLeft < distRight ? 'left' : 'right';
    setSnapSide(newSide);

    setPosition({
      x: newSide === 'left' ? MARGIN : maxX,
      y: Math.min(Math.max(centerY - rect.height / 2, MARGIN), maxY),
    });

    wakeUpAndResetTimer();
  }, [wakeUpAndResetTimer]);

  // ---- Mouse Handlers ----
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      startPosRef.current = { x: e.clientX, y: e.clientY };
      dragHasMovedRef.current = false;
      setIsDragging(true);
      isDraggingRef.current = true;
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      
      wakeUp();
      e.preventDefault();
    },
    [wakeUp]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      // Only count as a true drag if it moves more than 5px (prevents accidental click cancellation)
      if (
        Math.abs(e.clientX - startPosRef.current.x) > 5 ||
        Math.abs(e.clientY - startPosRef.current.y) > 5
      ) {
        dragHasMovedRef.current = true;
      }

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const buttonEl = buttonRef.current;
      
      if (buttonEl) {
        const rect = buttonEl.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - MARGIN;
        const maxY = window.innerHeight - rect.height - MARGIN;
        setPosition({
          x: Math.max(MARGIN, Math.min(newX, maxX)),
          y: Math.max(MARGIN, Math.min(newY, maxY)),
        });
      }
    },
    [dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    snapToEdge();
  }, [snapToEdge]);

  // ---- Touch Handlers ----
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      startPosRef.current = { x: touch.clientX, y: touch.clientY };
      dragHasMovedRef.current = false;
      setIsDragging(true);
      isDraggingRef.current = true;
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      
      wakeUp();
      // Only prevent default if we're actively touching the button to avoid blocking natural scroll edge cases
      if (e.cancelable) e.preventDefault(); 
    },
    [wakeUp]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      
      if (
        Math.abs(touch.clientX - startPosRef.current.x) > 5 ||
        Math.abs(touch.clientY - startPosRef.current.y) > 5
      ) {
        dragHasMovedRef.current = true;
      }

      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      const buttonEl = buttonRef.current;
      
      if (buttonEl) {
        const rect = buttonEl.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - MARGIN;
        const maxY = window.innerHeight - rect.height - MARGIN;
        setPosition({
          x: Math.max(MARGIN, Math.min(newX, maxX)),
          y: Math.max(MARGIN, Math.min(newY, maxY)),
        });
      }
    },
    [dragOffset]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    snapToEdge();
  }, [snapToEdge]);

  // ---- Attach Listeners ----
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ---- Window Resize ----
  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current && !isDragging) {
        const rect = buttonRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - MARGIN;
        const maxY = window.innerHeight - rect.height - MARGIN;
        setPosition((prev) => ({
          x: snapSide === 'left' ? MARGIN : maxX,
          y: Math.min(Math.max(prev.y, MARGIN), maxY),
        }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [snapSide, isDragging]);

  // ---- Click Handler ----
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Ignore click if it was actually a drag
      if (dragHasMovedRef.current) {
        dragHasMovedRef.current = false;
        return; 
      }
      onOpenDrawer();
      wakeUpAndResetTimer();
    },
    [onOpenDrawer, wakeUpAndResetTimer]
  );

  return (
    <div
      ref={buttonRef}
      className={`fixed z-[60] select-none touch-none ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{
        left: position.x,
        top: position.y,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        // Crucial Fix: While dragging, we disable left/top transitions completely so it tracks perfectly with the mouse
        transition: isDragging 
          ? 'opacity 0.3s ease, transform 0.3s ease' 
          : 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.3s ease, transform 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={wakeUp}
      onMouseLeave={wakeUpAndResetTimer}
    >
      <button
        onClick={handleClick}
        aria-label={t('openCart')}
        className={`
          relative w-full h-full rounded-full
          bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
          border border-white/30
          shadow-[0_8px_32px_rgba(22,131,199,0.35)]
          hover:shadow-[0_8px_40px_rgba(22,131,199,0.5)]
          active:scale-95
          touch-manipulation
          flex items-center justify-center
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
        style={{
          backgroundColor: 'rgba(22, 131, 199, 0.8)',
          backdropFilter: 'blur(6px)',
          transform: `translateX(${isIdle ? (snapSide === 'left' ? -HALF : HALF) : 0}px)`,
          opacity: isIdle ? 0.6 : 1,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, box-shadow 0.2s',
        }}
      >
        <ShoppingBag size={28} className="text-white drop-shadow-sm" />

        {itemCount > 0 && (
          <span 
            className="absolute bg-white text-[var(--color-primary)] text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md ring-2 ring-white/50"
            style={{
              top: '-4px',
              right: '-4px', // Default position
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s',
              // Crucial Fix: If we snap right and idle, shift the badge 48px to the left so it remains visible inside!
              transform: isIdle && snapSide === 'right' ? 'translateX(-48px)' : 'translateX(0)',
            }}
          >
            {itemCount}
          </span>
        )}

        {/* Tooltip */}
        <div
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2 mb-3
            px-3 py-1.5 rounded-lg
            bg-gray-900/90 text-white text-sm font-medium
            shadow-lg pointer-events-none
            transition-opacity duration-200
            ${!isIdle && !isDragging ? 'opacity-100' : 'opacity-0'}
            whitespace-nowrap
          `}
        >
          {t('total')}: ${totalPrice.toFixed(2)}
        </div>
      </button>
    </div>
  );
}