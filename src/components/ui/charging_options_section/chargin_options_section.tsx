"use client";
import ChargingGroup from "./charging_group";
import { useSelector } from "react-redux";
import { OperatorState } from "@/redux/operator.slice";
import { Operator } from "@/services/recharge.service";

export default function ChargingOptionsSection() {
  const operators: OperatorState = useSelector((state: any) => state.operator);
  const renderAmount = (operator: Operator) => {
    const fixedAmounts = operator.fixedAmounts
    const localFixedAmounts = operator.localFixedAmounts
    const senderCurrencyCode = operator.senderCurrencyCode
    const fxRate = operator.fxRate
    const items: Array<{ euro: number | string; lei: string; amountPay: number }> = []
    if (fxRate === 1) {
      if (operator.countryCode === 'RO') {
        fixedAmounts.forEach((amount: any) => {
          items.push({ euro: amount, lei: `${amount * 5.04} RON`, amountPay: amount })
        })
      } else {
        fixedAmounts.forEach((amount: any) => {
          items.push({ euro: amount, lei: '', amountPay: amount })
        })
      }
      return items
    } else {
      if (operator.countryCode === 'RO') {
        fixedAmounts.forEach((amount: any, index: number) => {
          items.push({ euro: localFixedAmounts[index], lei: `${localFixedAmounts[index] * 5.04} RON`, amountPay: fixedAmounts[index] })
        })
      } else {
        fixedAmounts.forEach((amount: any, index: number) => {
          items.push({ euro: localFixedAmounts[index], lei: `${localFixedAmounts[index]} ${senderCurrencyCode}`, amountPay: amount })
        })
      }
      return items
    }
  };
  const renderColor = (operatorName: String) => {
    let color = 'rgb(86, 0, 255)'
    let bgColor = 'rgb(86, 0, 255)' 
    let borderColor = 'rgb(86, 0, 255)'
    switch (operatorName) {
      case 'Telekom Romania Mobile':
        color = 'rgb(226, 0, 116)'
        bgColor = 'rgb(226, 0, 116)'
        borderColor = 'rgb(189, 0, 97)'
        return { color, bgColor, borderColor }
      case 'Vodafone Romania':
        color = 'rgb(226, 31, 29)'
        bgColor = 'rgb(226, 31, 29)'
        borderColor = 'rgb(187, 24, 23)'
        return { color, bgColor, borderColor }
      case 'Orange Romania':
        color = 'rgb(255, 121, 0)'
        bgColor = 'rgb(255, 121, 0)'
        borderColor = 'rgb(222, 105, 0)'
        return { color, bgColor, borderColor }
    }
  }
  return operators.operators.map((operator) => {
    const items = renderAmount(operator)
    const colorConfig : {color: string, bgColor: string, borderColor: string} | any = renderColor(operator.name)
    return (
      <ChargingGroup
        key={operator.id}
        title={operator.name}
        color={colorConfig ? colorConfig.color : operator.color ?? "rgb(86, 0, 255)"}
        borderColor={colorConfig ? colorConfig.borderColor : operator.color ?? "rgb(86, 0, 255)"}
        backgroundColor={colorConfig ? colorConfig.bgColor : operator.color ?? "rgb(86, 0, 255)"}
        items={items}
        apiCode={operator.name}
        operatorId={operator.operatorId}
        fxCurrencyCode={operator.fxCurrencyCode}
      />
    );
  });
}
