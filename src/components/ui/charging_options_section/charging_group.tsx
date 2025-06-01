"use client"

import { updateChargeItem } from "@/redux/charge.slice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

interface ChargingGroupProps {
  title: string;
  color: string;
  items: { euro: number | string; lei: string }[];
  borderColor: string
  backgroundColor: string
}

export default function ChargingGroup({
  title,
  color,
  items,
  borderColor,
  backgroundColor
}: ChargingGroupProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSelectOptions = (options: any) => {
    dispatch(updateChargeItem({ index: 0, data: { type: title, amount: options.euro } }));
    switch (title) {
      case 'Orange Charging':
        router.push(`/operators/orange`);
        break;
      case 'Telekom Charging':
        router.push(`/operators/telekom`);
        break;
      case 'Vodafone Charging':
        router.push(`/operators/vodafone`);
        break;
      default:
        break;
    }
  }
  return (
    <section className="overflow-hidden py-10 md:py-20 px-4">
      <div className="max-w-7xl m-auto">
        <h2
          className="text-2xl sm:text-5xl font-bold text-center mb-8"
          style={{ color }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-center items-center sm:mt-8" onClick={() => onSelectOptions(item)}>
              <div
                className="group flex justify-center items-center rounded-full p-2 border-2 md:border-none transition-colors"
                style={{
                  borderColor: borderColor,
                  backgroundColor: idx === items.length - 1 ? backgroundColor : 'transparent'
                }}
              >
                <div
                  className="
                        flex justify-center items-center rounded-full w-36 md:w-44 aspect-square cursor-pointer 
                        text-center md:border-2 bg-white transition-all duration-300 ease-in-out
                        group-hover:bg-[color:var(--dynamic-color)]
                    "
                  style={{
                    color,
                    borderColor: color,
                    '--dynamic-color': color
                  } as React.CSSProperties}
                >
                  <div className="group-hover:text-white transition-colors duration-300">
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {item.euro} Euro
                    </div>
                    <div className="text-2xl opacity-90">{item.lei}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
