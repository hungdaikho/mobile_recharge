"use client"
import { ICharge, addChargeItem, removeChargeItem, updateChargeItem } from "@/redux/charge.slice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const RechargeForm: React.FC = () => {
    const charge: ICharge = useSelector((state: RootState) => state.charge);
    const dispatch = useDispatch();
    const handleAddNumber = () => {
        dispatch(addChargeItem({ phone: '', amount: '' }));
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

    return (
        <div className="max-w-7xl mx-auto my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{ border: 'none' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white">
                {/* Left side: Check the data */}
                <div>
                    <h2 className="text-red-500 text-2xl font-light mb-4">Check the data</h2>
                    <p className="text-gray-800 mb-4">Add one or more phone numbers.</p>

                    {charge.charges.map((item, idx) => (
                        <div className="flex gap-2 mb-2" key={idx}>
                            <input
                                type="text"
                                value={item.phone}
                                className="flex-1 border rounded p-2 text-sm"
                                style={{ borderColor: '#e5e7eb' }}

                                onChange={(e) => dispatch(updateChargeItem({ index: idx, data: { phone: e.target.value } }))}
                            />
                            <div className="flex items-center border px-2 bg-orange-500 text-white font-semibold rounded text-xs">
                                orange
                            </div>
                            <input
                                type="text"
                                value={item.amount}
                                className="w-20 border rounded p-2 text-sm"
                                style={{ borderColor: '#e5e7eb' }}
                                onChange={(e) => dispatch(updateChargeItem({ index: idx, data: { amount: e.target.value } }))}
                            />
                            <button className="text-sm text-gray-600 hover:text-red-500 cursor-pointer" onClick={() => handleRemove(idx)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <button className="w-full bg-[#fdffff] text-gray-700 border border-gray-300 p-2 mb-6 cursor-pointer" onClick={handleAddNumber}>
                        + Add number
                    </button>

                    <p className="text-gray-800 mb-2 text-sm">
                        Fill in your email address to receive the recharge confirmation.
                    </p>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border p-3 rounded mb-4 text-sm"
                        style={{ borderColor: '#e5e7eb' }}
                    />

                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="mt-1 text-red-500" />
                            <span>
                                I wish to receive commercial communications via email and SMS, in
                                compliance with the confidentiality clauses presented in the{" "}
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
                            <input type="checkbox" className="mt-1" />
                            <span>
                                I accept the{" "}
                                <a href="#" className="text-blue-600 underline">
                                    terms and conditions
                                </a>{" "}
                                of the cartela.info service
                            </span>
                        </label>
                    </div>

                    <button className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold w-full">
                        Continue to payment
                    </button>
                </div>

                {/* Right side: Order summary */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order summary</h3>

                    <div className="text-sm text-gray-800 space-y-2 mb-4">
                        {charge.charges
                            .filter(item => item.amount !== '' && !isNaN(Number(item.amount)))
                            .map((item, idx) => (
                                <div className="flex justify-between items-center border-b pb-2" key={idx}>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/orange.webp"
                                            alt="operator"
                                            className="h-4"
                                        />
                                        <span>{item.phone}</span>
                                    </div>
                                    <span>{Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                                </div>
                            ))}
                    </div>

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

export default RechargeForm;
