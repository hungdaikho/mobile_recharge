"use client";
import {
  ICharge,
  addChargeItem,
  removeChargeItem,
  updateChargeItem,
} from "@/redux/charge.slice";
import { RootState } from "@/redux/store";
import { IPaymentStripeRequest } from "@/services/recharge.service";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IPaymentResponse, IPaymentStatus } from "../checkout/payment";
import { createPaymentStripe } from "@/redux/stripe.slice";
import PaymentForm from "../payment-form/payment-form";
const RechargeForm: React.FC = () => {
  const charge: ICharge = useSelector((state: RootState) => state.charge);
  const operators = useSelector((state: RootState) => state.operator.operators);
  const [selectedOperator, setSelectedOperator] = useState(charge.type || "");
  const [paymentResponse, setPaymentResponse] =
    useState<IPaymentResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<IPaymentStatus | null>(
    null
  );
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useDispatch();
  const handleAddNumber = () => {
    dispatch(addChargeItem({ phone: "", amount: "" }));
  };
  const handleRemove = (idx: number) => {
    dispatch(removeChargeItem(idx));
  };
  // Tỉ giá Euro sang RON
  const EURO_TO_RON = 5;
  // Tính toán tổng tiền (theo RON)
  const subtotal = charge.charges.reduce((sum, item) => {
    const amt = parseFloat(item.amount as string);
    return sum + (isNaN(amt) ? 0 : amt * EURO_TO_RON);
  }, 0);
  const vat = subtotal * 0.19;
  const total = subtotal + vat;
  const operatorActive: any = operators.find(
    (op) => op.id === (charge.type || selectedOperator)
  );
  const continueToPayment = async () => {
    const request: IPaymentStripeRequest = {
      phoneNumber: charge.charges.map(item => item.phone).join(';'),
      country: operatorActive.countryCode,
      operator: operatorActive.operatorId,
      amount: charge.charges.map(item => item.amount).join(';'),
      currency: "EUR",
    };
    const response = await dispatch(createPaymentStripe(request) as any);
    setPaymentResponse(response.payload);
    setTransactionId(response.payload.transactionId);
  };
  // Kiểm tra hợp lệ cho từng trường
  const isFormValid = () => {
    // Kiểm tra số điện thoại và số tiền
    const allFilled =
      charge.charges.length > 0 &&
      charge.charges.every((item) => {
        const phoneValid =
          typeof item.phone === "string" && item.phone.trim().length > 0;
        const amountValid =
          item.amount && !isNaN(Number(item.amount)) && Number(item.amount) > 0;
        return phoneValid && amountValid;
      });
    // Kiểm tra email
    const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // Kiểm tra operator
    const operatorValid = charge.type || selectedOperator;
    // Kiểm tra đã đồng ý điều khoản
    return allFilled && emailValid && operatorValid && agreeTerms;
  };
  const resetPaymentForm = (status: IPaymentStatus) => {
    setPaymentStatus(status);
    setPaymentResponse(null);
  };
  return (
    <div
      className="max-w-7xl mx-auto my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white"
      style={{ border: "none" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white">
        {/* Left side: Check the data */}
        {paymentStatus?.status === 1 ? (
          <div>
            <div
              className="col-span-3 border-r-2 p-12 flex flex-col items-center justify-center space-y-4 bg-green-50 rounded-md shadow-md"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="text-green-600 text-4xl">✔</div>
              <div className="text-xl font-semibold text-green-700">
                Payment successful!
              </div>
              <div className="text-gray-700">
                Reference code:
                <div className="flex flex-col gap-1 mt-2">
                  {(transactionId || "").split(';').map((id, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-black cursor-pointer hover:underline"
                      onClick={() => {
                        navigator.clipboard.writeText(id.trim());
                      }}
                    >
                      {id.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : paymentResponse ? (
          <div>
            <PaymentForm
              paymentResponse={paymentResponse}
              resetPaymentForm={resetPaymentForm}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-red-500 text-2xl font-light mb-4">
              Check the data
            </h2>
            <p className="text-gray-800 mb-4">Add one or more phone numbers.</p>
            {charge.charges.map((item, idx) => (
              <div className="flex gap-2 mb-2" key={idx}>
                <input
                  type="text"
                  value={item.phone}
                  className="flex-1 border rounded p-2 text-sm"
                  style={{ borderColor: "#e5e7eb" }}
                  onChange={(e) =>
                    dispatch(
                      updateChargeItem({
                        index: idx,
                        data: { phone: e.target.value },
                      })
                    )
                  }
                />
                <input
                  type="text"
                  value={item.amount}
                  className="w-20 border rounded p-2 text-sm"
                  style={{ borderColor: "#e5e7eb" }}
                  onChange={(e) =>
                    dispatch(
                      updateChargeItem({
                        index: idx,
                        data: { amount: e.target.value },
                      })
                    )
                  }
                />
                <button
                  className="text-sm text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemove(idx)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="w-full bg-[#fdffff] text-gray-700 border border-gray-300 p-2 mb-6 cursor-pointer"
              onClick={handleAddNumber}
            >
              + Add number
            </button>

            <p className="text-gray-800 mb-2 text-sm">
              Fill in your email address to receive the recharge confirmation.
            </p>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border p-3 rounded mb-4 text-sm"
              style={{ borderColor: "#e5e7eb" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!charge.type && (
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Select Operator
                </label>
                <select
                  value={selectedOperator}
                  onChange={(e) => {
                    setSelectedOperator(e.target.value)
                    dispatch(updateChargeItem({
                      index: 0,
                      data: {
                        type: e.target.value
                      }
                    })  )
                  }}
                  className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white"
                >
                  <option value="">Select an operator</option>
                  {operators.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 text-red-500" />
                <span>
                  I wish to receive commercial communications via email and SMS,
                  in compliance with the confidentiality clauses presented in
                  the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>I want a company invoice.</span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-blue-600 underline">
                    terms and conditions
                  </a>{" "}
                  of the cartela.info service
                </span>
              </label>
            </div>

            <button
              onClick={() => {
                continueToPayment();
              }}
              disabled={loading || !isFormValid()}
              className={`w-full bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold
                      ${
                        loading || !isFormValid()
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
            >
              {loading ? "Processing..." : "Continue to payment"}
            </button>
          </div>
        )}
        {/* Right side: Order summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order summary
          </h3>

          <div className="text-sm text-gray-800 space-y-2 mb-4">
            {charge.charges
              .filter(
                (item) => item.amount !== "" && !isNaN(Number(item.amount))
              )
              .map((item, idx) => {
                const op = operators.find((op) => op.operatorId === Number(charge.type));
                return (
                  <div
                    className="flex justify-between items-center border-b pb-2"
                    key={idx}
                  >
                    <div className="flex items-center gap-3">
                      {op && op.logoUrls && op.logoUrls.length > 0 && (
                        <img
                          src={op.logoUrls[0]}
                          alt={op.name}
                          className="h-4"
                        />
                      )}
                      <span>{op?.name}</span>
                      <span>{item.phone}</span>
                    </div>
                    <span>
                      {Number(item.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      EUR
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="border-t pt-4 text-sm text-gray-800 space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-orange-600 font-semibold">
                {subtotal.toFixed(2)} RON
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">VAT</span>
              <span className="text-orange-600 font-semibold">
                {vat.toFixed(2)} RON
              </span>
            </p>
            <p className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span className="text-orange-600">{total.toFixed(2)} RON</span>
            </p>
          </div>

          <div className="flex gap-1 items-center justify-center mt-4">
            <img src="/visa.webp" alt="Visa" className="w-20" />
            <img src="/mastercard.webp" alt="Mastercard" className="w-20" />
            <img src="/maestro.webp" alt="Maestro" className="w-20" />
          </div>

          <div className="flex gap-4 items-center justify-center mt-2">
            <img src="/secure.webp" alt="Secured" className="w-40" />
            <img src="/netopia.png" alt="Netopia Payment" className="w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeForm;
