"use client";
import Image from "next/image";
import { useState } from "react";

const countries = [
  {
    name: "United States",
    flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#F5F5F5" d="M0 0h512v336H0z"/><path fill="#FF4B55" d="M0 25.8h512v25.8H0zM0 77.4h512v25.8H0zM0 129h512v25.8H0zM0 180.6h512v25.8H0zM0 232.2h512v25.8H0zM0 283.8h512v25.8H0z"/><path fill="#41479B" d="M0 0h204.8v154.2H0z"/><g fill="#F5F5F5"><g id="d"><g id="c"><g id="b"><path id="a" d="M12.8 10.3l3 9.3-7.8-5.7h9.6l-7.8 5.7z"/><use xlink:href="#a" y="21.6"/></g><use xlink:href="#b" x="14.6"/></g><use xlink:href="#c" x="29.2"/></g><use xlink:href="#d" x="58.4"/><use xlink:href="#c" x="87.6"/><use xlink:href="#b" x="117"/></g></g></svg>`,
    operators: [
      { name: "AT&T", logo: "/att.webp" },
      { name: "T-Mobile", logo: "/tmobile.webp" },
      { name: "Verizon", logo: "/verizon.webp" }
    ]
  },
  {
    name: "United Kingdom",
    flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#41479B" d="M0 0h512v336H0z"/><path fill="#FFF" d="M512 0v38.4L325.6 168H512v38.4H325.6L512 297.6V336h-51.2L256 214.2 51.2 336H0v-38.4L186.4 168H0v-38.4h186.4L0 38.4V0h51.2L256 121.8 460.8 0H512z"/><path fill="#FF4B55" d="M204.8 0v135H0v66h204.8v135h102.4V201H512v-66H307.2V0H204.8z"/><path fill="#FF4B55" d="M0 0l204.8 135h25.6L0 0zm307.2 135L512 0h-25.6L281.6 135h25.6zm0 66l204.8 135v-25.6L332.8 201h-25.6zm-102.4 0L0 336h25.6L230.4 201h-25.6z"/></g></svg>`,
    operators: [
      { name: "EE", logo: "/ee.webp" },
      { name: "Vodafone", logo: "/vodafone.webp" },
      { name: "Three", logo: "/three.webp" }
    ]
  },
  {
    name: "Germany",
    flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><path fill="#FF4B55" d="M0 224h512v112H0z"/><path fill="#FFE15A" d="M0 112h512v112H0z"/><path fill="#464655" d="M0 0h512v112H0z"/></svg>`,
    operators: [
      { name: "Telekom", logo: "/telekom.webp" },
      { name: "Vodafone", logo: "/vodafone.webp" },
      { name: "O2", logo: "/o2.webp" }
    ]
  },
  {
    name: "France",
    flag: `<svg width="1em" height="1em" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg"><path fill="#F5F5F5" d="M170.7 0h170.6v336H170.7z"/><path fill="#41479B" d="M0 0h170.7v336H0z"/><path fill="#FF4B55" d="M341.3 0H512v336H341.3z"/></svg>`,
    operators: [
      { name: "Orange", logo: "/orange.webp" },
      { name: "SFR", logo: "/sfr.webp" },
      { name: "Bouygues", logo: "/bouygues.webp" }
    ]
  },
  {
    name: "Romania",
    flag: `<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 640 480\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"evenodd\"><path fill=\"#002b7f\" d=\"M0 0h213.3v480H0z\"/><path fill=\"#fcd116\" d=\"M213.3 0h213.4v480H213.3z\"/><path fill=\"#ce1126\" d=\"M426.7 0H640v480H426.7z\"/></g></svg>`,
    operators: [
      { name: "Orange", logo: "/orange.webp" },
      { name: "Vodafone", logo: "/vodafone.webp" },
      { name: "Telekom", logo: "/telekom.webp" }
    ]
  },
  {
    name: "Vietnam",
    flag: `<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 512 336\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#D80027\" d=\"M0 0h512v336H0z\"/><path fill=\"#FFDA44\" d=\"M256 93.3l20.4 62.9h66.1l-53.5 38.8 20.4 62.9-53.5-38.8-53.5 38.8 20.4-62.9-53.5-38.8h66.1z\"/></svg>`,
    operators: [
      { name: "Viettel", logo: "/viettel.webp" },
      { name: "Vinaphone", logo: "/vinaphone.webp" },
      { name: "Mobifone", logo: "/mobifone.webp" }
    ]
  }
];

