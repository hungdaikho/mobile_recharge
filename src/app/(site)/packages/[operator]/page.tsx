"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchOperators } from "@/redux/operator.slice";
import PackagesOuter from "../package";
import ChargingGroup from "@/components/ui/charging_options_section/charging_group";
import { normalizeText } from "@/utils/process";
import { Operator } from "@/services/recharge.service";
export default function PackagesPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const operators = useSelector((state: any) => state.operator.operators);
    const loading = useSelector((state: any) => state.operator.loading);

    useEffect(() => {
        dispatch(fetchOperators() as any);
    }, [dispatch]);

    const operator = operators?.find((op: any) => normalizeText(op.name) === params.operator);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!operator) {
        return <div>Operator not found</div>;
    }
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
                localFixedAmounts.forEach((amount: any, index: number) => {
                    items.push({ euro: amount, lei: `${amount * 5.04} RON`, amountPay: fixedAmounts[index] })
                })
            } else {
                fixedAmounts.forEach((amount: any, index: number) => {
                    items.push({ euro: localFixedAmounts[index], lei: `${amount} ${senderCurrencyCode}`, amountPay: amount })
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
    const items = renderAmount(operator)
    const colorConfig: { color: string, bgColor: string, borderColor: string } | any = renderColor(operator.name)
    return (
        <>
            <PackagesOuter />
            <div className="max-w-7xl mx-auto p-8 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white">
                <div dangerouslySetInnerHTML={{ __html: operator.description }} />
            </div>
            <ChargingGroup
                title={operator.name}
                color={colorConfig ? colorConfig.color : operator.color ?? "rgb(86, 0, 255)"}
                borderColor={colorConfig ? colorConfig.borderColor : operator.color ?? "rgb(86, 0, 255)"}
                backgroundColor={colorConfig ? colorConfig.bgColor : operator.color ?? "rgb(86, 0, 255)"}
                items={items}
                apiCode={operator.name}
                operatorId={operator.id} fxCurrencyCode={operator.fxCurrencyCode} />
        </>
    );
}
