// components/landing/StepsSection.tsx
import Image from "next/image";

const steps = [
  {
    img: "/step1.webp",
    title: "ENTER NUMBER",
  },
  {
    img: "/step2.webp",
    title: "CHOOSE AMOUNT",
  },
  {
    img: "/step3.webp",
    title: "CHECK THE DATA",
  },
  {
    img: "/step4.webp",
    title: "PAY",
  },
];

export default function StepsSection() {
  return (
    <section className="bg-[#000217] py-10 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-5xl font-bold text-gray-100 mb-8 sm:mb-16 text-center">
          Recharge your PrePay card now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={step.img}
                alt={step.title}
                width={200}
                height={200}
                className="h-28 sm:h-52 mb-6 w-auto"
              />
              <h3
                className="text-xl sm:text-4xl text-gray-100 mt-3 mb-3"
                style={{ textShadow: "0px 0px 3px rgb(52, 177, 204)" }}
              >
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
