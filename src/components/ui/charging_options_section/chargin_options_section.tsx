import { orangeChargingData, telekomChargingData, vodafoneChargingData } from "@/constants/data.telecom";
import ChargingGroup from "./charging_group";


export default function ChargingOptionsSection() {
    return (
        <>
            <ChargingGroup
                title="Telekom Charging"
                color="rgb(226, 0, 116)"
                borderColor="rgb(189, 0, 97)"
                backgroundColor="rgb(255, 73, 166)"
                items={telekomChargingData}
            />
            <ChargingGroup
                title="Orange Charging"
                color="rgb(255, 121, 0)"
                borderColor="rgb(222, 105, 0)"
                backgroundColor="rgb(255, 147, 51)"
                items={orangeChargingData}
            />
            <ChargingGroup
                title="Vodafone Charging"
                color="rgb(226, 31, 29)"
                borderColor="rgb(187, 24, 23)"
                backgroundColor="rgb(255, 71, 70)"
                items={vodafoneChargingData}
            />
        </>
    );
}
