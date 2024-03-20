import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter, { FormikMuiNiceFormMeta } from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import { Form, Formik, FormikProps } from 'formik';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

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
