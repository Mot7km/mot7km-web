'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, ChevronUp } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  totalPrice: number;
  onOpenDrawer: () => void;
}

export function FloatingCartButton({ itemCount, totalPrice, onOpenDrawer }: FloatingCartButtonProps) {
  const t = useTranslations('cart');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const margin = 20;
      setPosition({
        x: window.innerWidth - rect.width - margin,
        y: margin,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current && !isDragging) {
        const rect = buttonRef.current.getBoundingClientRect();
        const margin = 20;
        setPosition({
          x: Math.min(position.x, window.innerWidth - rect.width - margin),
          y: Math.min(position.y, window.innerHeight - rect.height - margin),
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    const buttonEl = buttonRef.current;
    if (buttonEl) {
      const rect = buttonEl.getBoundingClientRect();
      const margin = 20;
      const maxX = window.innerWidth - rect.width - margin;
      const maxY = window.innerHeight - rect.height - margin;
      setPosition({
        x: Math.max(margin, Math.min(newX, maxX)),
        y: Math.max(margin, Math.min(newY, maxY)),
      });
    }
  }, [dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove as any);
      window.addEventListener('touchend', handleTouchEnd as any);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('touchend', handleTouchEnd as any);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    const buttonEl = buttonRef.current;
    if (buttonEl) {
      const rect = buttonEl.getBoundingClientRect();
      const margin = 20;
      const maxX = window.innerWidth - rect.width - margin;
      const maxY = window.innerHeight - rect.height - margin;
      setPosition({
        x: Math.max(margin, Math.min(newX, maxX)),
        y: Math.max(margin, Math.min(newY, maxY)),
      });
    }
  }, [dragOffset]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) {
      onOpenDrawer();
    }
  }, [onOpenDrawer]);

  return (
    <div
      ref={buttonRef}
      className="fixed z-[60] animate-fade-in-up select-none touch-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <button
        onClick={handleClick}
        aria-label={t('openCart')}
        className="flex items-center gap-4 px-6 py-3 rounded-full 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
          text-white shadow-[0_8px_30px_rgba(22,131,199,0.3)] 
          hover:shadow-[0_8px_40px_rgba(22,131,199,0.4)]
          hover:-translate-y-1 transition-all duration-300
          border border-white/20 backdrop-blur-md
          cursor-pointer active:scale-95
          touch-manipulation"
        style={{ 
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}
      >
        <div className="relative">
          <ShoppingBag size={24} />
          <span className="absolute -top-2 -right-2 bg-white text-[var(--color-primary)] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
            {itemCount}
          </span>
        </div>

        <div className="flex flex-col items-start border-l border-white/20 pl-4">
          <span className="text-xs font-medium opacity-90">{t('total')}</span>
          <span className="font-bold font-montserrat text-lg leading-none">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <ChevronUp size={20} className="opacity-70 ml-2" />
      </button>
    </div>
  );
}