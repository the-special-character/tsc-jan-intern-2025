import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { ThemeContext } from "@/context/themeContext";
import { CartContext } from "@/context/cartContext";

const ProductListItem = ({ product }) => {
  const { cart, addItemToCart, updateItemToCart, deleteItemToCart } =
    useContext(CartContext);

  const index = cart.findIndex((x) => x.productId === product.id);

  return (
    <div>
      <div className="relative aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80">
        <Image alt={`${product.title} image`} src={product.image} fill />
      </div>
      <ThemeContext.Consumer>
        {(value) => {
          return <p>{value.theme}</p>;
        }}
      </ThemeContext.Consumer>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <div className="line-clamp-2 relative">
              <span aria-hidden="true" className="absolute inset-0 " />
              {product.title}
            </div>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      {index === -1 ? (
        <Button
          onClick={() => addItemToCart({ productId: product.id, quantity: 1 })}
        >
          Add To Cart
        </Button>
      ) : (
        <div className="flex">
          <Button
            onClick={() => {
              updateItemToCart({
                ...cart[index],
                quantity: cart[index].quantity + 1,
              });
            }}
          >
            +
          </Button>
          <p className="flex-1 text-center">{cart[index].quantity}</p>
          <Button
            onClick={() => {
              if (cart[index].quantity > 1) {
                updateItemToCart({
                  ...cart[index],
                  quantity: cart[index].quantity - 1,
                });
              } else {
                deleteItemToCart(cart[index]);
              }
            }}
          >
            -
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductListItem;
