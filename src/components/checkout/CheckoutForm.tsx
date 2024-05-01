import React, { FormEvent } from "react";
import { cities } from "../../DB/cities.js";
import { useNavigate } from "react-router-dom";
import { emptyCart, setCartState } from "../../redux/features/cartSlice.js";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks.js";
import axios from "axios";

export default function CheckoutForm({
  subtotal,
  shippingFee = 0,
  checkout,
}: {
  subtotal: string;
  shippingFee?: number;
  checkout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartProducts = useAppSelector((state) => state.cartReducer.cartItems);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const receiver = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const address = formData.get("address") as string;
    await axios.post("https://dhserver.vercel.app/order", {
      name: receiver,
      phone,
      email,
      city,
      address,
      cartProducts,
    });
    navigate("/order-success");
    dispatch(setCartState(false));
    dispatch(emptyCart());
    checkout(false);

    console.log(cartProducts);
  };
  return (
    <form onSubmit={handleForm} className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <div className="">
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Receiver Name*
        </label>
        <div className="relative">
          <input
            type="text"
            required
            id="card-holder"
            name="name"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your full name here"
          />
        </div>
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Phone
        </label>
        <div className="relative">
          <input
            required
            type="phone"
            id="card-holder"
            name="phone"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your phone number here"
          />
        </div>

        <label className="mt-4 mb-2 block text-sm font-medium">
          Email (Optional)
        </label>
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
          />
        </div>

        <label className="mt-4 mb-2 block text-sm font-medium">
          Billing Address*
        </label>
        <div className="flex flex-col gap-2">
          <select
            required
            name="city"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option disabled selected value="State">
              Select city
            </option>
            {cities?.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
            <option value="State">{cities[0]}</option>
          </select>
          <div className="relative">
            <input
              required
              type="text"
              id="billing-address"
              name="address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street Address"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">৳{subtotal}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">৳{shippingFee}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            ৳{(parseFloat(subtotal) + shippingFee).toFixed(2)}
          </p>
        </div>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-zinc-800 px-6 py-3 font-medium text-white">
        Place Order
      </button>
    </form>
  );
}
