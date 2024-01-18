import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const MOCK_USERNAMES: {
  [key: string]: boolean;
} = {
  nate: true,
  bood: true,
  kevin: true,
};

const Validation = () => {
  const getMeta = (form: any) => {
    const meta = {
      rowGap: 18,
      fields: [
        {
          key: 'username',
          label: 'Username',
          placeholder: 'Note: username nate, bood or kevin already exist',
          hasFeedback: true, // Show validation status icon in the right
          required: true, // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
          validate: (value: any) => {
            let error;
            if (MOCK_USERNAMES[value]) {
              error = `Username "${value}" already exists.`;
            }
            return error;
          },
        },
        {
          key: 'password',
          label: 'Password',
          widgetProps: { type: 'password' },
          onChange: () => {
            if (form.isFieldTouched('confirmPassword')) {
              form.validateFields(['confirmPassword']);
            }
          },
          validate: (value: any) => {
            let error;
            if (!value) {
              error = `Password is required`;
            }
            return error;
          },
        },
        {
          key: 'confirmPassword',
          label: 'Confirm Passowrd',
          required: true,
          widgetProps: { type: 'password' },
          validate: (value: any) => {
            let error;
            if (form.values.password !== value) {
              error = `Two passwords are inconsistent.`;
            }
            return error;
          },
        },
        {
          key: 'submit',
          render: () => (
            <Button type="submit" variant="contained">
              Register
            </Button>
          ),
        },
      ],
    };
    return meta;
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(form) => (
        <Form>
          <NiceForm meta={getMeta(form)} />
        </Form>
      )}
    </Formik>
  );
};

describe('formik/Validation', () => {
  it('renders Validation Form using formik', async () => {
    render(<Validation />);
    const username = screen.getByLabelText(/Username/);
    waitFor(() => expect(username).toBeInTheDocument(), { timeout: 3000 });
  });
});
