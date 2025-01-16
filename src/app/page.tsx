"use client";
import ProductListItem from "@/components/ProductListItem";
import { ProductsContext } from "@/context/productsContext";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

export default function Home() {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      <ThemeContext.Consumer>
        {(value) => {
          return (
            <div>
              <p>{value.theme}</p>
              <button
                onClick={() => {
                  console.log("hello world");
                }}
              >
                Click me
              </button>
            </div>
          );
        }}
      </ThemeContext.Consumer>

      <h1>Hello Wolrd</h1>
      <input type="text" />
      <input type="checkbox" />
      <button>Hello world</button>
      {products.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </div>
  );
}
