import { BanknotesIcon, ChevronRightIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import type { PaymentMethod } from "../../types/stores";

type Props = {
  paymentMethod: PaymentMethod;
  onClick: () => void;
}

function StorePaymentMethod({paymentMethod, onClick}: Props) {
  return (
    <div className="w-full rounded-md border border-gray-300 bg-white">
      <a
        onClick={onClick}
        href="javascript:void(0)"
        className="flex justify-between items-center p-3"
      >
        <div className="flex items-center gap-2 capitalize">
          { paymentMethod === 'card' && (
            <>
              <CreditCardIcon className="size-4 text-gray-500" />
              <span className="text-xs">Card</span>
            </>
          ) }
          { paymentMethod === 'cod' && (
            <>
              <BanknotesIcon className="size-4 text-gray-500" />
              <span className="text-xs">Cash</span>
            </>
          ) }

        </div>
        <ChevronRightIcon className="size-6" />
      </a>
    </div>
  );
}

export default StorePaymentMethod;
