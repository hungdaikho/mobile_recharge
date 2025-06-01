"use client"
import { ICharge } from "@/redux/charge.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";

const CheckoutSection: React.FC = () => {
  const router = useRouter();
  const charge: ICharge = useSelector((state: RootState) => state.charge);
  // Tính toán tiền RON
  const euro = Number(charge.charges[0]?.amount || 0);
  const rate = 5; // 1 Euro = 5 RON
  const subtotal = euro * rate;
  const vat = subtotal * 0.19;
  const total = subtotal + vat;
  return (
    <div className="max-w-7xl mx-auto my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{ border: 'none' }}>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left side: Check the data */}
        <div className="space-y-6 col-span-3 border-r-2 p-12" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-red-500 text-2xl font-semibold">Check the data</h2>
          <p className="text-gray-700 text-sm">
            Fill in your email address to receive the recharge confirmation.
          </p>

          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md p-3 text-sm"
          />

          <div className="space-y-3 text-sm text-gray-700">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-1" />
              <span>
                I wish to receive commercial communications via email and SMS,
                in compliance with the confidentiality clauses presented in the{" "}
                <a href="#" className="text-blue-500 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <span>I want a company invoice.</span>
            </label>
          </div>

          <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold">
            Continue to payment
          </button>
        </div>

        {/* Right side: Order summary */}
        <div className="space-y-6 col-span-2 p-12">
          <h3 className="text-lg font-semibold text-gray-800">Order summary</h3>

          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex justify-between">
              <span className="font-semibold">Phone number</span>
              <span>{charge.charges[0]?.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Operator</span>
              <span>{charge.type !== '' ? charge.type : 'orange'}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Value</span>
              <span>{charge.charges[0]?.amount}</span>
            </p>
          </div>

          <button className="bg-[#fdffff] text-sm py-2 w-full border border-gray-300 cursor-pointer" onClick={() => router.push("/payment/group-checkout")}>
            + Load more numbers
          </button>

          <div className="border-t pt-4 text-sm text-gray-800 space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-orange-600 font-semibold">{subtotal.toFixed(2)} RON</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">VAT</span>
              <span className="text-orange-600 font-semibold">{vat.toFixed(2)} RON</span>
            </p>
            <p className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span className="text-orange-600">{total.toFixed(2)} RON</span>
            </p>
          </div>

          <div className="flex gap-1 items-center justify-center mt-4">
            <img
              src="/visa.webp"
              alt="Visa"
              className="w-20"
            />
            <img
              src="/mastercard.webp"
              alt="Mastercard"
              className="w-20"
            />
            <img
              src="/maestro.webp"
              alt="Maestro"
              className="w-20"
            />
          </div>

          <div className="flex gap-4 items-center justify-center mt-2">
            <img
              src="/secure.webp"
              alt="Secured"
              className="w-40"
            />
            <img
              src="/netopia.png"
              alt="Netopia Payment"
              className="w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
