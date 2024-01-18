import NiceForm from '@ebay/nice-form-react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';

const MOCK_USERNAMES: {
  [key: string]: boolean;
} = {
  nate: true,
  bood: true,
  kevin: true,
};

const Validation = () => {
  const getMeta = (form) => {
    const meta = {
      rowGap: 18,
      fields: [
        {
          key: 'username',
          label: 'Username',
          placeholder: 'Note: username nate, bood or kevin already exist',
          hasFeedback: true, // Show validation status icon in the right
          required: true, // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
          validate: (value) => {
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
          validate: (value) => {
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
          validate: (value) => {
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

export default Validation;
