"use client";
import {
  orangeChargingData,
} from "@/constants/data.telecom";
import ChargingGroup from "./charging_group";
import { useSelector } from "react-redux";
import { OperatorState } from "@/redux/operator.slice";

export default function ChargingOptionsSection() {
  const operators: OperatorState = useSelector((state: any) => state.operator);
  return operators.operators.map((operator) => {
    return (
      <ChargingGroup
        title={operator.name}
        color={operator.color ?? "rgb(86, 0, 255)"}
        borderColor={operator.color ?? "rgb(86, 0, 255)"}
        backgroundColor={operator.color ?? "rgb(86, 0, 255)"}
        items={orangeChargingData}
        apiCode={operator.apiCode}
      />
    );
  });
}
