"use client"
import { fetchCountries } from '@/redux/country.slice'
import { fetchOperators } from '@/redux/operator.slice'
import { getStatistics } from '@/redux/statistics.slice'
import { RootState } from '@/redux/store'
import { Country, Operator, StatisticRequest, StatisticResponse } from '@/services/recharge.service'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Select, Card, Statistic, Table } from 'antd'
import 'antd/dist/reset.css'

const { RangePicker } = DatePicker

const StatisticPage = () => {
  const dispatch = useDispatch()
  const country: Array<Country> = useSelector((state: RootState) => state.country.countries)
  const operator: Array<Operator> = useSelector((state: RootState) => state.operator.operators)
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
    dispatch(fetchCountries() as any)
    dispatch(fetchOperators() as any)
  }, [])

  useEffect(() => {
    initStatistics()
  }, [filters])

  // Tính toán thống kê tổng
  const totalTransactions = statistics.length
  const totalAmountTopup = statistics
    .filter(s => s.status === 'SUCCESS-TOPUP')
    .reduce((sum, s) => sum + Number(s.amount), 0)
  const totalAmountStripe = statistics
    .filter(s => s.paymentMethod === 'STRIPE' && s.status !== 'FAILED')
    .reduce((sum, s) => sum + Number(s.amount), 0)
  const successCount = statistics.filter(s => s.status === 'SUCCESS-TOPUP').length
  const successRate = totalTransactions ? (successCount / totalTransactions) * 100 : 0

  // Dữ liệu cho bảng chi tiết theo operator
  const operatorMap = new Map<string, {
    operator: string,
    country: string,
    count: number,
    topup: number,
    stripe: number,
    successCount: number
  }>()
  statistics.forEach(s => {
    const key = `${s.operator}-${s.country}`
    if (!operatorMap.has(key)) {
      operatorMap.set(key, {
        operator: typeof s.operator === 'string' ? s.operator : operator.find(o => o.operatorId === s.operator)?.name || '',
        country: country.find(c => c.code === s.country)?.name || s.country,
        count: 0,
        topup: 0,
        stripe: 0,
        successCount: 0
      })
    }
    const item = operatorMap.get(key)!
    item.count += 1
    if (s.status === 'SUCCESS-TOPUP') {
      item.topup += Number(s.amount)
      item.successCount += 1
    }
    if (s.paymentMethod === 'STRIPE' && s.status !== 'FAILED') item.stripe += Number(s.amount)
  })
  const tableData = Array.from(operatorMap.values()).map((item, idx) => ({
    key: idx,
    ...item,
    topup: `₫${item.topup.toLocaleString()}`,
    stripe: `₫${item.stripe.toLocaleString()}`,
    successRate: item.count ? ((item.successCount / item.count) * 100).toFixed(2) : '0.00'
  }))

  // Cột bảng
  const columns = [
    { title: 'Operator', dataIndex: 'operator', key: 'operator' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Transactions', dataIndex: 'count', key: 'count' },
    { title: 'Total Topup Amount', dataIndex: 'topup', key: 'topup' },
    { title: 'Total Stripe Amount', dataIndex: 'stripe', key: 'stripe' },
    { title: 'Success Rate', dataIndex: 'successRate', key: 'successRate', render: (v: string) => `${v}%` },
  ]

  // Filtered operators based on selected country
  const filteredOperators = filters.country
    ? operator.filter(o => o.countryCode === filters.country)
    : operator

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics & Reports</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <RangePicker
          value={
            filters.fromDate && filters.toDate
              ? [dayjs(filters.fromDate), dayjs(filters.toDate)]
              : undefined
          }
          onChange={(range) => setFilters({
            ...filters,
            fromDate: range && range[0] ? range[0].format('YYYY-MM-DD') : '',
            toDate: range && range[1] ? range[1].format('YYYY-MM-DD') : ''
          })}
        />
        <Select
          allowClear
          placeholder="All Countries"
          value={filters.country}
          onChange={country => setFilters({ ...filters, country })}
          options={country.map(c => ({ label: c.name, value: c.code }))}
          style={{ width: 180 }}
        />
        <Select
          allowClear
          placeholder="All Operators"
          value={filters.operator}
          onChange={operator => setFilters({ ...filters, operator })}
          options={filteredOperators.map(o => ({ label: o.name, value: o.operatorId }))}
          style={{ width: 180 }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <Statistic title="Total Transactions" value={totalTransactions} />
        </Card>
        <Card>
          <Statistic title="Total Topup Amount" value={totalAmountTopup} prefix="₫" precision={0} />
        </Card>
        <Card>
          <Statistic title="Total Stripe Amount" value={totalAmountStripe} prefix="₫" precision={0} />
        </Card>
        <Card>
          <Statistic title="Success Rate" value={successRate} suffix="%" precision={2} />
        </Card>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        bordered
        className="bg-white"
      />
    </div>
  )
}

export default StatisticPage