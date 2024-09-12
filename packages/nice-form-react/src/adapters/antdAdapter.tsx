import { ReactNode } from 'react';
import {
  Form,
  FormItemProps,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  FormInstance,
  Button,
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { FormListFieldData, FormListOperation } from 'antd/es/form';
import {
  NiceFormMeta,
  NiceFormAdapter,
  NiceFormField,
  NiceFormWidgetProps,
  NormalizedFormField,
  NormalizedFormMeta,
} from '../types';
import NiceForm from '../NiceForm';
import { without, niceFormFieldStdKeys } from '../utils';
import { CSSProperties } from 'react';
import { Rule } from 'antd/es/form';

export interface AntdNiceFormField extends NiceFormField, Omit<FormItemProps, 'children' | 'name'> {
  getListItemMeta?: (
    fields: FormListFieldData[],
    { add, remove, move }: FormListOperation,
    { errors }: { errors: any[] },
    index: number,
  ) => any;
  addItemButtonLabel?: ReactNode;
}

export interface AntdNiceFormMeta extends NiceFormMeta {
  fields: AntdNiceFormField[];
}

const isNamePathEqual = (n1: NamePath, n2: NamePath) => {
  if (Array.isArray(n1) && Array.isArray(n2) && JSON.stringify(n1) === JSON.stringify(n2)) {
    return true;
  }
  return n1 === n2;
};

const antdAdapter: NiceFormAdapter = {
  widgetMap: {
    input: { widget: Input },
    text: { widget: Input },
    password: { widget: Input.Password },
    textarea: { widget: Input.TextArea },
    number: { widget: InputNumber },

    //@ts-ignore
    'date-picker': { widget: DatePicker },
    radio: { widget: Radio },
    'radio-group': {
      widget: Radio.Group,
      metaConverter: ({ field }) => {
        const RadioComp = Radio;
        if (field.options && !field.widgetProps?.children) {
          return {
            ...field,
            widgetProps: {
              ...field.widgetProps,
              name: field.key,
              children: field.options?.map((opt) => (
                <RadioComp value={opt.value} key={opt.value} {...opt.props}>
                  {opt.label}
                </RadioComp>
              )),
            },
          };
        }
        return field;
      },
    },
    checkbox: {
      widget: Checkbox,
      metaConverter: ({ field }) => {
        return {
          ...field,
          valuePropName: 'checked',
        };
      },
    },
    switch: {
      widget: Switch,
      metaConverter: ({ field }) => {
        return {
          ...field,
          valuePropName: 'checked',
        };
      },
    },
    'checkbox-group': {
      widget: Checkbox.Group,
      metaConverter: ({ field }) => {
        if (field.options && !field.children) {
          return {
            ...field,
            widgetProps: {
              ...field.widgetProps,
              children: field.options?.map((opt) => (
                <Checkbox value={opt.value} key={opt.value} {...opt.props}>
                  {opt.label}
                </Checkbox>
              )),
            },
          };
        }
        return field;
      },
    },
    select: {
      widget: Select,
      metaConverter: ({ field }) => {
        if (field.options && !field.children) {
          return {
            ...field,
            widgetProps: {
              ...field.widgetProps,
              children: field.options?.map((opt) => (
                //@ts-ignore
                <Select.Option
                  label={opt.label}
                  value={opt.key || opt.value}
                  key={opt.key || opt.value}
                  disabled={opt.disabled}
                  {...opt.props}
                >
                  {opt.children || opt.label}
                </Select.Option>
              )),
            },
          };
        }
        return field;
      },
    },
    'form-list': {
      widget: Form.List,
      metaConverter: ({ field }: { field: AntdNiceFormField }) => {
        return {
          ...field,
          widgetProps: {
            ...field.widgetProps,
            name: field.name,
            children: (
              fields: FormListFieldData[],
              { add, remove, move }: FormListOperation,
              { errors }: { errors: any[] },
            ): ReactNode => {
              const meta = {
                fields: fields.map((f, i) => ({
                  ...f,
                  name: [f.name],
                  style: {
                    marginBottom: '10px',
                  },
                  extraNode: (
                    <>
                      {fields.length > 1 ? (
                        <span
                          style={{
                            position: 'absolute',
                            right: '-24px',
                            top: '9px',
                            color: 'red',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: '1px solid red',
                            textAlign: 'center',
                            cursor: 'pointer',
                            lineHeight: '12px',
                          }}
                          className="dynamic-delete-button"
                          onClick={() => remove(f.name)}
                        >
                          -
                        </span>
                      ) : null}
                    </>
                  ),
                  ...(field.listItemMeta || {}),
                  ...(field.getListItemMeta
                    ? field.getListItemMeta(fields, { add, move, remove }, { errors }, i)
                    : {}),
                })),
              };
              return (
                <>
                  {field.hasOwnProperty('listTop') ? field.listTop : null}
                  <NiceForm meta={meta} />
                  {field.hasOwnProperty('listBottom') ? (
                    field.listBottom
                  ) : (
                    <Button type="link" onClick={() => add()} {...(field.addItemButtonProps || {})}>
                      {field.addItemButtonLabel || '+ Add Item'}
                    </Button>
                  )}
                </>
              );
            },
          },
        };
      },
    },
  },
  metaConverter: (meta: NormalizedFormMeta) => {
    const newMeta: NormalizedFormMeta = {
      ...meta,
      fields: meta.fields.map((field) => {
        // Besides stdFieldKeys, all other properties are passed to wrapperProps.
        const newField = {
          ...field,
          widgetProps: field.widgetProps || {},
        };

        const rules = (field as AntdNiceFormField).rules || [];
        if (field.required && !rules.find((r: Rule) => (r as any).required)) {
          rules.unshift({ required: true });
        }

        (newField as AntdNiceFormField).rules = rules;

        if (newField.widgetProps?.fullWidth) {
          if (!newField.widgetProps?.style) {
            newField.widgetProps.style = {};
          }
          newField.widgetProps.style.width = '100%';
        }
        // Normalize label col
        if (!(newField as AntdNiceFormField).labelCol && meta.layout !== 'vertical') {
          const labelWidth = meta.labelWidth || 8;
          const span = (labelWidth as number) / (field.colSpan || 1);
          (newField as AntdNiceFormField).labelCol = { span };
        }

        return newField;
      }),
    };
    return newMeta;
  },

  // This ensures you can always get form value before form is connected/renderred
  getFieldValue: (fieldName: NamePath, meta: NiceFormMeta, form: FormInstance) => {
    const isFormConnected = Object.keys(form.getFieldsValue(true)).length > 0;
    if (isFormConnected) return form.getFieldValue(fieldName);

    const field = meta.fields.find(
      (f) => f.key === fieldName || (f.name !== undefined && isNamePathEqual(f.name, fieldName)),
    );
    return field?.initialValue;
  },
  renderField: ({ meta, field }: { meta: AntdNiceFormMeta; field: AntdNiceFormField }) => {
    if (field.shouldUpdate) {
      return (
        <Form.Item shouldUpdate={field.shouldUpdate} noStyle>
          {() =>
            antdAdapter.renderField!({
              meta,
              field: { ...field, shouldUpdate: false } as NormalizedFormField,
            })
          }
        </Form.Item>
      );
    }
    if (field.dependencies) {
      return (
        <Form.Item dependencies={field.dependencies} noStyle>
          {() =>
            antdAdapter.renderField!({
              meta,
              field: { ...field, dependencies: undefined } as NormalizedFormField,
            })
          }
        </Form.Item>
      );
    }

    const FormWidget = field.widget;
    const ViewWidget = field.viewWidget;
    const viewMode = meta.viewMode || field.viewMode;
    const widgetProps: NiceFormWidgetProps = {
      ...field.widgetProps,
    };

    // Handle full width
    if (field.fullWidth) {
      if (!widgetProps?.style) {
        widgetProps.style = {};
      }
      widgetProps.style.width = '100%';
    }

    const content = viewMode ? (
      field.renderView ? (
        field.renderView!(field.initialValue, { field, meta })
      ) : (
        //@ts-ignore
        <ViewWidget {...field.viewWidgetProps} value={field.initialValue}></ViewWidget>
      )
    ) : (
      //@ts-ignore
      <FormWidget {...widgetProps} />
    );

    const wrapperProps: FormItemProps = {
      ...meta.wrapperProps,
      ...without(field, [
        ...niceFormFieldStdKeys,
        'getListItemMeta',
        'listItemMeta',
        'addItemButtonLabel',
        'addItemButtonProps',
      ]),
      className: field.className || '',
      style: field.style || ({} as CSSProperties),
      // NOTE: use valuePropName at view mode so that UI is updated if initialValues changed at view mode.
      valuePropName: field.valuePropName || (viewMode ? 'initialValue' : 'value'),
    };

    // These std keys are passed to Form.Item directly
    ['initialValue', 'help', 'required', 'label', 'name'].forEach((k) => {
      wrapperProps[k] = field[k];
    });

    if (meta.viewMode) {
      // For view mode, user usually override below styles in css
      wrapperProps.className += ' nice-form-react-item-view-mode';
      wrapperProps.style!.marginBottom = 5;
      field!.widgetProps!.required = false;
      wrapperProps.labelAlign = 'left';
    }

    return <Form.Item {...wrapperProps}>{content}</Form.Item>;
  },
};

// Alias for backward compatibility
antdAdapter.widgetMap!['text'] = antdAdapter.widgetMap!['input'];
antdAdapter.widgetMap!['date-time'] = antdAdapter.widgetMap!['date-picker'];

export default antdAdapter;
