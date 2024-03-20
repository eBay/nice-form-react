import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import { Form, Formik, FormikProps } from 'formik';
import { fieldToDatePicker } from 'formik-mui-x-date-pickers';
import { useState } from 'react';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

const MyDatePicker = ({ ...props }) => {
  props.onChange = (value: Dayjs | null) => {
    props.form.setFieldTouched(props.field.name, true, false);
    props.form.setFieldValue(props.field.name, value, true);
    props.field.onChange(value);
  };
  props.onBlur = () => {
    props.form.setFieldTouched(props.field.name, true, true);
    props.field.onBlur();
  };
  return (
    <DatePicker {...fieldToDatePicker({ field: props.field, form: props.form, meta: props.meta })}>
      {props.children}
    </DatePicker>
  );
};

NiceForm.defineWidget('date-picker', MyDatePicker, ({ field }) => field);

interface FormValues {
  columns: number;
  input?: string;
  checkbox?: boolean;
  select?: string;
  password?: string;
  textarea?: string;
  number?: number;
  'date-picker'?: Dayjs | null;
}
const MultipleColumns = () => {
  const [columns, setColumns] = useState(2);

  const getMeta = (form: FormikProps<FormValues>) => ({
    columns,
    rowGap: 18,
    columnGap: 18,
    fields: [
      {
        key: 'columns',
        label: 'Columns',
        widget: 'radio-group',
        widgetProps: {
          onChange: (evt: React.ChangeEvent<HTMLInputElement>, value: number) => {
            setColumns(value);
            form.values.columns = +evt.target.value;
          },
        },
        options: [1, 2, 3, 4],
        help: 'Change columns to show layout change',
      },
      { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
      {
        key: 'checkbox',
        label: 'Checkbox',
        widget: 'checkbox',
        initialValue: true,
      },
      {
        key: 'select',
        label: 'Select',
        widget: 'select',
        options: ['Apple', 'Orange', 'Banana'],
        fullWidth: true,
      },
      {
        key: 'password',
        label: 'Password',
        widgetProps: {
          type: 'password',
        },
      },
      {
        key: 'textarea',
        label: 'Textarea',
        widgetProps: {
          multiline: true,
          fullWidth: true,
          rows: 4,
        },
      },
      {
        key: 'number',
        label: 'Number',
        widgetProps: {
          type: 'number',
        },
      },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
      {
        key: 'submit',
        render: () => (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        ),
      },
    ],
  });
  return (
    <Formik
      initialValues={{ columns: 2 }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(form: FormikProps<FormValues>) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <NiceForm meta={getMeta(form)} />
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
};

export default MultipleColumns;
