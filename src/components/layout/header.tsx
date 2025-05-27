"use client";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
export default function Header() {
    const [showMenu, setShowMenu] = useState(false)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Function to determine background color based on path
    const getBackgroundColor = () => {
        if (pathname === '/operators/telekom') {
            return "rgb(226, 0, 116)";
        } else if (pathname === '/operators/orange') {
            return "rgb(255, 121, 0)";
        } else if (pathname === '/operators/vodafone') {
            return "rgb(226, 31, 29)";
        } else {
            return "rgb(86, 0, 255)"; // Default color
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <header
            className="md:fixed w-full top-0 py-4 z-10"
            style={{ backgroundColor: getBackgroundColor() }}
        >
            <nav className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-end">
                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-4">
                        <ul className="flex space-x-6 items-end text-sm font-medium text-gray-100">
                            <li>
                                <Link href="/" className="hover:text-gray-900">
                                    Home
                                </Link>
                            </li>
                            <li className="relative group">
                                <button className="hover:text-gray-900">Operators</button>
                                <div className="absolute left-0 top-full z-20 hidden group-hover:block">
                                    {/* vùng "cầu nối" giúp hover không bị mất khi di chuột qua khoảng trống */}
                                    <div className="pt-[5px]">
                                        <ul className="bg-white rounded-sm shadow-lg text-sm text-gray-900 w-40">
                                            <li
                                                className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                onClick={() => router.push('/operators/orange')}
                                            >
                                                Orange
                                            </li>
                                            <li
                                                className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                onClick={() => router.push('/operators/vodafone')}
                                            >
                                                Vodafone
                                            </li>
                                            <li
                                                className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                onClick={() => router.push('/operators/telekom')}
                                            >
                                                Telekom
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="relative group">
                                <button className="hover:text-gray-900">Packages</button>

                                <div className="absolute left-0 top-full z-20 hidden group-hover:block">
                                    {/* vùng "cầu nối" giúp hover không bị mất khi di chuột qua khoảng trống */}
                                    <div className="absolute left-0 top-full z-20 hidden group-hover:block">
                                        {/* vùng "cầu nối" giúp hover không bị mất khi di chuột qua khoảng trống */}
                                        <div className="pt-[5px]">
                                            <ul className="bg-white rounded-sm shadow-lg text-sm text-gray-900 w-40">
                                                <li
                                                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                    onClick={() => router.push('/packages/orange')}
                                                >
                                                    Orange
                                                </li>
                                                <li
                                                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                    onClick={() => router.push('/packages/vodafone')}
                                                >
                                                    Vodafone
                                                </li>
                                                <li
                                                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                                                    onClick={() => router.push('/packages/telekom')}
                                                >
                                                    Telekom
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link href="/credit-transfer" className="hover:text-gray-900">
                                    Credit Transfer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/international-cards"
                                    className="hover:text-gray-900"
                                >
                                    International Cards
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gold-numbers"
                                    className="grid rounded-lg shadow-sm hover:text-gray-900"
                                >
                                    <p className="flex justify-end">
                                        <span className="rounded-full px-2 bg-white text-gray-900 text-[10px] font-bold">
                                            VIP
                                        </span>
                                    </p>
                                    <p className="flex gap-1 items-end">
                                        Gold
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
                                            className="lucide lucide-gem w-4"
                                        >
                                            <path d="M6 3h12l4 6-10 13L2 9Z" />
                                            <path d="M11 3 8 9l4 13 4-13-3-6" />
                                            <path d="M2 9h20" />
                                        </svg>
                                        Numbers
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-to-pay" className="hover:text-gray-900">
                                    How to Recharge & Pay
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-gray-900">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="hover:text-gray-900">
                                    News
                                </Link>
                            </li>
                        </ul>
                        {/* Language Switch */}
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex items-center px-4 py-2 bg-transparent text-sm font-medium text-gray-100 focus:outline-none gap-1"
                            >
                                <GlobeIcon /> En
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-32 rounded-sm bg-white shadow-lg z-20">
                                    <div className="py-2 text-gray-900 text-sm">
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">English</button>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Română</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div className="w-full md:hidden flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8">
                                <LogoIcon />
                            </div>
                            <span className="text-xl font-bold text-gray-100">
                                cartela.info
                            </span>
                        </Link>
                        <div>
                            <div className="relative inline-block text-left" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="inline-flex items-center px-4 py-2 bg-transparent text-sm font-medium text-gray-100 focus:outline-none gap-1"
                                >
                                    <GlobeIcon /> En
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-32 rounded-sm bg-white shadow-lg z-20">
                                        <div className="py-2 text-gray-900 text-sm">
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">English</button>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Română</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="ml-2 p-2 text-gray-100" onClick={() => setShowMenu(!showMenu)}>
                                {showMenu ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {showMenu && <div
                className="flex justify-center md:hidden mt-4 p-6 w-full bg-cover bg-center"
                style={{ backgroundImage: 'url("/mobileBg.webp")' }}
            >
                <ul className="flex flex-col text-md font-medium text-gray-100 space-y-2">
                    <li>
                        <a href="/">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home w-8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                Home
                            </p>
                        </a>
                    </li>

                    <li>
                        <details className="group">
                            <summary className="px-4 py-4 cursor-pointer flex justify-between items-center border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <span className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signal-high w-8"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path></svg>
                                    Operators
                                </span>
                                <span>▼</span>
                            </summary>
                            <ul className="ml-4 text-blue-400 space-y-1 pt-2">
                                <li><a href="/operators/orange"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Orange</p></a></li>
                                <li><a href="/operators/vodafone"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Vodafone</p></a></li>
                                <li><a href="/operators/telekom"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Telekom</p></a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group">
                            <summary className="px-4 py-4 cursor-pointer flex justify-between items-center border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <span className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-8"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
                                    Packages
                                </span>
                                <span>▼</span>
                            </summary>
                            <ul className="ml-4 text-blue-400 space-y-1 pt-2">
                                <li><a href="/packages/orange"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Orange</p></a></li>
                                <li><a href="/packages/vodafone"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Vodafone</p></a></li>
                                <li><a href="/packages/telekom"><p className="flex gap-2 items-center py-2 px-4 rounded-2xl">Telekom</p></a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <a href="/credit-transfer">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right w-8"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
                                Credit Transfer
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/international-cards">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe w-8"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                                International Cards
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/gold-numbers">
                            <p className="flex gap-2 items-center justify-between py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <span className="flex gap-2">
                                    <img src="/diamond.webp" className="w-8" alt="gold numbers" />
                                    Gold Numbers
                                </span>
                                <span className="rounded-full border text-gray-900 border-[#7875bb] px-2 py-1 bg-white text-xs font-bold">VIP</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/how-to-pay">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-question w-8"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                                How to Recharge & Pay
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/faq">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rows3 w-8"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M21 9H3"></path><path d="M21 15H3"></path></svg>
                                FAQ
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/news">
                            <p className="flex gap-2 items-center py-4 px-4 border-2 border-[#47448d] rounded-2xl bg-[#3a3e87c2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mailbox w-8"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><polyline points="15,9 18,9 18,11"></polyline><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path><line x1="6" x2="7" y1="10" y2="10"></line></svg>
                                News
                            </p>
                        </a>
                    </li>
                </ul>
            </div>}
        </header>
    );
}
const GlobeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-globe"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

const MenuIcon = () => (
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
        className="lucide lucide-menu"
    >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);
const CloseIcon = () => (
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
        className="lucide lucide-x"
    >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
    </svg>
);
const LogoIcon = () => (
    <svg viewBox="0 0 72 54" className="w-full h-full">
        {[
            [27, 3],
            [39, 3],
            [51, 3],
            [15, 15],
            [27, 15],
            [39, 15],
            [3, 27],
            [15, 27],
            [27, 27],
            [39, 27],
            [51, 27, 4],
            [63, 27],
            [15, 39],
            [27, 39],
            [39, 39],
            [27, 51],
            [39, 51],
            [51, 51],
        ].map(([cx, cy, r = 3], idx) => (
            <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                style={{ fill: "rgb(209, 213, 219)" }}
            />
        ))}
    </svg>
);
