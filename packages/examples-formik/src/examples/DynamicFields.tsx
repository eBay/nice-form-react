import { config as niceFormConfig } from '@ebay/nice-form-react';
import NiceForm from '@ebay/nice-form-react/NiceForm';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter, { FormikMuiNiceFormMeta } from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import { Form, Formik, FormikProps } from 'formik';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

interface FormValues {
  favoriteFruit: string;
  otherFruit?: string;
}

const DynamicFields = () => {
  const getMeta = (form: FormikProps<FormValues>) => {
    const meta: FormikMuiNiceFormMeta = {
      rowGap: 18,
      form,
      fields: [
        {
          key: 'favoriteFruit',
          label: 'Favorite Fruit',
          widget: 'radio-group',
          options: ['Apple', 'Orange', 'Other'],
          initialValue: 'Apple',
        },
      ],
    };
    if (form.values.favoriteFruit === 'Other') {
      meta.fields.push({
        key: 'otherFruit',
        label: 'Other',
        widget: 'text',
        initialValue: 'Apple',
      });
    }
    return meta;
  };

  return (
    <Formik
      initialValues={{
        favoriteFruit: 'Apple',
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(form) => (
        <Form style={{ width: 800 }}>
          <NiceForm meta={getMeta(form)} />
          <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicFields;
