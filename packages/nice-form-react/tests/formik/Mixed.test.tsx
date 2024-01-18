import React, { ReactNode } from 'react';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fieldToDatePicker } from 'formik-mui-x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const MyDatePicker = ({ children, ...props }: { children: ReactNode } & any) => {
  props.onChange = (value: any) => {
    props.form.setFieldTouched(props.field.name, true, false);
    props.form.setFieldValue(props.field.name, value, true);
    props.field.onChange(value);
  };
  props.onBlur = () => {
    props.form.setFieldTouched(props.field.name, true, true);
    props.field.onBlur();
  };
  return (
    <DatePicker {...fieldToDatePicker(props)} label={props?.label}>
      {children}
    </DatePicker>
  );
};

NiceForm.defineWidget('date-picker', MyDatePicker, ({ field }) => field);

const Mixed = () => {
  const getMeta1 = () => {
    return {
      rowGap: 18,
      fields: [
        {
          key: 'name.first',
          label: 'First Name',
          required: true,
          widgetProps: {
            onChange: (e: any) => {
              console.log('e: ', e);
            },
          },
        },
        { key: 'name.last', label: 'Last Name', required: true },
        {
          key: 'dob',
          label: 'Date of Birth',
          widget: 'date-picker',
          widgetProps: {
            onChange: (date: any) => {
              console.log('date: ', date);
            },
            onError: (err: any) => {
              console.log('err: ', err);
            },
          },
        },
      ],
    };
  };
  const meta2 = {
    rowGap: 18,
    fields: [
      {
        key: 'email',
        label: 'Email',
      },
    ],
  };

  const prefixMeta = {
    fields: [
      {
        key: 'prefix',
        options: ['+86', '+87'],
        widget: 'select',
        widgetProps: {
          style: { width: 100, border: 'none' },
          variant: 'standard',
        },
      },
    ],
  };
  const prefixSelector = <NiceForm meta={prefixMeta} />;

  return (
    <Formik
      initialValues={{ prefix: '+86', phone: '' }} // Add 'phone' property with an empty string as the initial value
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(form) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <NiceForm meta={getMeta1()} />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              InputProps={{
                startAdornment: prefixSelector,
              }}
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone && Boolean(form.errors.phone)}
              helperText={form.touched.phone && form.errors.phone}
              style={{ marginBottom: 18, marginTop: 18 }}
            ></TextField>
            <NiceForm meta={meta2} />
            <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
              Submit
            </Button>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
};

describe('formik/Mixed', () => {
  it('renders Mixed Form using formik', async () => {
    render(<Mixed />);
    const phoneNumber = screen.getByLabelText('Phone Number');
    waitFor(() => expect(phoneNumber).toBeInTheDocument(), { timeout: 3000 });
  });
});
