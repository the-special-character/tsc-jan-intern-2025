"use client";
import ProductListItem from "@/components/ProductListItem";
import { Button } from "@/components/ui/button";
import { ProductsContext } from "@/context/productsContext";
import { ThemeContext } from "@/context/themeContext";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";

export default function Home() {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      <Button className="group" variant="ghost">
        <ArrowLeft
          className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Button
      </Button>
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
