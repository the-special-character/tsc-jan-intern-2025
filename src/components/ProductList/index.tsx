import React, { useContext } from "react";
import ProductListItem from "../ProductListItem";
import { ProductsContext } from "@/context/productsContext";

const ProductList = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="mt-6 bg-red-50 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
