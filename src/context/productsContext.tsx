"use client";

import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const json = await res.json();
      setProducts(json);
    } catch (err) {}
  };

  //   component did mount
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
