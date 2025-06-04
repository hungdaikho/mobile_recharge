export default function GoldNumbersList() {
    return (
        <div className="min-h-screen text-[#e0a640] font-sans py-5 md:py-14">
            <h1 className="text-5xl font-semibold text-center mb-8">Gold Numbers</h1>
            <div className="flex justify-center items-center gap-4 mb-10">
                <select className="bg-transparent border border-[#e0a640] text-[#e0a640] px-4 py-2 rounded w-48">
                    <option>Operator</option>
                </select>
                <input
                    type="text"
                    placeholder="Search number"
                    className="bg-transparent border border-[#e0a640] text-[#e0a640] px-4 py-2 rounded w-72"
                />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 max-w-6xl mx-auto">
                {[
                    {
                        number: '076252575',
                        badge: 'Unicat',
                        badgeColor: 'bg-orange-500',
                        operator: 'Orange',
                        logo: '/orange.webp',
                        price: '499,99 €'
                    },
                    {
                        number: '0738888333',
                        badge: 'Căutat',
                        badgeColor: 'bg-fuchsia-700',
                        operator: 'Telekom',
                        logo: '/telekom.webp',
                        price: '599,99 €'
                    },
                    {
                        number: '0763490000',
                        badge: 'Căutat',
                        badgeColor: 'bg-red-600',
                        operator: 'Crange',
                        logo: '/vodafone.webp',
                        price: '149 €'
                    }
                ].flatMap((item) => Array(3).fill(item)).map((item, index) => (
                    <div key={index} className="border border-[#e0a640] rounded-lg p-2 md:p-6 text-center relative shadow-xl">
                        <div className="text-sm md:text-2xl font-semibold text-gray-900 mb-2">{item.number}</div>
                        <span className={`text-xs font-bold text-white px-1 md:px-2 py-1 hidden md:inline rounded ${item.badgeColor}`}>{item.badge}</span>
                        <div className="flex justify-center items-center mb-2 mt-3">
                            <img src={item.logo} alt={item.operator} className="h-8" />
                        </div>
                        <div className="text-gray-900 text-sm md:text-lg mb-1 md:mb-2">{item.operator}</div>
                        <div className="text-[#e0a640] font-semibold text-sm md:text-xl mb-1 md:mb-4">{item.price}</div>
                        <button className="cursor-pointer  w-full border border-[#e0a640] text-[#e0a640] px-1 md:px-6 py-2 rounded hover:bg-[#e0a640] hover:text-black transition">
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
