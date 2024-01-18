import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const SingleField = () => {
  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  return (
    <Form layout="inline" onFinish={handleFinish}>
      <NiceForm
        meta={{ fields: [{ key: 'username', widgetProps: { placeholder: 'Username' } }] }}
      />
      <NiceForm
        meta={{
          fields: [
            { key: 'password', widget: 'password', widgetProps: { placeholder: 'Password' } },
          ],
        }}
      />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/SingleField', () => {
  config.addAdapter(antdAdapter);

  it('renders SingleField Nice Form using Antd', () => {
    render(<SingleField />);
    const inputUsername = screen.getByPlaceholderText('Username');
    expect(inputUsername).toBeInTheDocument();
  });
});
