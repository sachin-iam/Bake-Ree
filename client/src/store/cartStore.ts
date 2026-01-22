import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: number;               // numeric id for cart
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  promoCode: string;
  discountRate: number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  setPromoCode: (code: string, discount: number) => void;
  clearPromoCode: () => void;

  inc: (id: string | number) => void;
  dec: (id: string | number) => void;
  getQty: (id: string | number) => number;
  totalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      promoCode: '',
      discountRate: 0,

      addToCart: (newItem) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === newItem.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      setPromoCode: (code, discount) =>
        set({
          promoCode: code,
          discountRate: discount,
        }),

      clearPromoCode: () =>
        set({
          promoCode: '',
          discountRate: 0,
        }),

      inc: (id) => get().updateQuantity(id, 1),
      dec: (id) =>
        set((state) => {
          const item = state.cart.find((it) => it.id === id);
          if (!item) return state;
          if (item.quantity <= 1) {
            return { cart: state.cart.filter((it) => it.id !== id) };
          }
          return {
            cart: state.cart.map((it) =>
              it.id === id ? { ...it, quantity: it.quantity - 1 } : it
            ),
          };
        }),

      getQty: (id) => get().cart.find((it) => it.id === id)?.quantity || 0,
      totalItems: () => get().cart.reduce((acc, it) => acc + it.quantity, 0),
    }),
    { name: 'bakeree-cart' }
  )
);
