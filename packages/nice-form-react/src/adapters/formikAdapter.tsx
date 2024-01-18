import { ReactNode } from 'react';
import { Field, FastField, FieldProps, FormikHandlers, FieldInputProps, FieldConfig } from 'formik';
import { NiceFormAdapter, NormalizedFormField } from '../types';
import { niceFormFieldStdKeys, without } from '../utils';

export interface FormikWidgetProps extends Record<string, any> {
  onChange?: FormikHandlers['handleChange'];
  onBlur?: FormikHandlers['handleBlur'];
  children?: ReactNode;
  disabled?: boolean;
  label?: ReactNode;
  fullWidth?: boolean;
}

// each formik widget will be passed with { field, meta } props
const formikAdapter: NiceFormAdapter = {
  metaConverter: (meta) => {
    return {
      ...meta,
      fields: meta.fields.map((f: NormalizedFormField) => {
        // Note: formik doesn't support mixed dot and nested object: {'a.b': {c: 1} } => ['a.b', 'c']
        return {
          ...f,
          name: Array.isArray(f.name)
            ? f.key.startsWith('!!!')
              ? `['${f.name.join("', '")}']`
              : f.name.join('.')
            : f.name,
        };
      }),
    };
  },
  renderField: ({ field, meta }) => {
    const FormWidget = field.widget;
    const ViewWidget = field.viewWidget;
    const viewMode = meta.viewMode || field.viewMode;

    const wrapperProps: FieldConfig = {
      ...meta.wrapperProps,
      ...without(field, niceFormFieldStdKeys),
      name: field.name as string, // ensured by metaConverter
    };

    const widgetProps: FormikWidgetProps = {
      ...field.widgetProps,
    };

    if (viewMode) {
      return field.renderView ? (
        field.renderView(field.initialValue, { field, meta })
      ) : (
        <ViewWidget
          field={field}
          meta={meta}
          value={field.initialValue}
          {...widgetProps}
        ></ViewWidget>
      );
    }

    // Allows onChange, onBlur events on widgetProps
    const widgetOnChange = widgetProps?.onChange;
    const widgetOnBlur = widgetProps?.onBlur;
    delete widgetProps.onChange;
    delete widgetProps.onBlur;

    const FieldComp = field.fast ? FastField : Field;
    return (
      <FieldComp {...wrapperProps}>
        {({ field, form, meta }: FieldProps) => {
          const newFormikField: FieldInputProps<any> = { ...field };

          // allow onChange, onBlur to be called by widgetProps
          if (widgetOnChange) {
            newFormikField.onChange = (e: any) => {
              field.onChange(e);
              widgetOnChange(e);
            };
          }
          if (widgetOnBlur) {
            newFormikField.onBlur = (e: any) => {
              field.onBlur(e);
              widgetOnBlur(e);
            };
          }
          return <FormWidget {...widgetProps} field={newFormikField} form={form} meta={meta} />;
        }}
      </FieldComp>
    );
  },
};

export default formikAdapter;
