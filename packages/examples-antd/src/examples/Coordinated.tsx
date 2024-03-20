import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';
import type { RadioChangeEvent } from 'antd';
import { Button, Form } from 'antd';
import { useCallback } from 'react';

niceFormConfig.addAdapter(antdAdapter);

export default () => {
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
