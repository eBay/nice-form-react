import React from 'react';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const Coordinated = () => {
  const getMeta = (formik: any) => {
    return {
      rowGap: 18,
      fields: [
        {
          key: 'gender',
          label: 'Gender',
          widget: 'radio-group',
          options: ['Male', 'Female'],
          widgetProps: {
            onChange: (_: any, value: any) => {
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

describe('formik/Coordinated', () => {
  it('renders Coordinated Nice Form using Formik', async () => {
    render(<Coordinated />);
    const inputGender = await screen.findByLabelText('Gender');
    expect(inputGender).toBeInTheDocument();
  });
});
