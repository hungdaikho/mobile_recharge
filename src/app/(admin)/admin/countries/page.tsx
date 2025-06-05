'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, message, Popconfirm, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, TeamOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { Country, CreateCountryRequest, Operator, CreateOperatorRequest, UpdateOperatorRequest } from '@/services/recharge.service';
import {
  fetchCountries,
  deleteOperator,
  getAllCountries,
  updateCountry
} from '@/redux/country.slice';
import type { RootState, AppDispatch } from '@/redux/store';
import dynamic from 'next/dynamic';
import { fetchOperators, getOperatorsByCountry, updateOperator } from '@/redux/operator.slice';

const CustomCKEditor = dynamic(() => import('@/components/CKEditor'), {
  ssr: false,
  loading: () => <Input.TextArea rows={4} disabled />
});

const ColorPickerInput = dynamic(() => import('@/components/ColorPickerInput'), {
  ssr: false,
  loading: () => <Input disabled />
});

function stripHtml(html: string) {
  if (!html) return '';
  // Chỉ sử dụng regex để loại bỏ HTML tags
  return html.replace(/<[^>]+>/g, '');
}

export default function CountriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, loading, error } = useSelector((state: RootState) => state.country);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOperatorModalVisible, setIsOperatorModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [countrieList, setCountriesList] = useState<Country[]>([])
  const [form] = Form.useForm();
  const [operatorForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [operatorsList, setOperatorsList] = useState<Operator[]>([])
  const operator = useSelector((state: RootState) => state.operator)
  const initDataCountries = async () => {
    const response: any = await dispatch(getAllCountries())
    setCountriesList(response.payload)
  }

  useEffect(() => {
    initDataCountries()
    dispatch(fetchCountries())
    dispatch(fetchOperators())
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSubmit = async (values: CreateCountryRequest) => {
    try {
      const selectedCountryData = countrieList.find(country => country.code === values.code);
      if (!selectedCountryData) {
        message.error('Please select a valid country');
        return;
      }
      await dispatch(updateCountry({ code: values.code, active: true }))
      await dispatch(fetchCountries())
      message.success('Country added successfully');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add country');
    }
  };

  const handleDeleteCountry = async (code: string) => {
    try {
      await dispatch(updateCountry({ code: code, active: false }))
      await dispatch(fetchCountries())
      message.success('Country deleted successfully');
    } catch (error) {
      message.error('Failed to delete country');
    }
  };

  const handleAddOperator = async (values: any) => {
    if (!selectedCountry) return;

    try {
      await dispatch(updateOperator({
        id: values.operatorId,
        active: true,
        color: values.color,
        description: values.description
      })).unwrap();
      message.success('Operator added successfully');
      dispatch(fetchCountries())
      dispatch(fetchOperators())
      setIsOperatorModalVisible(false);
      operatorForm.resetFields();
    } catch (error) {
      message.error('Failed to add operator');
    }
  };

  const handleDeleteOperator = async (operatorId: string,color : string,description: string) => {
    try {
      await dispatch(updateOperator({
        id: operatorId,
        active: false,
        color: color,
        description: description
      })).unwrap();
      dispatch(fetchCountries())
      dispatch(fetchOperators())
      message.success('Operator deleted successfully');
    } catch (error) {
      message.error('Failed to delete operator');
    }
  };

  const handleEditOperator = async (values: any) => {
    if (!editingOperator) return;

    try {
      await dispatch(updateOperator({ id: values.operatorId, active: true, color: values.color, description: values.description })).unwrap();
      message.success('Operator updated successfully');
      setEditingOperator(null);
      editForm.resetFields();
    } catch (error) {
      message.error('Failed to update operator');
    }
  };
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Currency',
      dataIndex: 'currencySymbol',
      key: 'currencySymbol',
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      key: 'flag',
      render: (url: string) => <img src={url} alt="flag" style={{ width: 30 }} />,
    },
    {
      title: 'Operators',
      dataIndex: 'operators',
      key: 'operators',
      render: (_: unknown, record: Country) => {
        const countryOperators = operator.operators.filter((op: Operator) => op.countryCode === record.code);
        return (
          <div className="flex items-center gap-2">
            <span>{countryOperators.length}</span>
            <Button
              type="primary"
              icon={<TeamOutlined />}
              size="small"
              onClick={async () => {
                const operatorsList: any = await dispatch(getOperatorsByCountry(record.code));
                setOperatorsList(operatorsList.payload);
                setSelectedCountry(record);
                setIsOperatorModalVisible(true);
              }}
            >
              Manage
            </Button>
          </div>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Country) => (
        <Popconfirm
          title="Delete this country?"
          description="Are you sure you want to delete this country? This action cannot be undone."
          onConfirm={() => handleDeleteCountry(record.code)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Countries Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Country
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={countries}
        rowKey="code"
        loading={loading}
      />

      <Modal
        title="Add New Country"
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
            name="code"
            label="Select Country"
            rules={[{ required: true, message: 'Please select a country' }]}
          >
            <Select
              showSearch
              placeholder="Select a country"
              optionFilterProp="children"
              onChange={(value) => {
                const selectedCountry = countrieList.find(country => country.code === value);
                if (selectedCountry) {
                  form.setFieldsValue({
                    name: selectedCountry.name,
                    continent: selectedCountry.continent,
                    code: selectedCountry.code,
                    currencyName: selectedCountry.currencyName,
                    currencySymbol: selectedCountry.currencySymbol,
                    flag: selectedCountry.flag,
                    callingCodes: selectedCountry.callingCodes,
                  });
                }
              }}
            >
              {countrieList.map((country) => (
                <Select.Option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Country Name"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="continent"
            label="Continent"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="code"
            label="Country Code"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="currencyName"
            label="Currency Name"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="currencySymbol"
            label="Currency Symbol"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="flag"
            label="Flag URL"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Manage Operators - ${selectedCountry?.name}`}
        open={isOperatorModalVisible}
        onCancel={() => {
          setIsOperatorModalVisible(false);
          setSelectedCountry(null);
          setEditingOperator(null);
        }}
        footer={null}
        width={900}
        styles={{ body: { padding: 24, borderRadius: 12, background: '#fafbfc' } }}
        style={{ borderRadius: 16 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Add New Operator</h3>
          <Form
            form={operatorForm}
            layout="vertical"
            onFinish={handleAddOperator}
            style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 4px #eee' }}
          >
            <Form.Item
              name="operatorId"
              label="Select Operator"
              rules={[{ required: true, message: 'Please select an operator' }]}
            >
              <Select
                showSearch
                placeholder="Select an operator"
                optionFilterProp="children"
                onChange={(value) => {
                  const selectedOperator = operatorsList.find(operator => operator.id === value);
                  if (selectedOperator) {
                    operatorForm.setFieldsValue({
                      name: selectedOperator.name,
                      logoUrl: selectedOperator.logoUrls[0],
                      operatorId: selectedOperator.id,
                      color: selectedOperator.color,
                      description: selectedOperator.status
                    });
                  }
                }}
              >
                {operatorsList
                  .filter(operator => operator.countryCode === selectedCountry?.code)
                  .map((operator) => (
                    <Select.Option key={operator.id} value={operator.id} >
                      {operator.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Operator Name"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="logoUrl"
              label="Logo URL"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="operatorId"
              label="Operator ID"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="color"
              label="Color Style"
            >
              <ColorPickerInput
                value={operatorForm.getFieldValue('color') || 'rgba(0,0,0,1)'}
                onChange={v => operatorForm.setFieldsValue({ color: v })}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <CustomCKEditor
                value={operatorForm.getFieldValue('description') || ''}
                onChange={v => operatorForm.setFieldsValue({ description: v })}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ borderRadius: 6, minWidth: 120 }}>
                Add Operator
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Existing Operators</h3>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #eee', padding: 8 }}>
            <Table
              dataSource={operator.operators.filter((op: Operator) => op.countryCode === selectedCountry?.code) || []}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  width: 120,
                  render: (text: string) => <span className="font-medium">{text}</span>,
                },
                {
                  title: 'Logo',
                  dataIndex: 'logoUrls',
                  key: 'logoUrls',
                  width: 70,
                  render: (urls: string[]) => <img src={urls[0]} alt="logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, background: '#f4f4f4', border: '1px solid #eee' }} />,
                },
                {
                  title: 'API Code',
                  dataIndex: 'operatorId',
                  key: 'operatorId',
                  width: 120,
                  render: (text: number) => <span className="text-gray-500">{text}</span>,
                },
                {
                  title: 'Color',
                  dataIndex: 'color',
                  key: 'color',
                  width: 40,
                  render: (color: string) => (
                    <span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 6, background: color || '#eee', border: '1px solid #ccc', margin: '0 auto' }} />
                  ),
                },
                {
                  title: 'Description',
                  dataIndex: 'status',
                  key: 'status',
                  width: 250,
                  render: (status: string) => {
                    const isLong = status?.length > 100;
                    const shortText = isLong ? status?.slice(0, 100) + '...' : status;
                    return (
                      <div style={{ maxWidth: 230, whiteSpace: 'pre-line', wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {shortText}
                      </div>
                    );
                  },
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  width: 140,
                  align: 'center',
                  render: (_: unknown, record: any) => (
    
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        style={{ borderRadius: 6 }}
                        onClick={() => {
                          console.log(record);
                    
                          setEditingOperator(record);
                          editForm.setFieldsValue({
                            name: record.name,
                            logoUrl: record.logoUrls[0],
                            operatorId: record.id,
                            color: record.color,
                            description: record.status
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Delete this operator?"
                        description="Are you sure you want to delete this operator? This action cannot be undone."
                        onConfirm={() => handleDeleteOperator(record.id,record.color ?? '',record.description ?? '')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                          style={{ borderRadius: 6 }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  ),
                },
              ]}
              scroll={{ x: 700 }}
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Operator"
        open={!!editingOperator}
        onCancel={() => {
          setEditingOperator(null);
          editForm.resetFields();
        }}
        footer={null}
        width={700}
        styles={{ body: { padding: 24, borderRadius: 12, background: '#fafbfc' } }}
        style={{ borderRadius: 16 }}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditOperator}
          style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 4px #eee' }}
        >
          <Form.Item
            name="name"
            label="Operator Name"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="logoUrl"
            label="Logo URL"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="operatorId"
            label="Operator Id"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color Style"
          >
            <ColorPickerInput
              value={editForm.getFieldValue('color') || 'rgba(0,0,0,1)'}
              onChange={v => editForm.setFieldsValue({ color: v })}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <CustomCKEditor
              value={editForm.getFieldValue('description') || ''}
              onChange={v => editForm.setFieldsValue({ description: v })}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ borderRadius: 6, minWidth: 120 }}>
              Update Operator
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 