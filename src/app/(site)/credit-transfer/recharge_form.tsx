// components/packages/RechargeForm.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
export const countries = [
    {
        label: "United States",
        flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#F5F5F5" d="M0 0h512v336H0z"/><path fill="#FF4B55" d="M0 25.8h512v25.8H0zM0 77.4h512v25.8H0zM0 129h512v25.8H0zM0 180.6h512v25.8H0zM0 232.2h512v25.8H0zM0 283.8h512v25.8H0z"/><path fill="#41479B" d="M0 0h204.8v154.2H0z"/><g fill="#F5F5F5"><g id="d"><g id="c"><g id="b"><path id="a" d="M12.8 10.3l3 9.3-7.8-5.7h9.6l-7.8 5.7z"/><use xlink:href="#a" y="21.6"/></g><use xlink:href="#b" x="14.6"/></g><use xlink:href="#c" x="29.2"/></g><use xlink:href="#d" x="58.4"/><use xlink:href="#c" x="87.6"/><use xlink:href="#b" x="117"/></g></g></svg>`
    },
    {
        label: "United Kingdom",
        flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#41479B" d="M0 0h512v336H0z"/><path fill="#FFF" d="M512 0v38.4L325.6 168H512v38.4H325.6L512 297.6V336h-51.2L256 214.2 51.2 336H0v-38.4L186.4 168H0v-38.4h186.4L0 38.4V0h51.2L256 121.8 460.8 0H512z"/><path fill="#FF4B55" d="M204.8 0v135H0v66h204.8v135h102.4V201H512v-66H307.2V0H204.8z"/><path fill="#FF4B55" d="M0 0l204.8 135h25.6L0 0zm307.2 135L512 0h-25.6L281.6 135h25.6zm0 66l204.8 135v-25.6L332.8 201h-25.6zm-102.4 0L0 336h25.6L230.4 201h-25.6z"/></g></svg>`
    },
    {
        label: "Germany",
        flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><path fill="#FF4B55" d="M0 224h512v112H0z"/><path fill="#FFE15A" d="M0 112h512v112H0z"/><path fill="#464655" d="M0 0h512v112H0z"/></svg>`
    },
    {
        label: "France",
        flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><path fill="#F5F5F5" d="M170.7 0h170.6v336H170.7z"/><path fill="#41479B" d="M0 0h170.7v336H0z"/><path fill="#FF4B55" d="M341.3 0H512v336H341.3z"/></svg>`
    },
    {
        label: "Romania",
        flag: `<svg width="1em" height="1em" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="evenodd">
      <path fill="#002b7f" d="M0 0h213.3v480H0z"/>
      <path fill="#fcd116" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
    </g>
  </svg>`
    },
    {
        label: "Vietnam",
        flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><path fill="#D80027" d="M0 0h512v336H0z"/><path fill="#FFDA44" d="M256 93.3l20.4 62.9h66.1l-53.5 38.8 20.4 62.9-53.5-38.8-53.5 38.8 20.4-62.9-53.5-38.8h66.1z"/></svg>`
    }
];

export default function RechargeForm() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedOperator, setSelectedOperator] = useState("");
    const [showCountries, setShowCountries] = useState(false);
    return (
        <div className="max-w-7xl mx-auto p-6 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{ border: 'none' }}>
            <div className="p-6">

                {/* Country Select */}
                <div className="mb-4">
                    <label className="block font-semibold">Country</label>
                    <div className="w-full md:w-64 mt-2 relative">
                        <button
                            type="button"
                            className="w-full px-4 py-2 rounded flex justify-between items-center"
                            style={{ border: 'thin solid rgba(77, 77, 77, 0.3)' }}
                            onClick={() => setShowCountries(!showCountries)}
                        >
                            {selectedCountry || "Select a country"}
                            <span className="ml-2">▼</span>
                        </button>

                        {showCountries && (
                            <ul
                                className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white shadow rounded"
                                style={{ border: 'thin solid rgba(77, 77, 77, 0.3)' }}
                                role="listbox"
                            >
                                {countries.map((country, index) => (
                                    <li
                                        key={index}
                                        role="option"
                                        tabIndex={0}
                                        onClick={() => {
                                            setSelectedCountry(country.label);
                                            setShowCountries(false);
                                        }}
                                        className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                                    >
                                        <span className="inline-block w-5 h-5 mr-2" dangerouslySetInnerHTML={{ __html: country.flag }} />
                                        <span>{country.label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Operator Select - Show only when country is selected */}
                <div className={`mb-4 ${selectedCountry ? "" : "hidden"}`}>
                    <label className="block font-semibold">Operator</label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {["orange", "vodafone", "telekom"].map((op) => (
                            <button
                                key={op}
                                className={`p-2 md:p-4 border rounded ${selectedOperator === op ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}`}
                                onClick={() => setSelectedOperator(op)}
                            >
                                <Image
                                    src={`/${op}.webp`}
                                    alt={op}
                                    width={80}
                                    height={64}
                                    className="h-16 w-auto"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Phone number - Show only when operator is selected */}
                <div className={`mb-4 ${selectedOperator ? "" : "hidden"}`}>
                    <label className="block font-semibold">Phone number</label>
                    <input
                        type="text"
                        placeholder="+40 ex:7xx xxx xxx"
                        className="w-full md:w-64 p-2 border rounded mt-1"
                        style={{ border: 'thin solid rgba(77, 77, 77, 0.3)' }}
                    />
                </div>

                {/* Amount - Show only when operator is selected */}
                <div className={`mb-4 ${selectedOperator ? "" : "hidden"}`}>
                    <label className="block font-semibold">Amount</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {[
                            { receive: "5", net: "4.2", charge: "5.85" },
                            { receive: "5.95", net: "5", charge: "6.95" },
                            { receive: "7.14", net: "6", charge: "8.35" },
                            { receive: "9.52", net: "8", charge: "11.15" },
                            { receive: "11.9", net: "10", charge: "13.95" },
                            { receive: "20", net: "16.8", charge: "23.45" },
                        ].map((item, index) => (
                            <button
                                key={index}
                                className="border p-3 rounded text-left border-gray-300"
                            >
                                <div className="text-sm text-blue-600 font-medium">
                                    Amount received: {item.receive} EUR
                                </div>
                                <div className="text-xs text-gray-500">
                                    incl. local taxes (€{item.net} Net)
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                    Amount charged: €{item.charge}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit button - Enabled when operator is selected */}
                <button
                    disabled={!selectedOperator}
                    className={`mt-4 p-3 rounded font-bold w-full md:w-64 ${selectedOperator
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500"
                        }`}
                >
                    <p className="flex justify-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4"
                        >
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        Recharge Now
                    </p>
                </button>
            </div>
        </div>
    );
}
