'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, computeTotalPrice } from '@/data/menu';

export interface CartItem {
  id: string; // unique ID for the cart item (product.id + selected options hash)
  product: Product;
  selections: Record<string, string>;
  quantity: number;
  totalPrice: number; // Single item price including extras (as a number)
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
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Generate a unique ID based on product ID and its selections
const generateCartItemId = (productId: string, selections: Record<string, string>) => {
  const selectionsString = Object.entries(selections)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `${productId}-${selectionsString}`;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product: Product, selections: Record<string, string>, quantity: number = 1) => {
    setItems((prevItems) => {
      const itemId = generateCartItemId(product.id, selections);
      const existingItemIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        // Update quantity if item with exact same selections exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      // Compute price for one item including extras
      const priceStr = computeTotalPrice(product, selections);
      const priceNum = parseFloat(priceStr.replace('$', ''));

      const newItem: CartItem = {
        id: itemId,
        product,
        selections,
        quantity,
        totalPrice: priceNum,
      };

      return [...prevItems, newItem];
    });
    
    // Automatically open drawer when adding an item (optional, but good UX)
    // setIsDrawerOpen(true); 
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    setIsDrawerOpen(false);
  };

  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.totalPrice * item.quantity, 0);
  }, [items]);

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
