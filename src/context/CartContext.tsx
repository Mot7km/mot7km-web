'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { Product, computeTotalPrice } from '@/data/menu';

export interface CartItem {
  id: string;
  product: Product;
  selections: Record<string, string>;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selections: Record<string, string>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// Stable ID generation (sorted keys)
const generateCartItemId = (productId: string, selections: Record<string, string>) => {
  const sortedEntries = Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `${productId}-${sortedEntries}`;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = useCallback((product: Product, selections: Record<string, string>, quantity: number = 1) => {
    setItems((prevItems) => {
      const itemId = generateCartItemId(product.id, selections);
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        // Merge: add to existing quantity
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return newItems;
      }

      const priceStr = computeTotalPrice(product, selections);
      const priceNum = parseFloat(priceStr.replace('$', ''));

      const newItem: CartItem = {
        id: itemId,
        product,
        selections: { ...selections }, // copy to avoid mutations
        quantity,
        totalPrice: priceNum,
      };

      return [...prevItems, newItem];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsDrawerOpen(false);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};