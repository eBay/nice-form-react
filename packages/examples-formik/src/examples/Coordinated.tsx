import NiceForm, { config as niceFormConfig } from '@ebay/nice-form-react';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

interface FormValues {
  gender?: string;
  note?: string;
}

const Coordinated = () => {
  const getMeta = (formik: FormikHelpers<FormValues>) => {
    return {
      rowGap: 18,
      fields: [
        {
          key: 'gender',
          label: 'Gender',
          widget: 'radio-group',
          options: ['Male', 'Female'],
          widgetProps: {
            onChange: (evt: React.ChangeEvent<HTMLInputElement>, value: string) => {
              console.log('evt: ', evt);
              if (value === 'Male') {
                formik.setFieldValue('note', 'Hi, man!', true);
              } else {
                formik.setFieldValue('note', 'Hi, lady!', true);
              }
            },
          },
        },
        { key: 'note', widgetProps: { placeholder: 'Note' } },
      ],
    };
  };

  return (
    <Formik onSubmit={async () => {}} initialValues={{}}>
      {(formik) => (
        <Form>
          <NiceForm meta={getMeta(formik)} />
          <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default Coordinated;
