import React, { ReactNode } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter, { FormikMuiNiceFormMeta } from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { fieldToDateTimePicker } from 'formik-mui-x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const options = ['Apple', 'Orange', 'Banana'];

const MyDateTimePicker = ({ children, ...props }: { children: ReactNode } & any) => {
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
    <DateTimePicker
      {...fieldToDateTimePicker({ field: props.field, form: props.form, meta: props.meta })}
    >
      {children}
    </DateTimePicker>
  );
};

NiceForm.defineWidget('date-time-picker', MyDateTimePicker, ({ field }) => field);

const Basic = () => {
  const initialValues = {
    name: {
      firstName: 'Nate',
      lastName: 'Wang',
    },
    firstName: { a: 1 },
    'firstName.a': 'aaa',
    email: '',
    age: 10,
    select: 'Apple',
  };
  const getMeta = (form: FormikProps<typeof initialValues>) => {
    // console.log(form.errors);
    const formMeta: FormikMuiNiceFormMeta = {
      columns: 1,
      form,
      initialValues,
      disabled: form.isSubmitting,
      rowGap: 18,
      columnGap: 18,
      labelWidth: '100px',
      fields: [
        {
          key: '!!!firstName.a',
          label: 'First name',
          help: 'First name',
          required: true,
          widget: 'text',
          fullWidth: true,
          widgetProps: {
            onChange: (e: any) => console.log('onchange: ', e),
          },
        },
        {
          key: 'name.lastName',
          label: 'Last name',
          widget: 'text',
          fullWidth: true,
        },
        {
          key: 'email',
          label: 'Email',
          widget: 'text',
          fullWidth: true,
          validate: (value: any) => {
            console.log('validating email', value);
            if (!value) {
              return 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return 'Invalid email address';
            }
            return null;
          },
        },
        {
          key: 'dateTime',
          label: 'Date',
          widget: 'date-time-picker',
          widgetProps: {},
        },
        {
          key: 'upload',
          widget: 'upload',
          label: 'Upload',
          fullWidth: true,
        },
        {
          key: 'checkbox',
          widget: 'checkbox',
          label: 'Checkbox',
          fullWidth: true,
          initialValue: true,
        },
        {
          key: 'radio-group',
          widget: 'radio-group',
          label: 'Radio Group',
          options,
        },
        {
          key: 'switch',
          widget: 'switch',
          label: 'Switch',
        },
        {
          key: 'autocomplete',
          widget: 'autocomplete',
          label: 'Autocomplete',
          widgetProps: {
            options: [{ label: 'The Shawshank Redemption', year: 1994 }],
            renderInput: (params: Record<string, unknown>) => (
              <TextField
                {...params}
                // We have to manually set the corresponding fields on the input component
                name="name"
                error={form.touched['name'] && !!form.errors['name']}
                helperText={form.errors['name']?.toString()}
                label="Autocomplete"
                variant="outlined"
              />
            ),
          },
        },

        {
          key: 'select',
          label: 'Select',
          widget: 'select',
          required: true,
          fullWidth: true,
          validate: (value: string) => (value === 'Apple' ? 'Do not choose apple' : undefined),
          options,
        },

        {
          key: 'submit-button',
          clear: 'left',
          render: () => {
            return (
              <Button type="submit" variant="contained" disabled={form.isSubmitting}>
                Submit
              </Button>
            );
          },
        },
      ],
    };
    return formMeta;
  };
  return (
    <div style={{ width: '800px' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Submit: ', values);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
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
    </div>
  );
};

describe('formik/BasicTest', () => {
  it('renders Basic Nice Form using Formik', () => {
    render(<Basic />);
    const inputFirstName = screen.getByLabelText(/First\sname/);
    expect(inputFirstName).toBeInTheDocument();
  });
});
