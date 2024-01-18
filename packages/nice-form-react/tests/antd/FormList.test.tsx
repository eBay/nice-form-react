import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const FormList = () => {
  const meta = {
    layout: 'horizontal',
    columns: 1,
    initialValues: {
      username: 'username',
      items: [''],
    },
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'items', label: 'Items', widget: 'form-list' },
      {
        key: 'cities',
        label: 'Cities',
        widget: 'form-list',
        listItemMeta: {
          widget: 'select',
          options: ['Beijing', 'Shanghai', 'Nanjing'],
        },
      },
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

describe('antd/FormList', () => {
  config.addAdapter(antdAdapter);

  it('renders FormList Nice Form using Antd', () => {
    render(<FormList />);
    const inputItems = screen.getByText('Items');
    expect(inputItems).toBeInTheDocument();
  });
});
