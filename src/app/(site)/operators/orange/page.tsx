import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import HeroSection from "@/components/ui/hero";
import { orangeChargingData } from "@/constants/data.telecom";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <HeroSection bgColor="rgb(255, 121, 0)" />
      <ChargingGroup
        title="Orange Charging"
        color="rgb(255, 121, 0)"
        borderColor="rgb(222, 105, 0)"
        backgroundColor="rgb(255, 147, 51)"
        items={orangeChargingData}
      />
    </>
  );
};

export default page;
