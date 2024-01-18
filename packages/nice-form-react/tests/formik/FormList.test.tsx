import React from 'react';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const FormList = () => {
  const meta = {
    layout: 'horizontal',
    columns: 1,
    rowGap: 18,
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widgetProps: { type: 'password' } },
      {
        key: 'friends',
        label: 'Friends',
        widget: 'form-list',
        fullWidth: true,
        listItemProps: {
          widget: 'select',
          options: ['Tom', 'Jerry'],
          required: true,
          fullWidth: true,
        },
      },
    ],
  };

  return (
    <Formik
      initialValues={{
        username: 'Nate',
        friends: ['Tom'],
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form style={{ width: 600 }}>
        <NiceForm meta={meta} />
        <Button color="primary" type="submit" variant="contained" style={{ marginTop: 18 }}>
          Log in
        </Button>
      </Form>
    </Formik>
  );
};

describe('formik/FormList', () => {
  it('renders FormList Form using formik', async () => {
    render(<FormList />);
    const password = screen.getByLabelText('Password');
    waitFor(() => expect(password).toBeInTheDocument(), { timeout: 3000 });
  });
});
