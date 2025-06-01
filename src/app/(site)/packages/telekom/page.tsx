import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import { telekomChargingData } from "@/constants/data.telecom";
import React from "react";
import PackagesOuter from "../package";
import TelekomContent from "./content";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <PackagesOuter />
      <TelekomContent />
      <ChargingGroup
        title="Telekom Charging"
        color="rgb(226, 0, 116)"
        borderColor="rgb(189, 0, 97)"
        backgroundColor="rgb(255, 73, 166)"
        items={telekomChargingData}
      />
    </>
  );
};

export default page;
