import Button from '@mui/material/Button';
import NiceForm from '@ebay/nice-form-react';
import { Formik, Form } from 'formik';

const Coordinated = () => {
  const getMeta = (formik) => {
    return {
      rowGap: 18,
      fields: [
        {
          key: 'gender',
          label: 'Gender',
          widget: 'radio-group',
          options: ['Male', 'Female'],
          widgetProps: {
            onChange: (evt, value) => {
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
