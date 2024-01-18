import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const MultipleColumns = () => {
  const [columns, setColumns] = useState(2);

  const getMeta = (form: any) => ({
    columns,
    rowGap: 18,
    columnGap: 18,
    fields: [
      {
        key: 'columns',
        label: 'Columns',
        widget: 'radio-group',
        widgetProps: {
          onChange: (evt: any, value: any) => {
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

describe('formik/MultipleColumns', () => {
  it('renders MultipleColumns Form using formik', async () => {
    render(<MultipleColumns />);
    const textarea = screen.getByLabelText('Textarea');
    waitFor(() => expect(textarea).toBeInTheDocument(), { timeout: 3000 });
  });
});
