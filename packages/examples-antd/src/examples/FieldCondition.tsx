import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';
import { Button, Form } from 'antd';

niceFormConfig.addAdapter(antdAdapter);

export default () => {
  const [form] = Form.useForm();
  const favoriteFruit = Form.useWatch('favoriteFruit', form);
  const handleFinish = (values: unknown) => {
    console.log('Submit: ', values);
  };
  const meta: AntdNiceFormMeta = {
    fields: [
      {
        key: 'favoriteFruit',
        label: 'Favorite Fruit',
        widget: 'radio-group',
        options: ['Apple', 'Orange', 'Other'],
        initialValue: 'Apple',
      },
      {
        key: 'otherFruit',
        label: 'Other',
        condition: () => favoriteFruit === 'Other',
      },
    ],
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
