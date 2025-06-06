"use client";
import ActivityLog from '@/components/admin/ActivityLog';
import ModuleCard from '@/components/admin/ModuleCard';
import PerformanceGauge from '@/components/admin/PerformanceGauge';
import RevenueChart from '@/components/admin/RevenueChart';
import StatisticCard from '@/components/admin/StatisticCard';
import { fetchInfo } from '@/redux/info.slice';
import { getStatistics } from '@/redux/statistics.slice';
import { rechargeService, StatisticRequest, StatisticResponse } from '@/services/recharge.service';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [statistics, setStatistics] = useState<StatisticResponse[]>([])
    const [filters, setFilters] = useState<StatisticRequest>({
        fromDate: dayjs().format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
    })

    // Lấy dữ liệu thống kê
    const initStatistics = async () => {
        const res = await dispatch(getStatistics(filters) as any)
        setStatistics(res.payload || [])
    }

    useEffect(() => {
        initStatistics()
    }, [filters])
    useEffect(() => {
        const checkInfo = async () => {
            const res = await dispatch(fetchInfo() as any);
            if (res.error) {
                router.replace("/login");
            }
        };
        checkInfo();
    }, [dispatch, router]);
    const initDataFromReloadly = async () => {
        const response = await rechargeService.initDataFromReloadly()
        console.log(response)
    }

    // Tính toán các số liệu dashboard
    const totalRecharges = statistics.filter(s => s.status === 'SUCCESS-TOPUP').length;
    const creditTransfers = totalRecharges;
    const totalTransactions = statistics.length;

    return (
        <div>
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {/* Top statistics */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-4">
                    <StatisticCard title="Total Recharges" value={totalRecharges.toLocaleString()} change="" positive />
                    <StatisticCard title="Credit Transfers" value={creditTransfers.toLocaleString()} change="" positive={false} />
                    <StatisticCard title="Transactions" value={totalTransactions.toLocaleString()} change="" positive={false} />
                    <PerformanceGauge value={70} />
                </div>
                {/* Left column: modules */}
                <div className="flex flex-col gap-2 md:gap-4">
                    <ModuleCard title="Multi-Step Recharge Form" desc="Country → Operator → Number → Amount → Payment" color="blue" />
                    <ModuleCard title="Payment Integrations" desc="Netopia (Card), Coinbase Commerce (Crypto)" color="purple" onclick={() => router.push("/admin/payment-integrations")} />
                    <ModuleCard title="Admin Dashboard" desc="Role-Based Access, Stats & Logs" color="orange" />
                    <ModuleCard title="International SIM Cards" desc="Support for Product Listings" color="green" />
                </div>
                {/* Center column: logs, chart, activity */}
                <div className="flex flex-col gap-2 md:gap-4">
                    <div className="bg-white rounded-lg md:rounded-xl shadow p-2 md:p-4">
                        <h3 className="font-semibold mb-1 md:mb-2 text-base md:text-lg">Top-Up Logs</h3>
                        {/* Placeholder for logs chart */}
                        <div className="h-16 md:h-24 bg-gray-100 rounded mb-1 md:mb-2" />
                        {/* <div className="text-xl md:text-2xl font-bold">$25,842</div> */}
                    </div>
                    <RevenueChart />
                    <ActivityLog />
                </div>
                {/* Right column: more modules */}
                <div className="flex flex-col gap-2 md:gap-4">
                    <ModuleCard title="Multi-Language" desc="English, Romanian..." color="cyan" />
                    <ModuleCard onclick={initDataFromReloadly} title="Init Data From Reloadly" desc="Get countries, operators, products, etc." color="purple" />
                    <ModuleCard onclick={() => router.push("/admin/faq-content")} title="FAQ & Content" desc="Editable by Admin" color="red" />
                    <ModuleCard title="VIP Numbers" desc="Showcase Module" color="green" />
                </div>
            </div>
        </div>
    );
}