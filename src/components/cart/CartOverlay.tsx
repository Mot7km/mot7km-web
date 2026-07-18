'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { ShoppingBag, ChevronUp, X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export function CartOverlay() {
  const { items, itemCount, totalPrice, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const t = useTranslations(); // Need translations for cart

  if (itemCount === 0 && !isDrawerOpen) {
    return null; // Hide everything if cart is empty and drawer is closed
  }

  // Auto-close if cart becomes empty
  if (itemCount === 0 && isDrawerOpen) {
    setIsDrawerOpen(false);
  }

  return (
    <>
      {/* Floating Button */}
      {!isDrawerOpen && itemCount > 0 && (
        <div className="fixed bottom-6 end-6 z-[60] animate-fade-in-up">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-4 px-6 py-3 rounded-full 
              bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
              text-white shadow-[0_8px_30px_rgba(22,131,199,0.3)] 
              hover:shadow-[0_8px_40px_rgba(22,131,199,0.4)]
              hover:-translate-y-1 transition-all duration-300
              border border-white/20 backdrop-blur-md"
          >
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-[var(--color-primary)] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {itemCount}
              </span>
            </div>
            
            <div className="flex flex-col items-start border-l border-white/20 pl-4">
              <span className="text-xs font-medium opacity-90">{t('cart.total')}</span>
              <span className="font-bold font-montserrat text-lg leading-none">${totalPrice.toFixed(2)}</span>
            </div>
            
            <ChevronUp size={20} className="opacity-70 ml-2" />
          </button>
        </div>
      )}

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-background)] rounded-t-[2rem] 
          shadow-[0_-20px_60px_rgba(0,0,0,0.15)] flex flex-col
          transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
          ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Drag Handle & Header */}
        <div className="p-4 border-b border-[var(--color-border)] flex flex-col items-center shrink-0">
          <div className="w-12 h-1.5 bg-[var(--color-border-strong)] rounded-full mb-4 opacity-50" />
          <div className="w-full flex items-center justify-between">
            <h2 className="font-montserrat font-bold text-xl text-[var(--color-text-primary)] flex items-center gap-2">
              <ShoppingBag size={20} className="text-[var(--color-primary)]" />
              {t('cart.yourOrder')}
            </h2>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl glass-card border border-[var(--color-border)]/50 animate-fade-in-up">
              <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[var(--color-card-light)]">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">{item.product.name}</h4>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1 space-y-0.5">
                    {Object.entries(item.selections).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}: {val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-montserrat font-bold text-[var(--color-primary)]">
                    ${(item.totalPrice * item.quantity).toFixed(2)}
                  </span>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-[var(--color-surface)] rounded-full px-2 py-1 border border-[var(--color-border)]">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm min-w-[1rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="self-start p-2 text-[var(--color-danger)]/70 hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-full transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 border-t border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[var(--color-text-secondary)] font-medium">{t('cart.grandTotal')}</span>
            <span className="font-montserrat font-bold text-2xl text-[var(--color-text-primary)]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold text-lg shadow-[0_4px_15px_rgba(22,131,199,0.3)] hover:shadow-[0_4px_25px_rgba(22,131,199,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99]">
              {t('cart.checkout')}
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-bold text-sm hover:bg-[var(--color-danger)]/20 transition-all active:scale-[0.99]"
            >
              {t('cart.clearCart')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
