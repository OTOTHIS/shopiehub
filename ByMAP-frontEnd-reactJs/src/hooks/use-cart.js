import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          // Check if the product is already in the cart
          const isProductInCart = state.items.some((item) => item.product.id === product.id);

          // If the product is not in the cart, add it
          if (!isProductInCart) {
            return { items: [...state.items, { product }] };
          }

          // If the product is already in the cart, you can update its quantity or handle it as needed
          return { items: state.items };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
