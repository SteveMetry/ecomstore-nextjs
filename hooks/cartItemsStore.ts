import create from "zustand";
import { persist } from "zustand/middleware";

import { CartItem } from ".entities/cartItem.interface";
import { Product } from ".entities/product.interface";

interface CartItemsState {
  cartItems: CartItem[];
  addCartItem: (product: Product, amount: number) => void;
  setCartItemAmount: (cartItem: CartItem, amount: number) => void;
  removeCartItem: (prod: CartItem) => void;
  displayCartItems: boolean;
  setDisplayCartItems: (status: boolean) => void;
}

const addNewItem = (
  cartItems: CartItem[],
  product: Product,
  amount: number
) => {
  if (amount > 0) {
    const currentItem = cartItems.find(
      (item) => item.id === product.id && item.category === product.category
    );
    if (currentItem != null) {
      currentItem.amount += amount;
    } else {
      const newCartItem: CartItem = {
        id: product.id,
        title: product.title,
        description: product.description,
        amount: amount,
        price: product.price,
        prodStock: product.stock,
        category: product.category,
        thumbnail: product.thumbnail
      };
      cartItems.push(newCartItem);
    }
  }
  return cartItems;
};

const setExistingItem = (
  cartItems: CartItem[],
  cartItem: CartItem,
  amount: number
) => {
  if (amount > 0) {
    const currentItem = cartItems.find(
      (item) => item.id === cartItem.id && item.category === cartItem.category
    ) as CartItem;
    currentItem.amount = amount;
  }
  return cartItems;
};

export const useCartItemsStore = create<CartItemsState>()(
  persist((set) => ({
    cartItems: [],
    addCartItem: (product, amount) =>
      set((state) => ({
        cartItems: addNewItem(state.cartItems, product, amount)
      })),
    setCartItemAmount: (cartItem, amount) =>
      set((state) => ({
        cartItems: setExistingItem(state.cartItems, cartItem, amount)
      })),
    removeCartItem: (prod) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== prod.id)
      })),
    displayCartItems: false,
    setDisplayCartItems: (status) => set({ displayCartItems: status })
  }))
);
