import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const MOCK_USERNAMES: {
  [key: string]: boolean;
} = {
  nate: true,
  bood: true,
  kevin: true,
};

const Validation = () => {
  const [form] = Form.useForm();
  const handleSubmit = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  const meta: AntdNiceFormMeta = {
    fields: [
      {
        key: 'username',
        label: 'Username',
        extra: 'Note: username nate, bood or kevin already exist',
        hasFeedback: true, // Show validation status icon in the right
        required: true, // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
        rules: [
          {
            validator: (_, value) => {
              // Do async validation to check if username already exists
              // Use setTimeout to emulate api call
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (MOCK_USERNAMES[value]) {
                    reject(new Error(`Username "${value}" already exists.`));
                  } else {
                    resolve(value);
                  }
                }, 1000);
              });
            },
          },
        ],
      },
      {
        key: 'password',
        label: 'Password',
        widget: 'password',
        onChange: () => {
          if (form.isFieldTouched('confirmPassword')) {
            form.validateFields(['confirmPassword']);
          }
        },
        rules: [
          // This is equivalent with "required: true"
          {
            required: true,
            message: 'Password is required',
          },
        ],
      },
      {
        key: 'confirmPassword',
        label: 'Confirm Passowrd',
        widget: 'password',
        required: true,
        rules: [
          {
            validator: (_, value) => {
              return new Promise((resolve, reject) => {
                if (value !== form.getFieldValue('password')) {
                  reject(new Error('Two passwords are inconsistent.'));
                } else {
                  resolve(value);
                }
              });
            },
          },
        ],
      },
    ],
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/Validation', () => {
  config.addAdapter(antdAdapter);

  it('renders Validation Nice Form using Antd', () => {
    render(<Validation />);
    const inputUsername = screen.getByLabelText('Username');
    expect(inputUsername).toBeInTheDocument();
  });
});
