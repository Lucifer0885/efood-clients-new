import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ChevronLeftIcon,
  ShoppingCartIcon,
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
  BriefcaseIcon,
  DocumentCurrencyEuroIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";
import type { Order as O, OrderResponse } from "../types/orders";
import dayjs from "dayjs";

function Order() {
  const params = useParams();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<O>();

  useEffect(() => {
    axiosInstance
      .get<OrderResponse>("/client/orders/" + params.id)
      .then((response) => {
        if (!response.data.success) {
          return;
        }

        setOrder(response.data.data.order);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="my-4 px-2">
        <Link to={"/orders"}>
          <button className="btn btn-circle btn-ghost">
            <ChevronLeftIcon className="size-8" />
          </button>
        </Link>
      </div>
      <div className="p-4">
        <div className="font-bold text-2xl">Your Order</div>
        {loading || !order ? (
          "Loading"
        ) : (
          <div className="mt-5">
            <div className="text-gray-500">
              {dayjs(order.created_at).format("DD/MM/YYYY")} ·{" "}
              {dayjs(order.created_at).format("HH:mm")} · ID: {order.id}
            </div>
            <div className="px-5 mt-5">
              <div className="py-3 flex items-center gap-7">
                <div className="avatar shrink">
                  <div className="w-12 h-12 rounded-full">
                    <img src={order.store.logo} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Store:</div>
                  <div>{order.store.name}</div>
                </div>
              </div>
              <div className="py-3 flex items-center gap-7">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                  <MapPinIcon className="size-5" />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Deliver to:</div>
                  <div>
                    {order.address.street} {order.address.number},{" "}
                    {order.address.city} {order.address.postal_code}
                  </div>
                </div>
              </div>
              <div className="py-3 flex items-center gap-7">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                  <ShoppingCartIcon className="size-5" />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Total:</div>
                  <div>{order.total_price}€</div>
                </div>
              </div>
              <div className="py-3 flex items-center gap-7">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                  {order.payment_method === "card" && (
                    <CreditCardIcon className="size-5" />
                  )}
                  {order.payment_method === "cod" && (
                    <BanknotesIcon className="size-5" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Payment type:</div>
                  <div>
                    {order.payment_method === "card" && "Card"}
                    {order.payment_method === "cod" && "Cash"}
                  </div>
                </div>
              </div>
            </div>
            <div className="font-bold text-xl px-5 mt-5">Cart</div>
            <ul className="divide-y divide-gray-100 px-5 mt-5">
              {order.products.map((product) => (
                <li className="flex gap-4 items-center py-5">
                  <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0">
                    {product.quantity}
                  </div>
                  <div className="flex flex-col grow-1">
                    <div>{product.product_name}</div>
                    <div className="font-bold text-sm">{product.price}€</div>
                  </div>
                  <div className="grow-0 w-[70px] h-[56px]">
                    <img
                      className="object-cover w-full h-full rounded-xl"
                      src={product.product.mainImage}
                    />
                  </div>
                </li>
              ))}
              <li className="flex gap-4 items-center py-5">
                <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0">
                  <BriefcaseIcon className="size-4" />
                </div>
                <div className="flex flex-col grow-1">Serivce fee</div>
                <div className="grow-0">
                  <div className="font-bold text-sm">
                    {order.shipping_price}€
                  </div>
                </div>
              </li>
              <li className="flex gap-4 items-center py-5">
                <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0">
                  <DocumentCurrencyEuroIcon className="size-4" />
                </div>
                <div className="flex flex-col grow-1">Total price</div>
                <div className="grow-0">
                  <div className="font-bold text-sm">{order.total_price}€</div>
                </div>
              </li>
              {order.note && (
                <li className="flex gap-4 items-center py-5">
                  <div className="w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0">
                    <ChatBubbleBottomCenterTextIcon className="size-4" />
                  </div>
                  <div className="flex flex-col grow-1">{order.note}</div>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
