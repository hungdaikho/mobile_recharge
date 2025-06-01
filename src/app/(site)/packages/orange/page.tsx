import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import { orangeChargingData } from "@/constants/data.telecom";
import React from "react";
import PackagesOuter from "../package";
import OrangeContent from "./content";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <PackagesOuter />
      <OrangeContent />
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
