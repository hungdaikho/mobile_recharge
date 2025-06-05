"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOperators } from '@/redux/operator.slice';
import HeroSection from '@/components/ui/hero';
import ChargingGroup from '@/components/ui/charging_options_section/charging_group';
import { orangeChargingData } from '@/constants/data.telecom';
import { normalizeText } from '@/utils/process';

export default function OperatorPage() {
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

    return (
        <div>
            <HeroSection bgColor={operator.color ?? 'rgb(86, 0, 255)'} />
            <ChargingGroup
                title={operator.name}
                color={operator.color}
                borderColor={operator.color ?? 'rgb(86, 0, 255)'}
                backgroundColor={operator.color ?? 'rgb(86, 0, 255)'}
                items={orangeChargingData}
                apiCode={operator.apiCode}
            />
        </div>
    );
} 