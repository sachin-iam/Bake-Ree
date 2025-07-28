import { create } from 'zustand';

type CartItem = {
  id: number;
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
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  setPromoCode: (code: string, discount: number) => void;
  clearPromoCode: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
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

  clearPromoCode: () => set({
    promoCode: '',
    discountRate: 0,
  }),
}));
