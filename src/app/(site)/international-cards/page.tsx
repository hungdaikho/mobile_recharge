import SubHeader from "@/components/layout/sub.header";
import React from "react";
import PackageList from "./package";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <SubHeader content="International Cards" />
      <PackageList />
    </>
  );
};

export default page;
