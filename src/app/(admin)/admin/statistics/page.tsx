'use client';

import { useState, useEffect } from 'react';
import { Card, DatePicker, Select, Table, Button, Row, Col, message } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { rechargeService } from '@/services/recharge.service';
import type { StatisticsParams } from '@/services/recharge.service';
import { fetchCountries } from '@/redux/country.slice';
import { fetchStatisticsSummary, fetchOperatorStatistics } from '@/redux/statistics.slice';
import type { RootState, AppDispatch } from '@/redux/store';

const { RangePicker } = DatePicker;

export default function StatisticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries } = useSelector((state: RootState) => state.country);
  const { summary, operatorStats, loading, error } = useSelector((state: RootState) => state.statistics);
  
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'year'>('day');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const fetchData = async () => {
    const [startDate, endDate] = dateRange;
    const params: StatisticsParams = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      country: selectedCountry !== 'all' ? selectedCountry : undefined,
      operator: selectedOperator !== 'all' ? selectedOperator : undefined,
      groupBy,
    };

    await Promise.all([
      dispatch(fetchStatisticsSummary(params)),
      dispatch(fetchOperatorStatistics(params))
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, selectedCountry, selectedOperator, groupBy]);

  const handleExport = async () => {
    try {
      const [startDate, endDate] = dateRange;
      const response = await rechargeService.exportStatistics({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        country: selectedCountry !== 'all' ? selectedCountry : undefined,
        operator: selectedOperator !== 'all' ? selectedOperator : undefined,
        format: 'excel'
      });

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `statistics-${startDate.format('YYYY-MM-DD')}-${endDate.format('YYYY-MM-DD')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      message.error('Failed to export statistics');
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  const operatorColumns = [
    {
      title: 'Operator',
      dataIndex: 'operatorName',
      key: 'operatorName',
      render: (name: string, record: any) => (
        <div className="flex items-center gap-2">
          <span>{name}</span>
          <span className="text-gray-500 text-sm">({record.operatorId})</span>
        </div>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'countryCode',
      key: 'countryCode',
      render: (code: string) => {
        const country = countries.find(c => c.code === code);
        return country ? (
          <div className="flex items-center gap-2">
            <img src={country.flagUrl} alt={country.name} className="w-5 h-3" />
            <span>{country.name}</span>
          </div>
        ) : code;
      },
    },
    {
      title: 'Total Transactions',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      render: (value: number) => value.toLocaleString(),
      sorter: (a: any, b: any) => a.totalTransactions - b.totalTransactions,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      sorter: (a: any, b: any) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Success Rate',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (rate: number) => (
        <div className="flex items-center gap-2">
          <span>{`${(rate * 100).toFixed(2)}%`}</span>
          <div className="w-16 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${rate * 100}%` }}
            />
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.successRate - b.successRate,
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Statistics & Reports</h1>

      <Row gutter={[16, 16]} className="mb-4 md:mb-6">
        <Col xs={24} md={8}>
          <RangePicker
            value={dateRange}
            onChange={(dates: any) => dates && setDateRange(dates)}
            disabledDate={disabledDate}
            className="w-full"
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            className="w-full"
          >
            <Select.Option value="all">All Countries</Select.Option>
            {countries.map((country) => (
              <Select.Option key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <img src={country.flagUrl} alt={country.name} className="w-5 h-3" />
                  <span>{country.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Select
            value={selectedOperator}
            onChange={setSelectedOperator}
            className="w-full"
          >
            <Select.Option value="all">All Operators</Select.Option>
            {countries.flatMap(country => 
              country.operators?.map(operator => (
                <Select.Option key={operator.id} value={operator.id}>
                  {operator.name}
                </Select.Option>
              ))
            )}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Select
            value={groupBy}
            onChange={setGroupBy}
            className="w-full"
          >
            <Select.Option value="day">Daily</Select.Option>
            <Select.Option value="month">Monthly</Select.Option>
            <Select.Option value="year">Yearly</Select.Option>
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Button type="primary" onClick={handleExport} className="w-full">
            Export
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4 md:mb-6">
        <Col xs={24} sm={8}>
          <Card title="Total Transactions" loading={loading} className="h-full">
            <div className="text-2xl md:text-3xl font-bold">
              {summary?.totalTransactions.toLocaleString() || 0}
            </div>
            <div className="text-gray-500 mt-2 text-sm md:text-base">
              {dateRange[0].format('DD/MM/YYYY')} - {dateRange[1].format('DD/MM/YYYY')}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Total Amount" loading={loading} className="h-full">
            <div className="text-2xl md:text-3xl font-bold">
              ${summary?.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}
            </div>
            <div className="text-gray-500 mt-2 text-sm md:text-base">
              {dateRange[0].format('DD/MM/YYYY')} - {dateRange[1].format('DD/MM/YYYY')}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Success Rate" loading={loading} className="h-full">
            <div className="text-2xl md:text-3xl font-bold">
              {(summary?.successRate || 0).toFixed(2)}%
            </div>
            <div className="text-gray-500 mt-2 text-sm md:text-base">
              {dateRange[0].format('DD/MM/YYYY')} - {dateRange[1].format('DD/MM/YYYY')}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Operator Statistics" className="mb-4 md:mb-6">
        <div className="w-full overflow-x-auto">
          <Table
            columns={operatorColumns}
            dataSource={operatorStats}
            rowKey="operatorId"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} operators`,
              responsive: true,
              size: 'small',
            }}
            scroll={{ x: 'max-content' }}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
} 