import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  BanknotesIcon,
  ChevronLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import type { Store, PaymentMethod } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";

type Props = {
  open: boolean;
  store: Store;
  setOpen: (value: boolean) => void;
};

function StorePaymentMethodDialog({ open, store, setOpen }: Props) {
  const paymentMethod = useCartStore(
    (state) => state.selectStore(+store.id!)?.paymentMethod
  );
  const updatePaymentMethod = useCartStore(
    (state) => state.updatePaymentMethod
  );

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-fill min-w-full transform overflow-hidden rounded-t-xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div
              className="flex justify-start items-center p-4 w-full"
              style={{ top: 0 }}
            >
              <button
                className="btn btn-circle size-8"
                onClick={() => setOpen(false)}
              >
                <ChevronLeftIcon className="size-4" />
              </button>
            </div>
            <div className="p-4">
              <fieldset>
                <h1 className="font-bold text-2xl">Payment method</h1>
                <p className="text-gray-500">
                  Please select how you want to pay for your order.
                </p>
                <div className="mt-6 space-y-4">
                  {(["card", "cod"] as PaymentMethod[]).map(
                    (pm, index, array) => {
                      return (
                        <div
                          key={pm}
                          className={
                            "flex items-center" +
                            (index !== array.length - 1
                              ? " border-b border-gray-200 pb-4"
                              : "")
                          }
                        >
                          <input
                            defaultChecked={paymentMethod === pm}
                            id={"payment-method-" + pm}
                            name="shipping-method"
                            type="radio"
                            value={pm}
                            className="radio radio-success"
                            onChange={() => updatePaymentMethod(store!.id, pm)}
                          />
                          <label
                            htmlFor={"payment-method-" + pm}
                            className="capitalize ml-3 text-sm/6 font-medium text-gray-900 flex items-center justify-between w-full"
                          >
                            {pm === "card" && (
                              <>
                                <span>Card</span>
                                <CreditCardIcon className="size-6 text-gray-500" />
                              </>
                            )}
                            {pm === "cod" && (
                              <>
                                <span>Cash</span>
                                <BanknotesIcon className="size-6 text-gray-500" />
                              </>
                            )}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              </fieldset>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default StorePaymentMethodDialog;
