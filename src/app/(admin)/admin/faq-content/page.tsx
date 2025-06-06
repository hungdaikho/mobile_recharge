"use client"
import { createFaqContent, deleteFaqContent, getFaqContent, IFaq, updateFaqContent } from '@/redux/faq.slice'
import { RootState } from '@/redux/store'
import { CreateFaqContentRequest, UpdateFaqContentRequest } from '@/services/recharge.service'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomCKEditor from '@/components/CKEditor'
import { Table, Button, Modal, Form, Input, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const FaqAdminPage = () => {
  const faq: Array<IFaq> = useSelector((state: RootState) => state.faq)
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form] = Form.useForm()

  const initFaqData = async () => {
    await dispatch(getFaqContent() as any)
  }
  useEffect(() => {
    initFaqData()
  }, [])

  const openAddModal = () => {
    setEditId(null)
    form.setFieldsValue({ question: '', solve: '' })
    setModalOpen(true)
  }
  const openEditModal = (faq: IFaq) => {
    setEditId(faq.id)
    form.setFieldsValue({ question: faq.question, solve: faq.solve })
    setModalOpen(true)
  }
  const handleDelete = async (id: string) => {
    await dispatch(deleteFaqContent(id) as any)
    message.success('FAQ deleted successfully!')
    initFaqData()
  }
  const handleSubmit = async (values: { question: string; solve: string }) => {
    if (!values.question.trim() || !values.solve.trim()) return
    if (editId) {
      await dispatch(updateFaqContent({ id: editId, data: values }) as any)
      message.success('FAQ updated successfully!')
    } else {
      await dispatch(createFaqContent(values) as any)
      message.success('FAQ created successfully!')
    }
    setModalOpen(false)
    form.resetFields()
    setEditId(null)
    initFaqData()
  }

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: (text: string) => <span className="font-medium text-gray-900">{text}</span>,
    },
    {
      title: 'Answer',
      dataIndex: 'solve',
      key: 'solve',
      render: (html: string) => <div style={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: html }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as const,
      render: (_: any, record: IFaq) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)} type="primary" size="small">Edit</Button>
          <Popconfirm
            title="Delete this FAQ?"
            description="Are you sure you want to delete this FAQ? This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQ Content Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>Add New</Button>
      </div>
      <Table
        columns={columns}
        dataSource={faq}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: 'No FAQ found' }}
        bordered
      />
      <Modal
        title={editId ? 'Edit FAQ' : 'Add New FAQ'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); form.resetFields(); setEditId(null) }}
        onOk={() => form.submit()}
        okText={editId ? 'Save' : 'Add'}
        cancelText="Cancel"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ question: '', solve: '' }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please enter the question' }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="solve"
            label="Answer"
            rules={[{ required: true, message: 'Please enter the answer' }]}
          >
            <CustomCKEditor
              value={form.getFieldValue('solve') || ''}
              onChange={val => form.setFieldsValue({ solve: val })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FaqAdminPage