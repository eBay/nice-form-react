import { Form, Formik, FormikProps } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '@ebay/nice-form-react';
import { FormikMuiNiceFormMeta } from '@ebay/nice-form-react/adapters/formikMuiAdapter';

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

export default Simple;
