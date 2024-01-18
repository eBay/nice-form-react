import React, { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '@ebay/nice-form-react';

import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';

export default () => {
  const [form] = Form.useForm();
  Form.useWatch('favoriteFruit', form);
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
    ],
  };

  // Push other input if choose others
  if (NiceForm.getFieldValue('favoriteFruit', meta, form) === 'Other') {
    meta.fields.push({
      key: 'otherFruit',
      label: 'Other',
    });
  }

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
