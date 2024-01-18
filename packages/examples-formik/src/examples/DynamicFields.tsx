import NiceForm from '@ebay/nice-form-react/NiceForm';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';

const DynamicFields = () => {
  const getMeta = (form) => {
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
