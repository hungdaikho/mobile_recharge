import Image from "next/image";

export default function HeroSection({ bgColor }: { bgColor?: string }) {
    return (
        <div className="w-full pt-10" style={{ backgroundColor: bgColor || "#5600ff" }}>
            <div className="max-w-7xl mx-auto pt-4 md:px-4 md:py-14">
                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-12">
                    <div className="md:max-w-xl">
                        {/* Logo */}
                        <div className="hidden md:flex items-center justify-center md:justify-normal mb-6 mt-6">
                            <div className="w-24 h-24 mr-2">
                                <svg viewBox="0 0 72 54" className="w-full h-full">
                                    {[27, 39, 51].map((cx) => (
                                        <circle key={`t1-${cx}`} cx={cx} cy="3" r="3" fill="#d1d5db" />
                                    ))}
                                    {[15, 27, 39].map((cx) => (
                                        <circle key={`t2-${cx}`} cx={cx} cy="15" r="3" fill="#d1d5db" />
                                    ))}
                                    {[3, 15, 27, 39].map((cx) => (
                                        <circle key={`t3-${cx}`} cx={cx} cy="27" r="3" fill="#d1d5db" />
                                    ))}
                                    <circle cx="51" cy="27" r="4" fill="#d1d5db" />
                                    <circle cx="63" cy="27" r="3" fill="#d1d5db" />
                                    {[15, 27, 39].map((cx) => (
                                        <circle key={`t4-${cx}`} cx={cx} cy="39" r="3" fill="#d1d5db" />
                                    ))}
                                    {[27, 39, 51].map((cx) => (
                                        <circle key={`t5-${cx}`} cx={cx} cy="51" r="3" fill="#d1d5db" />
                                    ))}
                                </svg>
                            </div>
                            <span className="text-5xl lg:text-6xl font-bold text-gray-100">cartela.info</span>
                        </div>
                        {/* Heading + Cards */}
                        <h1 className="text-xl md:text-3xl font-bold text-gray-100 mb-4 text-center md:text-left mt-8">
                            Recharge your PrePay card<br />
                            Recharge your card online.<br />
                            Instantly, without an account.
                        </h1>
                        <div className="flex flex-col justify-center md:justify-normal gap-4 mt-2 md:mt-8 md:pb-20 text-gray-100">
                            <div className="flex items-center justify-center md:justify-normal gap-1 sm:gap-4 md:mt-4">
                                <Image src="/visa.webp" alt="Visa" className="w-10 md:w-20" width={80} height={50} />
                                <Image src="/mastercard.webp" alt="Mastercard" className="w-10 md:w-20" width={80} height={50} />
                                <Image src="/maestro.webp" alt="Maestro" className="w-10 md:w-20" width={80} height={50} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[350px] pt-8">
                        <div className="relative">
                            <div className="md:absolute w-full bg-gradient-to-br from-gray-400 to-gray-700 rounded-t-[42px] md:rounded-[42px] md:p-[2px] md:border-gray-900 border-[2px] mx-auto overflow-hidden md:shadow-2xl">
                                <div className="relative w-full bg-gray-900 md:rounded-[40px] md:p-[8px] flex flex-col justify-center overflow-hidden">
                                    <div className="w-full md:rounded-[32px] overflow-hidden " style={{ backgroundColor: bgColor || "#5600ff" }}>
                                        <div className="w-full py-4 sm:py-5 px-5 hidden md:flex justify-between">
                                            <h3 className="flex text-white text-2xl font-semibold items-center gap-2">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                                                        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
                                                        <path d="m11 7-3 5h4l-3 5" />
                                                        <line x1="22" x2="22" y1="11" y2="13" />
                                                    </svg>
                                                </span>
                                                Mobile Recharge
                                            </h3>
                                        </div>
                                        <div className="w-full bg-white md:rounded-[32px] overflow-hidden pt-6 md:pt-0">
                                            <form className="p-5 pb-6 md:p-6 space-y-4">
                                                <div>
                                                    <label htmlFor="phone" className="block text-2xl font-bold text-gray-900 mb-2">Enter number</label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone h-5 w-5">
                                                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                                                <path d="M12 18h.01" />
                                                            </svg>
                                                        </div>
                                                        <input id="phone" type="tel" placeholder="Enter your phone number" className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="amount" className="block text-2xl font-bold text-gray-900 mb-2">Put your amount</label>
                                                    <input id="amount" type="number" placeholder="Please select amount" className="w-full border border-gray-300 rounded-lg py-2 px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" id="terms" className="w-5 h-5 rounded border-2 border-gray-300 text-teal-500 focus:ring-0 mt-1" />
                                                    <label htmlFor="terms" className="text-lg text-gray-600">
                                                        Accept <a href="/terms" className="text-blue-500">terms and conditions</a>
                                                    </label>
                                                </div>

                                                <button type="button" disabled className="w-full text-white text-lg font-medium py-3 px-6 rounded-lg transition-colors bg-gray-400">
                                                    Quick Recharge
                                                </button>

                                                <button type="button" className="w-full bg-white text-gray-700 text-lg font-medium px-6 py-1 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <h1 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                                                        Load more numbers
                                                    </h1>
                                                </button>
                                            </form>
                                            <div className="flex px-5 pb-6 space-y-1 gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#2684ff" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 16v-4" />
                                                    <path d="M12 8h.01" />
                                                </svg>
                                                <p className="text-md text-gray-500">Price will appear once all fields are filled.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
