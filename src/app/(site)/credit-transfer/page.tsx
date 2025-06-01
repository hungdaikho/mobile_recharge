import SubHeader from "@/components/layout/sub.header";
import React from "react";
import RechargeForm from "./recharge_form";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <SubHeader content="Credit Transfer" />
      <RechargeForm />
    </>
  );
};

export default page;
