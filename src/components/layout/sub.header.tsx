// components/layout/PackagesOuter.tsx
export default function SubHeader({content, height}: {content: string, height?: string}) {
    return (
        <main className="w-full bg-[#5600ff] md:pt-12" style={{height: height ? height : ''}}>
            <div className="max-w-7xl mx-auto p-6 pb-28">
                <h1 className="text-4xl font-bold text-gray-100 mb-8">{content}</h1>
            </div>
        </main>
    );
}
