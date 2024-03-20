import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import { Button, Form } from 'antd';
import { useCallback } from 'react';

niceFormConfig.addAdapter(antdAdapter);

export default () => {
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
      { key: 'items', label: 'Items', widget: 'form-list' },
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
