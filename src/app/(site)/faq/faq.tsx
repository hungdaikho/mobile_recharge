"use client";
import { getFaqContent, IFaq } from "@/redux/faq.slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faq: Array<IFaq> = useSelector((state: RootState) => state.faq)
    const dispatch = useDispatch()
    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };
    useEffect(() => {
        dispatch(getFaqContent() as any)
    }, [])
    return (
        <div className="max-w-7xl mx-auto p-6 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{ border: 'none' }}>
            <div className="space-y-4">
                {faq.map((faq, idx) => (
                    <div key={idx} className="p-4 cursor-pointer" onClick={() => toggle(idx)}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{faq.question}</h2>
                            <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
                        </div>
                        {openIndex === idx && (
                            <div>
                                {faq.solve && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: faq.solve.replace(/<p(\s|>)/g, '<p class="mt-2 text-gray-600"$1')
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
