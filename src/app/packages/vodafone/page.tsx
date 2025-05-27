import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import { vodafoneChargingData } from "@/constants/data.telecom";
import React from "react";
import PackagesOuter from "../package";
import VodafoneContent from "./content";

type Props = {};

const page = (props: Props) => {
    return (
        <>
            <PackagesOuter />
            <VodafoneContent />
            <ChargingGroup
                title="Vodafone Charging"
                color="rgb(226, 31, 29)"
                borderColor="rgb(187, 24, 23)"
                backgroundColor="rgb(255, 71, 70)"
                items={vodafoneChargingData}
            />
        </>
    );
};

export default page;
