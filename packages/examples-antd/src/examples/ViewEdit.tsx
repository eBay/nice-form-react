import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';
import { Button, Form, message } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

niceFormConfig.addAdapter(antdAdapter);

const MOCK_INFO = {
  name: { first: 'Nate', last: 'Wang' },
  email: 'myemail@gmail.com',
  gender: 'Male',
  dateOfBirth: dayjs('2100-01-01'),
  phone: '15988888888',
  city: 'Shanghai',
  address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
};

export default () => {
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
      message.success('Information updated.');
    }, 1500);
  }, []);

  const getMeta = () => {
    const meta: AntdNiceFormMeta = {
      columns: 2,
      fields: [
        { key: 'firstName', label: ' Name', required: true },
        { key: 'lastName', label: 'Last Name', required: true },
        {
          key: 'gender',
          label: 'Gender',
          widget: 'radio-group',
          options: ['Male', 'Female'],
        },
        {
          key: 'dateOfBirth',
          label: 'Date of Birth',
          widget: 'date-picker',
          fullWidth: true,
        },
        { key: 'address', label: 'Address', colSpan: 2 },
      ],
    };
    return meta;
  };

  return (
    <div>
      <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '600px' }}>
        <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
          Personal Information
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
