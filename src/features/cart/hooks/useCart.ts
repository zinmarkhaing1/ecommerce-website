import { useAppStore } from '../../../app/store';
import { useShallow } from 'zustand/react/shallow';

export function useCart() {
  return useAppStore(
    useShallow((state) => ({
      cart: state.cart,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      updateQuantity: state.updateQuantity,
      cartTotal: state.cartTotal,
      cartCount: state.cartCount,
    })),
  );
}
