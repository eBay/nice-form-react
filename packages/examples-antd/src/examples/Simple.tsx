import { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '@ebay/nice-form-react';

export default () => {
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
