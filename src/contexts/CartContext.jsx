import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, userId) => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.userId === userId && item.id === product.id,
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        const newItem = {
          ...product,
          userId,
          quantity: 1,
        };
        return [...prevCart, newItem];
      }
    });

    toast.success("Added to cart");
  };

  const removeFromCart = (productId, userId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.userId === userId && item.id === productId),
      ),
    );
    toast.success("Removed from cart");
  };

  const updateQuantity = (productId, userId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, userId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.userId === userId && item.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const increaseQuantity = (productId, userId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.userId === userId && item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId, userId) => {
    setCart((prevCart) => {
      const item = prevCart.find(
        (i) => i.userId === userId && i.id === productId,
      );
      if (item && item.quantity <= 1) {
        return prevCart.filter(
          (i) => !(i.userId === userId && i.id === productId),
        );
      }
      return prevCart.map((i) =>
        i.userId === userId && i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    });
  };

  const clearCart = (userId) => {
    setCart((prevCart) => prevCart.filter((item) => item.userId !== userId));
  };

  const getUserCart = (userId) => {
    if (!userId) return [];
    return cart.filter((item) => item.userId === userId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
