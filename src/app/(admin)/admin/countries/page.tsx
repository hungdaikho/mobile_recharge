'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, TeamOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { Country, CreateCountryRequest, Operator, CreateOperatorRequest, UpdateOperatorRequest } from '@/services/recharge.service';
import {
  fetchCountries,
  createCountry,
  deleteCountry,
  createOperator,
  deleteOperator,
  updateOperator
} from '@/redux/country.slice';
import type { RootState, AppDispatch } from '@/redux/store';
import CustomCKEditor from '@/components/CKEditor';
import ColorPickerInput from '@/components/ColorPickerInput';

function stripHtml(html: string) {
  if (!html) return '';
  if (typeof window === 'undefined') {
    // SSR: fallback đơn giản loại bỏ tag
    return html.replace(/<[^>]+>/g, '');
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export default function CountriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, loading, error } = useSelector((state: RootState) => state.country);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOperatorModalVisible, setIsOperatorModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [form] = Form.useForm();
  const [operatorForm] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSubmit = async (values: CreateCountryRequest) => {
    try {
      await dispatch(createCountry(values)).unwrap();
      message.success('Country added successfully');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add country');
    }
  };

  const handleDeleteCountry = async (code: string) => {
    try {
      await dispatch(deleteCountry(code)).unwrap();
      message.success('Country deleted successfully');
    } catch (error) {
      message.error('Failed to delete country');
    }
  };

  const handleAddOperator = async (values: CreateOperatorRequest) => {
    if (!selectedCountry) return;

    try {
      await dispatch(createOperator({
        ...values,
        countryCode: selectedCountry.code
      })).unwrap();
      message.success('Operator added successfully');
      setIsOperatorModalVisible(false);
      operatorForm.resetFields();
    } catch (error) {
      message.error('Failed to add operator');
    }
  };

  const handleDeleteOperator = async (operatorId: string) => {
    try {
      await dispatch(deleteOperator(operatorId)).unwrap();
      message.success('Operator deleted successfully');
    } catch (error) {
      message.error('Failed to delete operator');
    }
  };

  const handleEditOperator = async (values: UpdateOperatorRequest) => {
    if (!editingOperator) return;

    try {
      await dispatch(updateOperator({
        id: editingOperator.id,
        data: values
      })).unwrap();
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
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Flag',
      dataIndex: 'flagUrl',
      key: 'flagUrl',
      render: (url: string) => <img src={url} alt="flag" style={{ width: 30 }} />,
    },
    {
      title: 'Operators',
      dataIndex: 'operators',
      key: 'operators',
      render: (operators: Operator[], record: Country) => (
        <div className="flex items-center gap-2">
          <span>{operators?.length || 0}</span>
          <Button
            type="primary"
            icon={<TeamOutlined />}
            size="small"
            onClick={() => {
              setSelectedCountry(record);
              setIsOperatorModalVisible(true);
            }}
          >
            Manage
          </Button>
        </div>
      ),
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
            label="Country Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Country Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="flagUrl"
            label="Flag URL"
            rules={[{ required: true }]}
          >
            <Input />
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
              name="name"
              label="Operator Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. Viettel" />
            </Form.Item>
            <Form.Item
              name="logoUrl"
              label="Logo URL"
              rules={[{ required: true }]}
            >
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item
              name="apiCode"
              label="API Code"
              rules={[{ required: true }]}
            >
              <Input placeholder="viettelcode" />
            </Form.Item>
            <Form.Item
              name="color"
              label="Color Style"
            >
              <ColorPickerInput
                value={form.getFieldValue('color') || 'rgba(0,0,0,1)'}
                onChange={v => form.setFieldsValue({ color: v })}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <CustomCKEditor
                value={form.getFieldValue('description') || ''}
                onChange={v => form.setFieldsValue({ description: v })}
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
              dataSource={selectedCountry?.operators || []}
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
                  dataIndex: 'logoUrl',
                  key: 'logoUrl',
                  width: 70,
                  render: (url: string) => <img src={url} alt="logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, background: '#f4f4f4', border: '1px solid #eee' }} />,
                },
                {
                  title: 'API Code',
                  dataIndex: 'apiCode',
                  key: 'apiCode',
                  width: 120,
                  render: (text: string) => <span className="text-gray-500">{text}</span>,
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
                  dataIndex: 'description',
                  key: 'description',
                  width: 250,
                  render: (description: string) => {
                    const plainText = stripHtml(description || '');
                    const isLong = plainText.length > 100;
                    const shortText = isLong ? plainText.slice(0, 100) + '...' : plainText;
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
                  render: (_: unknown, record: Operator) => (
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        style={{ borderRadius: 6 }}
                        onClick={() => {
                          setEditingOperator(record);
                          editForm.setFieldsValue(record);
                        }}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Delete this operator?"
                        description="Are you sure you want to delete this operator? This action cannot be undone."
                        onConfirm={() => handleDeleteOperator(record.id)}
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