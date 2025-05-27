// components/layout/PackagesOuter.tsx
export default function SubHeader({content}: {content: string}) {
    return (
        <main className="w-full pt-12 bg-[#5600ff]">
            <div className="max-w-7xl mx-auto p-6 pt-12 pb-28">
                <h1 className="text-4xl font-bold text-gray-100 mb-8">{content}</h1>
            </div>
        </main>
    );
}
