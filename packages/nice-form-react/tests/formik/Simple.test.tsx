import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter, { FormikMuiNiceFormMeta } from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const Simple = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const getMeta = (form: FormikProps<typeof initialValues>) => {
    const formMeta: FormikMuiNiceFormMeta = {
      columns: 1,
      rowGap: 18,
      form,
      initialValues,
      disabled: form.isSubmitting,
      fields: [
        {
          key: 'username',
          label: 'User Name',
          widget: 'text',
        },
        {
          key: 'password',
          label: 'Password',
          widget: 'text',
          widgetProps: {
            type: 'password',
          },
        },
        {
          key: 'submit',
          render: () => {
            return (
              <Button type="submit" variant="contained">
                Log in
              </Button>
            );
          },
        },
      ],
    };
    return formMeta;
  };

  return (
    <div style={{ width: '400px' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(form) => {
          return (
            <Form>
              <NiceForm meta={getMeta(form)} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

describe('formik/Simple', () => {
  it('renders Simple Form using formik', async () => {
    render(<Simple />);
    const password = screen.getByLabelText('Password');
    waitFor(() => expect(password).toBeInTheDocument(), { timeout: 3000 });
  });
});
