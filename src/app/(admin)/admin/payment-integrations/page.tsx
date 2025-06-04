"use client";
import React from "react";

const paymentIntegrations = [
    { name: "Netopia", type: "Card", status: "Active" },
    { name: "Coinbase Commerce", type: "Crypto", status: "Active" },
    { name: "PayPal", type: "Card", status: "Inactive" },
];

const PaymentIntegrationsPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Payment Integrations</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Type</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentIntegrations.map((integration, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{integration.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{integration.type}</td>
                            <td className="border border-gray-300 px-4 py-2">{integration.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentIntegrationsPage;
