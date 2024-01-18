import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const DynamicFields = () => {
  const getMeta = (form: any) => {
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
        options: [], // Add an empty array for options
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

describe('formik/DynamicFields', () => {
  it('renders DynamicFields Form using formik', async () => {
    render(<DynamicFields />);
    const favoriteFruit = screen.getByText('Favorite Fruit');
    waitFor(() => expect(favoriteFruit).toBeInTheDocument(), { timeout: 3000 });
  });
});
