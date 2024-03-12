import NiceForm from '@ebay/nice-form-react/NiceForm';
import { FormikMuiNiceFormMeta } from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import { Formik, Form, FormikProps } from 'formik';
import Button from '@mui/material/Button';

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
