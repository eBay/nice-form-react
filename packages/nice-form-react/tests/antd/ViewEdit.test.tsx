import React, { useCallback, useState } from 'react';
import { Form, Button, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const MOCK_INFO = {
  name: { first: 'Nate', last: 'Wang' },
  email: 'myemail@gmail.com',
  gender: 'Male',
  dateOfBirth: dayjs('2100-01-01'),
  phone: '15988888888',
  city: 'Shanghai',
  address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
};

const DateView = ({ value }: { value: Dayjs }) => value.format('MMM Do YYYY');

const ViewEdit = () => {
  const [form] = Form.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(MOCK_INFO);
  const handleFinish = useCallback((values: any) => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setPersonalInfo(values);
      setViewMode(true);
      message.success('Infomation updated.');
    }, 1500);
  }, []);

  const getMeta = () => {
    const meta: AntdNiceFormMeta = {
      columns: 2,
      disabled: pending,
      viewMode: viewMode,
      initialValues: personalInfo,
      fields: [
        {
          key: 'name.first',
          name: ['name', 'first'],
          label: 'First Name',
          required: true,
          tooltip: 'hahahah',
        },
        { key: 'name.last', label: 'Last Name', required: true },
        { key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'] },
        {
          key: 'dateOfBirth',
          label: 'Date of Birth',
          widget: 'date-picker',
          viewWidget: DateView,
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address', colSpan: 2, clear: 'left' },
        { key: 'city', label: 'City' },
        { key: 'zipCode', label: 'Zip Code' },
      ],
    };
    return meta;
  };

  return (
    <div>
      <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '800px' }}>
        <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
          Personal Infomation
          {viewMode && (
            <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
              Edit
            </Button>
          )}
        </h1>
        <NiceForm meta={getMeta()} />
        {!viewMode && (
          <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
            <Button htmlType="submit" type="primary" disabled={pending} loading={pending}>
              {pending ? 'Updating...' : 'Update'}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setViewMode(true);
              }}
              style={{ marginLeft: '15px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

describe('antd/ViewEdit', () => {
  config.addAdapter(antdAdapter);

  it('renders ViewEdit Nice Form using Antd', () => {
    render(<ViewEdit />);
    const inputGender = screen.getByText('Gender');
    expect(inputGender).toBeInTheDocument();
  });
});
