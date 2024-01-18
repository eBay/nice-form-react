import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const Simple = () => {
  const meta = {
    layout: 'horizontal',
    columns: 1,

    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
    ],
  };

  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  return (
    <Form onFinish={handleFinish} layout="horizontal">
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/Simple', () => {
  config.addAdapter(antdAdapter);

  it('renders Simple Nice Form using Antd', () => {
    render(<Simple />);
    const inputPasswd = screen.getByLabelText('Password');
    expect(inputPasswd).toBeInTheDocument();
  });
});
