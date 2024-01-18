import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const Coordinated = () => {
  const [form] = Form.useForm();
  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  const meta: AntdNiceFormMeta = {
    fields: [
      {
        key: 'gender',
        label: 'Gender',
        widget: 'radio-group',
        options: ['Male', 'Female'],
        onChange: (evt: RadioChangeEvent) => {
          if (evt.target.value === 'Male') {
            form.setFieldsValue({ note: 'Hi, man!' });
          } else {
            form.setFieldsValue({ note: 'Hi, lady!' });
          }
        },
      },
      { key: 'note', label: 'Note' },
    ],
  };

  return (
    <Form onFinish={handleFinish} form={form}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/Coordinated', () => {
  config.addAdapter(antdAdapter);

  it('renders Coordinated Nice Form using Antd', () => {
    render(<Coordinated />);
    const inputGender = screen.getByText('Gender');
    expect(inputGender).toBeInTheDocument();
  });
});
