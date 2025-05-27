"use client";
import { useState } from "react";

const faqs = [
    {
        question: "1. What is cartela.info?",
        answer: [
            "cartela.info is a fast, efficient and secure system for loading - electronic reloading of prepaid cards for the main mobile operators in Romania: Vodafone, Orange and Telekom."
        ]
    },
    {
        question: "2. How long does the online recharge process take?",
        answer: ["This process usually takes about 2-3 minutes. If you choose to pay for this service with a card issued by a bank outside the country, this may delay the payment confirmation from the online payment processor."]
    },
    {
        question: "3. How long does it take until I receive the PIN code?",
        answer: ["Typically, the electronic recharge code is sent immediately to your email address."]
    },
    {
        question: "4. What if I receive a message other than the order confirmation?",
        answer: [
            "The message \"We're sorry, your order was not completed\" indicates that an error has occurred in the online payment method. These may be technical reasons, an overcrowded system, an interrupted internet connection, or other external causes.",
            "The message \"We are sorry, your order was not completed. Error processing the order\" indicates a processor error by the online recharge service provider - Vodafone, Orange, Telekom. Wait a few minutes and then resume the procedure or contact the Support Service via the contact form."
        ]
    },
    {
        question: "5. How do I find out if my card has been recharged?",
        answer: ["The cartela.info website offers the possibility of recharging your card credit through the direct (automatic) option, for which you will immediately receive a message on your mobile phone from the operator."]
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{border: 'none'}}>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 cursor-pointer" onClick={() => toggle(idx)}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{faq.question}</h2>
                            <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
                        </div>
                        {openIndex === idx && faq.answer.length > 0 && (
                            <div>
                                {faq.answer.map((text, index) => (
                                    <p key={index} className="mt-2 text-gray-600">{text}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
