import { create } from 'zustand';
import type { AuthUser } from '../../features/auth/types/auth';
import type { Product } from '../../shared/types';

export type CartItem = Product & { quantity: number };

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (typeof payload.exp !== 'number') return true;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp > nowSec;
  } catch {
    return true;
  }
}

type AppStore = {
  isAuthenticated: boolean;
  isHydrated: boolean;
  token: string | null;
  user: AuthUser | null;
  hydrate: () => void;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: () => number;
  cartCount: () => number;
};

export const useAppStore = create<AppStore>((set, get) => ({
  isAuthenticated: false,
  isHydrated: false,
  token: null,
  user: null,
  hydrate: () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && !isTokenValid(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      set({ isAuthenticated: false, isHydrated: true, token: null, user: null });
      return;
    }

    set({
      isAuthenticated: Boolean(token),
      isHydrated: true,
      token,
      user: username ? { username } : null,
    });
  },
  setSession: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    set({ isAuthenticated: true, token, user });
  },
  clearSession: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    set({ isAuthenticated: false, token: null, user: null, cart: [] });
  },
  cart: [],
  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      set({ cart: get().cart.filter((item) => item.id !== productId) });
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    });
  },
  cartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
}));
