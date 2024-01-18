import React, { useState, useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '../../src/NiceForm';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const MOCK_DATA: {
  [key: string]: string[];
} = {
  China: ['Beijing', 'Shanghai', 'Nanjing'],
  USA: ['New York', 'San Jose', 'Washton'],
  France: ['Paris', 'Marseille', 'Cannes'],
};

// Mock fetch
const fetchCities = (country: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DATA[country]) resolve(MOCK_DATA[country]);
      else reject(new Error('Not found'));
    }, 1500);
  });
};

interface FormValues {
  country: string;
  city: string;
  // add other fields as necessary
}
const MyForm = () => {
  const [cities, setCities] = useState<{ [key: string]: string[] }>({});
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const country = values.country;
  const loading = country && !cities[country];
  const meta = {
    rowGap: 18,
    fields: [
      {
        key: 'country',
        label: 'Country',
        widget: 'select',
        options: ['China', 'USA', 'France'],
        placeholder: 'Select country...',
        initialValue: 'China',
        widgetProps: {
          fullWidth: true,
          onChange: () => {
            // Clear city value when country is changed
            setFieldValue('city', undefined, true);
          },
        },
      },
      {
        key: 'city',
        label: 'City',
        widget: 'select',
        options: country ? cities[country] || [] : [],
        widgetProps: {
          fullWidth: true,
          placeholder: loading ? 'Loading...' : 'Select city...',
        },
        disabled: loading || !country,
      },
    ],
  };

  useEffect(() => {
    if (country && !cities[country]) {
      fetchCities(country).then((arr) => {
        setCities((p) => ({ ...p, [country]: arr }));
      });
    }
  }, [country, setCities, cities]);

  // If country selected but no cities in store, then it's loading
  return (
    <Form style={{ width: 800 }}>
      <NiceForm meta={meta} />
      <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
        Submit
      </Button>
    </Form>
  );
};

const AsyncDataSource = () => {
  return (
    <Formik
      initialValues={{ country: 'China' }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 2000));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <MyForm />
    </Formik>
  );
};

describe('formik/AsyncDataSource', () => {
  it('renders AsyncDataSource Form using formik', async () => {
    render(<AsyncDataSource />);
    const countryField = screen.getByText('Country');
    waitFor(() => expect(countryField).toBeInTheDocument(), { timeout: 3000 });
  });
});
