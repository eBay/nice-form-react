import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import { Button, Form } from 'antd';
import { useCallback } from 'react';

niceFormConfig.addAdapter(antdAdapter);

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
