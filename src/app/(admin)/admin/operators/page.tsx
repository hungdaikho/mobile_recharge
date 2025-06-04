'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { rechargeService } from '@/services/recharge.service';
import type { Operator, Country, OperatorListResponse, CreateOperatorRequest } from '@/services/recharge.service';

export default function OperatorsPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchOperators = async () => {
    try {
      const response = await rechargeService.getOperators();
      setOperators(response.data);
    } catch (error) {
      message.error('Failed to fetch operators');
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await rechargeService.getCountries();
      setCountries(response.data);
    } catch (error) {
      message.error('Failed to fetch countries');
    }
  };

  useEffect(() => {
    fetchOperators();
    fetchCountries();
  }, []);

  const handleSubmit = async (values: CreateOperatorRequest) => {
    try {
      setLoading(true);
      await rechargeService.createOperator(values);
      message.success('Operator added successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchOperators();
    } catch (error) {
      message.error('Failed to add operator');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      key: 'logoUrl',
      render: (url: string) => <img src={url} alt="logo" style={{ width: 30 }} />,
    },
    {
      title: 'API Code',
      dataIndex: 'apiCode',
      key: 'apiCode',
    },
    {
      title: 'Country',
      dataIndex: 'countryCode',
      key: 'countryCode',
      render: (code: string) => {
        const country = countries.find(c => c.code === code);
        return country ? country.name : code;
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Operators Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Operator
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={operators}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Add New Operator"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Operator Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logoUrl"
            label="Logo URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apiCode"
            label="API Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="countryCode"
            label="Country"
            rules={[{ required: true }]}
          >
            <Select>
              {countries.map(country => (
                <Select.Option key={country.code} value={country.code}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 