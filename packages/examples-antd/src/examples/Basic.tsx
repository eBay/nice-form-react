import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import type { AntdNiceFormMeta } from '@ebay/nice-form-react/lib/esm/adapters/antdAdapter';
import { Button, Form, Rate } from 'antd';

niceFormConfig.addAdapter(antdAdapter);

const Basic = () => {
  const [form] = Form.useForm();
  const updateOnChange = NiceForm.useUpdateOnChange(['checkbox']);
  const options = ['Apple', 'Orange', 'Banana'];
  const meta: AntdNiceFormMeta = {
    columns: 1,
    initialValues: { obj: { input: 12 } },
    layout: 'horizontal',
    wrapperProps: {
      labelCol: {
        span: 8,
      },
    },
    fields: [
      {
        key: 'obj.input',
        name: ['obj', 'input'],
        label: 'Input',
        required: true,
        tooltip: 'Name',
        help: 'Name',
      },
      {
        key: 'checkbox',
        label: 'Checkbox',
        widget: 'checkbox',
        initialValue: true,
      },
      {
        key: 'rating',
        label: 'Rating',
        widget: Rate,
        initialValue: 2,
        condition: () => {
          return NiceForm.getFieldValue('checkbox', meta, form);
        },
      },
      { key: 'switch', label: 'Switch', widget: 'switch', initialValue: true },
      {
        key: 'select',
        label: 'Select',
        widget: 'select',
        required: true,
        options,
      },
      {
        key: 'checkbox-group',
        label: 'Checkbox Group',
        widget: 'checkbox-group',
        options,
      },
      {
        key: 'radio-group',
        label: 'Radio Group',
        widget: 'radio-group',
        options,
      },
      {
        key: 'radio-button-group',
        label: 'Radio Button Group',
        widget: 'radio-group',
        widgetProps: {
          optionType: 'button',
          buttonStyle: 'solid',
        },
        options,
      },
      {
        key: 'password',
        label: 'Password',
        widget: 'password',
        required: true,
        rules: [{ required: true, message: 'password is required' }],
      },
      { key: 'textarea', label: 'Textarea', widget: 'textarea' },
      { key: 'number', label: 'Number', widget: 'number', fullWidth: true },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker', fullWidth: true },
    ],
  };
  const handleFinish = (values: any) => {
    form.validateFields().then(() => {
      console.log('on finish: ', values);
    });
  };
  return (
    <Form form={form} onValuesChange={updateOnChange} onFinish={handleFinish}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Basic;
