"use client";

import ProductList from "@/components/ProductList";
import { ThemeContext } from "@/context/themeContext";
import React, { useEffect, useState } from "react";

const Products = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <ThemeContext.Consumer>
        {(value) => {
          return (
            <div>
              <p>{value.theme}</p>
              <button onClick={value.toggleTheme}>Click me</button>
            </div>
          );
        }}
      </ThemeContext.Consumer>

      <ProductList />
    </div>
  );
};

export default Products;
