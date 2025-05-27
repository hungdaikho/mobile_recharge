"use client";
import Image from "next/image";
import { useState } from "react";

const packages = [
    {
        operator: "Orange",
        country: "Romania",
        type: "Physical",
        plan: "10GB - 30 Days",
        price: "€9.99",
        image: "/orange.webp",
    },
    {
        operator: "Vodafone",
        country: "Romania",
        type: "eSIM",
        plan: "5GB - 15 Days",
        price: "€7.99",
        image: "/vodafone.webp",
    },
    {
        operator: "Telekom",
        country: "Romania",
        type: "Physical",
        plan: "20GB - 30 Days",
        price: "€14.99",
        image: "/telekom.webp",
    },
];

export default function PackageList() {
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedOperator, setSelectedOperator] = useState("All");
    
    // Filter packages based on selected country and operator
    const filteredPackages = packages.filter(pkg => {
        const countryMatch = selectedCountry === "All" || pkg.country === selectedCountry;
        const operatorMatch = selectedOperator === "All" || pkg.operator.toLowerCase() === selectedOperator.toLowerCase();
        return countryMatch && operatorMatch;
    });

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white">
            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium">Country</label>
                    <select 
                        className="p-2 rounded outline-none" 
                        style={{ 
                            border: '1px solid #e5e7eb',
                            boxShadow: 'none'
                        }}
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Romania">Romania</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Operator</label>
                    <select 
                        className="p-2 rounded outline-none" 
                        style={{ 
                            border: '1px solid #e5e7eb',
                            boxShadow: 'none'
                        }}
                        value={selectedOperator}
                        onChange={(e) => setSelectedOperator(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="orange">orange</option>
                        <option value="vodafone">vodafone</option>
                        <option value="telekom">telekom</option>
                    </select>
                </div>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPackages.map((pkg, idx) => (
                    <div key={idx} className="relative border p-4 rounded shadow hover:shadow-md">
                        <div className="absolute top-3 right-1">
                            <Image src={pkg.image} alt={pkg.operator} width={32} height={32} className="h-8 w-auto" />
                        </div>
                        <h2 className="text-lg font-semibold">{pkg.operator}</h2>
                        <p className="text-sm text-gray-600">{pkg.country}</p>
                        <p className="mt-2 text-sm">Type: {pkg.type}</p>
                        <p className="text-sm">Plan: {pkg.plan}</p>
                        <p className="mt-2 font-bold text-blue-600">{pkg.price}</p>
                        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Purchase
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
