'use client';

import { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Switch, message, Tabs, Select, Modal, Table, Tag, Space } from 'antd';
import { SaveOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchApiCredentials, createApiCredential, updateApiCredential, deleteApiCredential } from '@/redux/api-credentials.slice';
import { ApiCredential, CreateApiCredentialRequest } from '@/services/recharge.service';

const { Option } = Select;

export default function PaymentSettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { credentials, loading, error } = useSelector((state: RootState) => state.apiCredentials);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<ApiCredential | null>(null);
  const [selectedType, setSelectedType] = useState<'PAYMENT' | 'TOPUP' | 'ALL'>('ALL');
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchApiCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const filteredCredentials = selectedType === 'ALL' 
    ? credentials 
    : credentials.filter(cred => cred.type === selectedType);

  const handleAddCredential = () => {
    setIsAddModalVisible(true);
  };

  const handleEditCredential = (credential: ApiCredential) => {
    setSelectedCredential(credential);
    editForm.setFieldsValue({
      ...credential,
      mode: credential.metadata?.mode,
      provider: credential.metadata?.provider,
    });
    setIsEditModalVisible(true);
  };

  const handleDeleteCredential = async (id: string) => {
    try {
      await dispatch(deleteApiCredential(id)).unwrap();
      message.success('API credential deleted successfully');
    } catch (error) {
      message.error('Failed to delete API credential');
    }
  };

  const handleAddSubmit = async (values: any) => {
    try {
      const data: CreateApiCredentialRequest = {
        name: values.name,
        type: values.type,
        apiKey: values.apiKey,
        apiSecret: values.apiSecret,
        baseUrl: values.baseUrl,
        metadata: {
          mode: values.mode,
          provider: values.provider,
        },
      };
      await dispatch(createApiCredential(data)).unwrap();
      message.success('API credential added successfully');
      setIsAddModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add API credential');
    }
  };

  const handleEditSubmit = async (values: any) => {
    if (!selectedCredential) return;
    try {
      const data = {
        name: values.name,
        apiKey: values.apiKey,
        apiSecret: values.apiSecret,
        baseUrl: values.baseUrl,
        metadata: {
          mode: values.mode,
          provider: values.provider,
        },
      };
      await dispatch(updateApiCredential({ id: selectedCredential.id, data })).unwrap();
      message.success('API credential updated successfully');
      setIsEditModalVisible(false);
      editForm.resetFields();
    } catch (error) {
      message.error('Failed to update API credential');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'PAYMENT' ? 'blue' : 'green'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Provider',
      dataIndex: ['metadata', 'provider'],
      key: 'provider',
      render: (provider: string | undefined) => (
        <Tag color="purple">
          {provider ? provider.toUpperCase() : 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'Mode',
      dataIndex: ['metadata', 'mode'],
      key: 'mode',
      render: (mode: string | undefined) => (
        <Tag color={mode === 'live' ? 'red' : 'orange'}>
          {mode ? mode.toUpperCase() : 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ApiCredential) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditCredential(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCredential(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const renderCredentialForm = (form: any, isEdit = false) => (
    <Form
      form={form}
      layout="vertical"
      onFinish={isEdit ? handleEditSubmit : handleAddSubmit}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter credential name" />
      </Form.Item>
      {!isEdit && (
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select type">
            <Option value="PAYMENT">Payment</Option>
            <Option value="TOPUP">Topup</Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name="provider"
        label="Provider"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select provider">
          <Option value="stripe">Stripe</Option>
          <Option value="paypal">PayPal</Option>
          <Option value="reloadly">Reloadly</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="apiKey"
        label="API Key"
        rules={[{ required: true }]}
      >
        <Input.Password placeholder="Enter API key" />
      </Form.Item>
      <Form.Item
        name="apiSecret"
        label="API Secret"
        rules={[{ required: true }]}
      >
        <Input.Password placeholder="Enter API secret" />
      </Form.Item>
      <Form.Item
        name="baseUrl"
        label="Base URL"
      >
        <Input placeholder="Enter base URL (optional)" />
      </Form.Item>
      <Form.Item
        name="mode"
        label="Mode"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select mode">
          <Option value="sandbox">Sandbox</Option>
          <Option value="live">Live</Option>
        </Select>
      </Form.Item>
    </Form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Credentials</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: 200 }}
            placeholder="Filter by type"
          >
            <Option value="ALL">All Types</Option>
            <Option value="PAYMENT">Payment</Option>
            <Option value="TOPUP">Topup</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddCredential}
          >
            Add Credential
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredCredentials}
          loading={loading}
          rowKey="id"
        />
      </Card>

      <Modal
        title="Add API Credential"
        open={isAddModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        {renderCredentialForm(form)}
      </Modal>

      <Modal
        title="Edit API Credential"
        open={isEditModalVisible}
        onOk={() => editForm.submit()}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        width={600}
      >
        {renderCredentialForm(editForm, true)}
      </Modal>
    </div>
  );
} 