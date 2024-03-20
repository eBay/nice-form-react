import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';
import { Button, Form } from 'antd';
import { useCallback } from 'react';

niceFormConfig.addAdapter(antdAdapter);

export default () => {
  const [form] = Form.useForm();
  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);
  const meta: AntdNiceFormMeta = {
    columns: 1,
    fields: [
      { key: 'name.first', label: 'First Name', required: true },
      { key: 'name.last', label: 'Last Name', required: true },
      { key: 'dob', label: 'Date of Birth', widget: 'date-picker', fullWidth: true },
      {
        key: 'email',
        label: 'Email',
        rules: [{ type: 'email', message: 'Invalid email' }],
      },
      {
        key: 'security',
        label: 'Security Question',
        widget: 'select',
        placeholder: 'Select a question...',
        options: ["What's your pet's name?", 'Your nick name?'],
      },
      { key: 'answer', label: 'Security Answer' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'phone', label: 'phone' },
    ],
  };
  const meta1: AntdNiceFormMeta = {
    ...meta,
    fields: meta.fields.slice(0, 3),
  };
  const meta2: AntdNiceFormMeta = {
    ...meta,
    fields: meta.fields.slice(3, 6),
  };
  const meta3: AntdNiceFormMeta = {
    ...meta,
    fields: meta.fields.slice(6),
  };

  return (
    <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '500px' }}>
      <fieldset>
        <legend>Personal Information</legend>
        <NiceForm meta={meta1} />
      </fieldset>
      <fieldset>
        <legend>Account Information</legend>
        <NiceForm meta={meta2} />
      </fieldset>
      <fieldset>
        <legend>Contact Information</legend>
        <NiceForm meta={meta3} />
      </fieldset>
      <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 8 }}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
