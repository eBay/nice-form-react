import { ReactElement, useState, useCallback } from 'react';
import {
  NiceFormMeta,
  NiceFormField,
  ReactComponent,
  NormalizedFormMeta,
  NormalizedFormField,
  FieldMetaConverter,
} from './types';
import FormField from './FormField';
import FormLayout from './FormLayout';
import config from './config';
import { get, has, normalizeOptions } from './utils';
import { NiceFormAdapter } from './types';

/**
 * @description The component accepts meta parameter and renders the whole form.
 * @component
 */
const NiceForm = ({ meta }: { meta: NiceFormMeta }): ReactElement | null => {
  // Normalize fields
  let normalizedMeta: NormalizedFormMeta = {
    ...meta,
    fields: meta.fields.map((field) => {
      let convertedField: NiceFormField = { ...field };
      const widgetProps = { ...field.widgetProps };

      // if children is only on field, then it means it's children of widgetProps
      ['children'].forEach((p) => {
        if (convertedField.hasOwnProperty(p) && !widgetProps.hasOwnProperty(p)) {
          widgetProps[p] = convertedField[p];
          delete convertedField[p];
        }
      });

      // disabled property are on both widgetProps and field
      widgetProps.disabled = meta.disabled || field.disabled;
      delete convertedField.disabled;

      convertedField.widgetProps = widgetProps;

      // Normalize options
      if (convertedField.options) {
        convertedField.options = normalizeOptions(convertedField.options);
      }

      // Normalize name property
      const k = String(convertedField.key);
      if (!convertedField.name) {
        // k maybe a number
        convertedField.name = k.startsWith('!!!') ? [k.replace('!!!', '')] : k.split('.');
      }

      // Normalize initialValue
      let initialValue = get(
        meta.initialValues || {},
        field.name ? (Array.isArray(field.name) ? field.name : [field.name]) : field.key,
      );
      // initialValue on a filed has lower priority
      if (typeof initialValue === 'undefined') {
        initialValue = convertedField.initialValue;
      }
      convertedField.initialValue = initialValue;

      const def = config.getWidgetDef(field.widget || config.defaultWidget);
      convertedField.widget = def.widget;
      // @ts-ignore
      if (def.metaConverter) convertedField.__niceFormFieldMetaConverter = def.metaConverter;

      const viewDef = config.getWidgetDef(convertedField.viewWidget || config.defaultViewWidget);
      convertedField.viewWidget = viewDef.widget;
      // @ts-ignore
      if (viewDef.metaConverter)
        convertedField.__niceFormFieldViewMetaConverter = viewDef.metaConverter;

      return convertedField as NormalizedFormField;
    }),
  };

  config.metaConverters.forEach((convertor) => {
    normalizedMeta = convertor(normalizedMeta);
  });

  // We should call widget metaConverters after form metaConverters
  // so that the whole meta is normalized first
  normalizedMeta.fields = normalizedMeta.fields.map((field) => {
    let newField = field;
    // @ts-ignore
    if (field.__niceFormFieldMetaConverter) {
      // @ts-ignore
      newField = field.__niceFormFieldMetaConverter({ meta: normalizedMeta, field });
      // @ts-ignore
      delete newField.__niceFormFieldMetaConverter;
    }

    // @ts-ignore
    if (field.__niceFormFieldViewMetaConverter) {
      // @ts-ignore
      newField = field.__niceFormFieldViewMetaConverter({ meta: normalizedMeta, field });
      // @ts-ignore
      delete newField.__niceFormFieldViewMetaConverter;
    }
    return newField;
  });

  const elements = normalizedMeta.fields
    .map((field) => {
      return {
        //@ts-ignore
        element: <FormField key={field.key} meta={normalizedMeta} field={field} />,
        field,
      };
    })
    .filter(Boolean);
  return <FormLayout elements={elements} meta={normalizedMeta} />;
};

NiceForm.useUpdateOnChange = (fields: string | string[][] | string[]) => {
  const [value, setValue] = useState(true);
  if (typeof fields === 'string') fields = [fields];
  return useCallback(
    (changedValues: Object) => {
      if (
        fields[0] === '*' ||
        (Array.isArray(fields) &&
          fields.some((f: string | string[]) => {
            return has(changedValues, f);
          }))
      ) {
        setValue(!value);
      }
    },
    [value],
  );
};

NiceForm.addAdapter = (adapter: NiceFormAdapter) => {
  config.addAdapter(adapter);
};

NiceForm.defineWidget = (
  name: string,
  widget: ReactComponent,
  metaConverter?: FieldMetaConverter,
) => {
  config.defineWidget(name, widget, metaConverter);
};

NiceForm.getFieldValue = (fieldName: string, meta: NiceFormMeta, ...args: any[]) => {
  const a = config.adapters.reverse().find((a) => !!a.getFieldValue);
  if (a) return a.getFieldValue!(fieldName, meta, ...args);
};

export default NiceForm;
