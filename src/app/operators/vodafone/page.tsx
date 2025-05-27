import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import HeroSection from "@/components/ui/hero";
import {  vodafoneChargingData } from "@/constants/data.telecom";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <>
            <HeroSection bgColor="rgb(226, 31, 29)" />
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
