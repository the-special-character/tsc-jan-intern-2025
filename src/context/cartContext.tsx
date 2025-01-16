"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/cart");
      const json = await res.json();
      setCart(json);
    } catch (err) {}
  };

  const addItemToCart = async (cart) => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setCart((val) => [...val, json]);
    } catch (error) {}
  };

  const updateItemToCart = async (cart) => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${cart.id}`, {
        method: "PUT",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setCart((val) => {
        const index = val.findIndex((x) => x.id === cart.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {}
  };

  const deleteItemToCart = async (cart) => {
    try {
      await fetch(`http://localhost:3000/cart/${cart.id}`, {
        method: "DELETE",
      });
      setCart((val) => {
        const index = val.findIndex((x) => x.id === cart.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {}
  };

  //   component did mount
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        updateItemToCart,
        deleteItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
