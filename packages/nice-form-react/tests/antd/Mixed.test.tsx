import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const Mixed = () => {
  const [form] = Form.useForm();
  const handleFinish = useCallback((values: any) => console.log('Submit: ', values), []);
  const meta1 = {
    fields: [
      { key: 'name.first', label: 'First Name', required: true },
      { key: 'name.last', label: 'Last Name', required: true },
      { key: 'dob', label: 'Date of Birth', widget: 'date-picker' },
    ],
  };
  const meta2 = {
    fields: [
      {
        key: 'email',
        label: 'Email',
        rules: [{ type: 'email', message: 'Invalid email' }],
      },
    ],
  };

  const prefixMeta = {
    fields: [
      {
        key: 'prefix',
        options: ['+86', '+87'],
        widget: 'select',
        noStyle: true,
        widgetProps: {
          style: { width: 70 },
          noStyle: true,
        },
      },
    ],
  };
  const prefixSelector = <NiceForm meta={prefixMeta} />;

  return (
    <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '500px' }}>
      <NiceForm meta={meta1} />
      <Form.Item
        label="Phone Number"
        name="phone"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <NiceForm meta={meta2} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/Mixed', () => {
  config.addAdapter(antdAdapter);

  it('renders Mixed Nice Form using Antd', () => {
    render(<Mixed />);
    const inputFirstName = screen.getByLabelText('First Name');
    expect(inputFirstName).toBeInTheDocument();
  });
});
