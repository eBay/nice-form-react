import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Form, Formik, FormikProps } from 'formik';
import { Button } from '@mui/material';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter, { FormikMuiNiceFormMeta } from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const MOCK_INFO = {
  name: { first: 'Nate', last: 'Wang' },
  email: 'myemail@gmail.com',
  gender: 'Male',
  dateOfBirth: dayjs('2100-01-01'),
  phone: '15988888888',
  city: 'Shanghai',
  address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
};

const ViewEdit = () => {
  const [viewMode, setViewMode] = useState(true);
  const [personalInfo, setPersonalInfo] = useState(MOCK_INFO);
  const handleSubmit = useCallback((values: any, { setSubmitting }: { setSubmitting: any }) => {
    console.log('Submit: ', values);
    setTimeout(() => {
      setSubmitting(false);
      setPersonalInfo(values);
      setViewMode(true);
    }, 1500);
  }, []);

  const getMeta = (form: FormikProps<typeof MOCK_INFO>) => {
    const meta: FormikMuiNiceFormMeta = {
      form,
      columns: 2,
      disabled: form.isSubmitting,
      viewMode: viewMode,
      initialValues: personalInfo,
      rowGap: 20,
      columnGap: 20,
      fields: [
        {
          key: 'name.first',
          name: ['name', 'first'],
          label: 'First Name',
          required: true,
          tooltip: 'hahahah',
        },
        { key: 'name.last', label: 'Last Name', fullWidth: true, widget: 'text', required: true },
        { key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'] },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address', colSpan: 2, clear: 'left' },
        { key: 'city', label: 'City' },
        { key: 'zipCode', label: 'Zip Code' },

        {
          key: 'submit-button',
          clear: 'left',
          render: () => {
            return (
              <>
                <Button type="submit" variant="contained" disabled={form.isSubmitting}>
                  Submit
                </Button>
                <Button
                  onClick={() => setViewMode(true)}
                  style={{ marginLeft: 10 }}
                  disabled={form.isSubmitting}
                >
                  Cancel
                </Button>
              </>
            );
          },
        },
      ],
    };
    console.log(meta);
    return meta;
  };

  return (
    <div>
      <h1 style={{ fontSize: '16px', marginTop: '50px', color: '#888' }}>
        Personal Infomation
        {viewMode && (
          <Button
            onClick={() => setViewMode(!viewMode)}
            style={{ float: 'right', transform: 'translateY(-10px)' }}
          >
            Edit
          </Button>
        )}
      </h1>
      <Formik
        initialValues={personalInfo}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
      >
        {(form) => (
          <Form>
            <NiceForm meta={getMeta(form)} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

describe('formik/ViewEdit', () => {
  it('renders ViewEdit Form using formik', async () => {
    render(<ViewEdit />);
    const email = screen.getByText('Email');
    waitFor(() => expect(email).toBeInTheDocument(), { timeout: 3000 });
  });
});
