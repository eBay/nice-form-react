import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import NiceForm from '../NiceForm';
import { Field, FormikProps, FieldArray } from 'formik';
import { FieldArrayRenderProps } from 'formik/dist/FieldArray';
import { NiceFormMeta, NiceFormAdapter, NiceFormField, NormalizedFormField } from '../types';
import MenuItem from '@mui/material/MenuItem';
import {
  TextField,
  Select,
  CheckboxWithLabel,
  SimpleFileUpload,
  RadioGroup,
  Switch,
  Autocomplete,
} from 'formik-mui';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';

const normalizeOptions = (options: any[]) => {
  if (!Array.isArray(options)) {
    throw new Error('Options should be array in nice form meta.');
  }
  return options.map((opt) => {
    if (Array.isArray(opt)) {
      return { value: opt[0], label: opt[1] };
    } else if (typeof opt === 'object') {
      return opt;
    } else {
      return { value: opt, label: opt };
    }
  });
};

export interface FormikMuiNiceFormMeta extends NiceFormMeta {
  form?: FormikProps<any>;
}

export interface FormikMuiNiceFormField extends NiceFormField {
  fullWidth?: boolean;
}
const formikAdapter: NiceFormAdapter = {
  defaultViewWidget: ({ value, label, field, meta, ...rest }) => {
    return (
      <div {...rest}>
        <InputLabel shrink={true}>{label}</InputLabel>
        <div>{value || 'N/A'}</div>
      </div>
    );
  },
  widgetMap: {
    text: {
      widget: TextField,
      metaConverter: ({ field }) => {
        // It's fine to modify field directly since widgetProps is already a copy
        if (!field.widgetProps!.hasOwnProperty('fullWidth')) {
          field.widgetProps!.fullWidth = true;
        }
        return field;
      },
    },
    upload: {
      widget: SimpleFileUpload,
    },
    checkbox: {
      widget: CheckboxWithLabel,
      metaConverter: ({ field }) => {
        const newField = {
          ...field,
          widgetProps: {
            ...field.widgetProps,
            fullWidth: field.widgetProps?.fullWidth,
            type: 'checkbox',
            Label: {
              label: field.widgetProps?.label,
            },
          },
        };
        delete newField.widgetProps.fullWidth;
        return newField;
      },
    },
    'radio-group': {
      widget: RadioGroup,
      metaConverter: ({ field, meta }) => {
        const labelId = `${meta.name || 'form'}-${field.key}-label`;
        return {
          ...field,
          render:
            field.render ||
            (() => {
              return (
                <FormControl>
                  <FormLabel id={labelId}>{field.widgetProps?.label}</FormLabel>
                  <Field
                    component={RadioGroup}
                    aria-labelledby={labelId}
                    name={field.name}
                    row
                    {...field.widgetProps}
                  >
                    {(field.options || []).map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={
                          <Radio disabled={field.widgetProps?.disabled} {...opt.radioProps} />
                        }
                        label={opt.label}
                      />
                    ))}
                  </Field>
                </FormControl>
              );
            }),
        };
      },
    },
    switch: {
      widget: ({
        label,
        required,
        disabled,
        form,
        field,
        meta,
        formControl,
        formControlLabel,
        ...rest
      }) => {
        return (
          <FormControl {...formControl}>
            <FormControlLabel
              control={<Switch type="checkbox" field={field} meta={meta} form={form} {...rest} />}
              label={label}
              required={required}
              disabled={form.isSubmitting}
              {...formControlLabel}
            />
          </FormControl>
        );
      },
    },
    autocomplete: {
      widget: Autocomplete,
    },
    select: {
      widget: Select,
      metaConverter: ({
        field,
        meta,
      }: {
        field: FormikMuiNiceFormField;
        meta: FormikMuiNiceFormMeta;
      }) => {
        const labelId = `${meta.name || 'form'}-${field.key}-label`;
        const newField = {
          ...field,
          widgetProps: {
            ...field.widgetProps,
            labelId,
            inputLabel: {
              required: field.widgetProps!.required,
              ...(field.inputLabel || {}),
            },
            formControl: {
              fullWidth: field.widgetProps!.fullWidth,
              ...(field.formControl || {}),
            },
            children: normalizeOptions(field.options || []).map((opt) => (
              <MenuItem value={opt.value} key={opt.value} {...opt.props}>
                {opt.label}
              </MenuItem>
            )),
          },
        };
        return newField;
      },
    },
    'form-list': {
      widget: FieldArray,
      metaConverter: ({ field }) => {
        return {
          ...field,
          widgetProps: {
            ...field.widgetProps,
            name: field.name,
            children: (arrayHelpers: FieldArrayRenderProps) => {
              const fields = arrayHelpers.form.values[`${field.name}`] || [];
              const meta = {
                rowGap: 10,
                fields: fields.map((_: any, index: number) => {
                  return {
                    key: `${field.name}.${index}`,
                    label: field.widgetProps?.label,
                    extraNode: (
                      <>
                        {fields.length > 1 ? (
                          <span
                            style={{
                              position: 'absolute',
                              right: '-24px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: 'red',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              border: '1px solid red',
                              textAlign: 'center',
                              cursor: 'pointer',
                              lineHeight: '16px',
                            }}
                            className="dynamic-delete-button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </span>
                        ) : null}
                      </>
                    ),
                    ...(field.listItemProps || {}),
                    ...(typeof field.getListItemProps === 'function'
                      ? field.getListItemProps(fields, arrayHelpers)
                      : null),
                  };
                }),
              };
              return (
                <>
                  {field.hasOwnProperty('listTop') ? field.listTop : null}
                  <NiceForm meta={meta} />
                  {field.hasOwnProperty('listBottom') ? (
                    field.listBottom
                  ) : (
                    <Button
                      onClick={() => arrayHelpers.push('')}
                      {...(field.addItemButtonProps || {})}
                    >
                      {(field.addItemButtonLabel as React.ReactNode) || '+ Add Item'}
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

  // Common meta converter
  metaConverter: (meta) => {
    return {
      ...meta,
      fields: meta.fields.map((f: NormalizedFormField) => {
        const newF = { ...(f || {}) };
        const widgetProps = {
          ...f.widgetProps,
        };
        // These keys should be only on widgetProps
        ['required', 'fullWidth', 'label', 'help'].forEach((p) => {
          if (newF.hasOwnProperty(p)) widgetProps[p] = newF[p];
          delete newF[p];
        });

        return {
          ...newF,
          widgetProps,
        };
      }),
    };
  },
};

// Alias for text since the default widget is 'input'. Keep consistence.
formikAdapter.widgetMap!.input = formikAdapter.widgetMap!.text;

export default formikAdapter;
