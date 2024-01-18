import { useState } from 'react';
import Button from '@mui/material/Button';
import NiceForm from '@ebay/nice-form-react';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const MultipleColumns = () => {
  const [columns, setColumns] = useState(2);

  const getMeta = (form) => ({
    columns,
    rowGap: 18,
    columnGap: 18,
    fields: [
      {
        key: 'columns',
        label: 'Columns',
        widget: 'radio-group',
        widgetProps: {
          onChange: (evt, value) => {
            setColumns(value);
            form.values.columns = evt.target.value;
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
      {(form) => (
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
