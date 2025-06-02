import {
  ChevronDownIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import type { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import type { CartProduct } from "../../context/CartStore";
import { useState } from "react";
import ProductQuantityControls from "./ProductQuantityControls";

type Props = {
  store: Store;
  product: CartProduct;
};

function StoreCartSummaryProduct({
  store,
  product,
}: Props) {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const [showQuantity, setShowQuantity] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <div className="grow-0">
        {!showQuantity ? (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowQuantity(true);
            }}
            className="btn btn-neutral btn-square size-8"
          >
            {product.quantity}
            <ChevronDownIcon className="size-2 text-white" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-square size-8"
              onClick={(event) => {
                event.stopPropagation();
                setShowQuantity(false);
              }}
            >
              <XMarkIcon className="size-4 text-gray-500" />
            </button>
            <button
              className="btn btn-square size-8"
              onClick={(event) => {
                event.stopPropagation();
                removeItem(store.id, product.product);
                setShowQuantity(false);
              }}
            >
              <TrashIcon className="size-4 text-gray-500" />
            </button>
            <div className="p-1 bg-white border border-gray-200 rounded">
              <ProductQuantityControls
                quantity={product.quantity}
                onIncreaseQuantity={(event) => {
                  event.stopPropagation();
                  increaseQuantity(store.id, product.product);
                }}
                onDecreaseQuantity={(event) => {
                  event.stopPropagation();
                  decreaseQuantity(store.id, product.product);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="grow-1">
        <div className="text-sm">{product.product.name}</div>
        <div className="font-bold text-xs">
          {(product.product.price * product.quantity).toFixed(2)}€
        </div>
      </div>
      <div className="grow-0">
        <img
          className="object-cover rounded-lg w-[70px] h-[56px]"
          src={product.product.mainImage}
        />
      </div>
    </div>
  );
}

export default StoreCartSummaryProduct;