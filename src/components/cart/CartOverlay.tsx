// components/CartOverlay.tsx
'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { FloatingCartButton } from './CartButton';
import { CartDrawer } from './CartDrawer';

export function CartOverlay() {
  const { items, itemCount, totalPrice, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    if (itemCount === 0 && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [itemCount, isDrawerOpen, setIsDrawerOpen]);

  if (itemCount === 0 && !isDrawerOpen) {
    return null;
  }

  return (
    <>
      {/* only visible when drawer is closed and cart not empty */}
      {!isDrawerOpen && itemCount > 0 && (
        <FloatingCartButton
          itemCount={itemCount}
          totalPrice={totalPrice}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />
      )}

      {/* Drawer */}
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={items}
        totalPrice={totalPrice}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </>
  );
}