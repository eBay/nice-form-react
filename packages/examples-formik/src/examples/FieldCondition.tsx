import { config as niceFormConfig } from '@ebay/nice-form-react';
import NiceForm from '@ebay/nice-form-react/NiceForm';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import { Form, Formik, FormikProps } from 'formik';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

interface FormValues {
  favoriteFruit: string;
  otherFruit?: string;
}
const FieldCondition = () => {
  const getMeta = (form: FormikProps<FormValues>) => {
    const meta = {
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
        {
          key: 'otherFruit',
          label: 'Other',
          condition: () => form.values.favoriteFruit === 'Other',
        },
        {
          key: 'submitt',
          render: () => {
            return (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            );
          },
        },
      ],
    };
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
        </Form>
      )}
    </Formik>
  );
};

export default FieldCondition;
