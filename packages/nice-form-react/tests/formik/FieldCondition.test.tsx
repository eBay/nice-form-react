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

const FieldCondition = () => {
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

describe('formik/FieldCondition', () => {
  it('renders FieldCondition Form using formik', async () => {
    render(<FieldCondition />);
    const favoriteFruit = screen.getByText('Favorite Fruit');
    waitFor(() => expect(favoriteFruit).toBeInTheDocument(), { timeout: 3000 });
  });
});
