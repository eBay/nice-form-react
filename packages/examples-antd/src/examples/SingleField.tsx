import { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '@ebay/nice-form-react';

export default () => {
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
