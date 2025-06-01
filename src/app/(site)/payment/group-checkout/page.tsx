import SubHeader from "@/components/layout/sub.header";
import React from "react";
import RechargeForm from "./payment";

const Page: React.FC = () => {
    return (
        <>
            <SubHeader content="Group Payment Steps" />
            <RechargeForm />
        </>
    );
};

export default Page;
