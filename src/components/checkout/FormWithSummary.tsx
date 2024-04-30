
import CheckoutForm from "./CheckoutForm";

export default function FormWithSummary({
  subtotal,
  checkout,
}: {
  subtotal: string;
  checkout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="">
      <div className="px-4">
        <p className="mt-8 text-lg font-medium">Payment Methods</p>
        <form className="mt-5 grid gap-6">
          {/* card payment currently off */}
          {/* <div className="relative">
            <input
              value="card"
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              checked
            />
            <span className="peer-checked:border-indigo-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label htmlFor="radio_1"
              className="peer-checked:border-2 peer-checked:border-indigo-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            >

              <div className="ml-5">
                <span className="mt-2 font-semibold">Card Payment</span>
                <p className="text-slate-500 text-sm leading-6">
                  Delivery: 1-2 Days
                </p>
              </div>
            </label>
          </div> */}
          <div className="relative">
            <input
              value="cod"
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="code"
              checked
            />
            <span className="peer-checked:border-indigo-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              htmlFor="radio_2"
              className="peer-checked:border-2 peer-checked:border-indigo-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            >
              <div className="ml-5">
                <span className="mt-2 font-semibold">
                  Cash on Delivery (COD)
                </span>
                <p className="text-slate-500 text-sm leading-6">
                  Delivery: 1-4 Days
                </p>
              </div>
            </label>
          </div>
        </form>
      </div>
      {/* checkout form */}
      <CheckoutForm checkout={checkout} subtotal={subtotal} />
    </div>
  );
}