export default function PackageList() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedOperator, setSelectedOperator] = useState("All");
  const [isESIM, setIsESIM] = useState(true);
  const [isFizic, setIsFizic] = useState(false);

  // Filter countries and operators
  const filteredCountries = countries
    .filter(country => selectedCountry === "All" || country.name === selectedCountry)
    .map(country => ({
      ...country,
      operators: country.operators.filter(op => selectedOperator === "All" || op.name.toLowerCase() === selectedOperator.toLowerCase())
    }))
    .filter(country => country.operators.length > 0);

  // Get all unique country names and operator names for filters
  const allCountries = countries.map(c => ({ name: c.name, flag: c.flag }));
  const allOperators = Array.from(new Set(countries.flatMap(c => c.operators.map(o => o.name.toLowerCase()))));
  const operatorLogos = Object.fromEntries(
    countries.flatMap(c => c.operators.map(o => [o.name.toLowerCase(), o.logo]))
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{ border: 'none' }}>
      {/* Title & Description */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">International SIM Cards</h1>
        <p className="text-gray-500 text-base md:text-lg">
          Choose the perfect SIM card for travel, calls, or internet abroad.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        {/* Country Dropdown */}
        <div>
          <label className="block text-xs font-medium mb-1">Country</label>
          <div className="relative">
            <select
              className="appearance-none p-2 pl-8 rounded outline-none min-w-[120px] bg-gray-50 border"
              style={{ borderColor: '#e5e7eb' }}
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
            >
              <option value="All">All</option>
              {allCountries.map(({ name, flag }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <span className="absolute left-2 top-2.5 pointer-events-none">
              {selectedCountry === "All" ? (
                <span className="inline-block h-5 w-7 rounded overflow-hidden" dangerouslySetInnerHTML={{ __html: countries[0].flag }} />
              ) : (
                <span className="inline-block h-5 w-7 rounded overflow-hidden" dangerouslySetInnerHTML={{ __html: countries.find(c => c.name === selectedCountry)?.flag || countries[0].flag }} />
              )}
            </span>
          </div>
        </div>
        {/* Operator Dropdown */}
        <div>
          <label className="block text-xs font-medium mb-1">Operator</label>
          <div className="relative">
            <select
              className="appearance-none p-2 pl-8 rounded outline-none min-w-[120px] bg-gray-50 border"
              style={{ borderColor: '#e5e7eb' }}
              value={selectedOperator}
              onChange={e => setSelectedOperator(e.target.value)}
            >
              <option value="All">All</option>
              {allOperators.map(name => (
                <option key={name} value={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
              ))}
            </select>
            <span className="absolute left-2 top-2.5 pointer-events-none">
              {selectedOperator === "All" ? (
                <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#e5e7eb" /></svg>
              ) : (
                <Image src={operatorLogos[selectedOperator] || "/operator-default.png"} alt={selectedOperator} width={20} height={20} className="inline" />
              )}
            </span>
          </div>
        </div>
        {/* eSIM Switch */}
        <div className="flex flex-col items-center">
          <label className="block text-xs font-medium mb-1">eSIM</label>
          <button
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${isESIM ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setIsESIM(v => !v)}
            aria-label="Toggle eSIM"
            type="button"
          >
            <span
              className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ${isESIM ? 'translate-x-5' : ''}`}
            />
          </button>
        </div>
        {/* Fizic Button */}
        <div className="flex flex-col items-center">
          <label className="block text-xs font-medium mb-1">&nbsp;</label>
          <button
            className={`cursor-pointer px-6 py-2 rounded font-semibold border transition-colors duration-200 ${isFizic ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
            onClick={() => setIsFizic(v => !v)}
            type="button"
          >
            Physical
          </button>
        </div>
      </div>

      {/* Country Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country, idx) => (
          <div key={idx} className="relative border p-5 rounded-xl shadow hover:shadow-lg bg-white flex flex-col items-start" style={{ borderColor: '#e5e7eb' }}>
            {/* Flag and country name */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block h-5 w-7 rounded overflow-hidden" dangerouslySetInnerHTML={{ __html: country.flag }} />
              <h2 className="text-lg font-semibold">{country.name}</h2>
            </div>
            {/* Operator names */}
            <div className="flex flex-col gap-1 mt-2 w-full mb-3">
              {country.operators.map((op, opIdx) => (
                <div key={opIdx} className="text-base font-medium text-gray-700">{op.name}</div>
              ))}
            </div>
            {/* First two operator logos, centered */}
            <div className="flex flex-row gap-4 justify-center w-full mt-auto">
              {country.operators.slice(0, 2).map((op, opIdx) => (
                <Image key={opIdx} src={op.logo} alt={op.name} width={40} height={40} className="h-10 w-auto" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
