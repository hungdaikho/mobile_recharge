"use client";
import { ICharge } from "@/redux/charge.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "@/components/PaymentForm";
import { createPayment, updateTransaction } from "@/redux/payment-gateways.slice";

const CheckoutSection: React.FC = () => {
  const router = useRouter();
  const charge: ICharge = useSelector((state: RootState) => state.charge);
  const operators = useSelector((state: RootState) => state.operator.operators);
  const [selectedOperator, setSelectedOperator] = useState(charge.type || "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [transaction, setTransaction] = useState<any>(null)
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()
  const operatorActive: any = operators.find(
    (op) => op.name === (charge.type || selectedOperator)
  );
  // Tính toán tiền RON
  const euro = Number(charge.charges[0]?.amount || 0);
  const rate = 5; // 1 Euro = 5 RON
  const subtotal = euro * rate;
  const vat = subtotal * 0.19;
  const total = subtotal + vat;

  const handleInitiatePayment = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email) {
        setError("Please enter your email address");
        return;
      }

      if (!charge.type && !selectedOperator) {
        setError("Please select an operator");
        return;
      }
      const datapost: any = {
        topups: [
          {
            phoneNumber: String(charge.charges[0].phone),
            amount: Number(charge.charges[0].amount),
          },
        ],
        country: operatorActive?.country?.code || "RO", // Romania
        operator: operatorActive?.apiCode || "",
        currency: "EUR",
        email: email, // Thêm email để gửi biên lai
      }
      const response = await dispatch(createPayment(datapost) as any)
      setClientSecret(response.payload.clientSecret);
      setTransaction(response.payload.transactions)
      setShowPaymentForm(true);
    } catch (err: any) {
      setError(
        err.message || "Payment initialization failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    const response = await dispatch(updateTransaction({ id: transaction[0].id, status: "SUCCESS" }) as any)
    if (response.payload) {
      setSuccess(true);
      setShowPaymentForm(false);
    }
  };

  const handlePaymentError = async (error: string) => {
    await dispatch(updateTransaction({ id: transaction[0].id, status: "FAILED" }) as any)
    setError(error);
  };

  return (
    <div
      className="max-w-7xl mx-auto my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white"
      style={{ border: "none" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left side: Check the data */}
        <div
          className="space-y-6 col-span-3 border-r-2 p-12"
          style={{ borderColor: "#e5e7eb" }}
        >
          <h2 className="text-red-500 text-2xl font-semibold">
            Check the data
          </h2>
          <p className="text-gray-700 text-sm">
            Fill in your email address to receive the recharge confirmation.
          </p>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {!showPaymentForm ? (
            <>
              {success ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-2xl font-semibold mb-4">
                    Payment Successful!
                  </div>
                  <p className="text-gray-700 mb-2">
                    Your recharge has been completed successfully.
                  </p>
                  <p className="text-gray-600">
                    Transaction ID: <span className="font-semibold">{transaction[0].id}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please keep this transaction ID for your records.
                  </p>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                  />

                  {!charge.type && (
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Select Operator
                      </label>
                      <select
                        value={selectedOperator}
                        onChange={(e) => setSelectedOperator(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white"
                      >
                        <option value="">Select an operator</option>
                        {operators.map((op) => (
                          <option key={op.apiCode} value={op.name}>
                            {op.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-gray-700">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-1" />
                      <span>
                        I wish to receive commercial communications via email and
                        SMS, in compliance with the confidentiality clauses
                        presented in the{" "}
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

                  <button
                    onClick={handleInitiatePayment}
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold
                      ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                  >
                    {loading ? "Processing..." : "Continue to payment"}
                  </button>
                </>
              )}
            </>
          ) : clientSecret ? (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                <p className="text-sm text-gray-600">
                  Total amount: {charge.charges[0]?.amount} EUR
                </p>
              </div>
              <PaymentForm
                clientSecret={clientSecret}
                amount={Number(charge.charges[0]?.amount)}
                currency="EUR"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600">Loading payment form...</p>
            </div>
          )}
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
              <span>{operatorActive?.name || "Not selected"}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Value</span>
              <span>{charge.charges[0]?.amount} EUR</span>
            </p>
          </div>

          <button
            className="bg-[#fdffff] text-sm py-2 w-full border border-gray-300 cursor-pointer"
            onClick={() => router.push("/payment/group-checkout")}
          >
            + Load more numbers
          </button>

          <div className="border-t pt-4 text-sm text-gray-800 space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-orange-600 font-semibold">
                {subtotal.toFixed(2)} RON
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">VAT (19%)</span>
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

export default CheckoutSection;
