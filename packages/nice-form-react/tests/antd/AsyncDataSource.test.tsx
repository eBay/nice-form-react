import React, { useCallback, useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter, { AntdNiceFormMeta } from '../../src/adapters/antdAdapter';
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

const AsyncDataSource = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState<{ [key: string]: string }>({});
  const updateOnChange = NiceForm.useUpdateOnChange(['country']);
  const country = form.getFieldValue('country');
  const loading = country && !cities[country];

  const meta: AntdNiceFormMeta = {
    fields: [
      {
        key: 'country',
        label: 'Country',
        widget: 'select',
        options: ['China', 'USA', 'France'],
        placeholder: 'Select country...',
        initialValue: 'China',
        widgetProps: {
          onChange: () => {
            // Clear city value when country is changed
            form.setFieldsValue({ city: undefined });
          },
        },
      },
      {
        key: 'city',
        label: 'City',
        widget: 'select',
        options: country
          ? (cities[country] as unknown as any[] | undefined) || ([] as any[] | undefined)
          : ([] as any[] | undefined),
        placeholder: loading ? 'Loading...' : 'Select city...',
        widgetProps: { loading },
        disabled: loading || !country,
      },
    ],
  };

  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  useEffect(() => {
    if (country && !cities[country]) {
      fetchCities(country).then((arr) => {
        setCities((p) => ({ ...p, [country]: arr }));
      });
    }
  }, [country, setCities, cities]);

  // If country selected but no cities in store, then it's loading
  return (
    <Form form={form} onFinish={handleFinish} onValuesChange={updateOnChange}>
      <NiceForm meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

describe('antd/AsyncDataSource', () => {
  config.addAdapter(antdAdapter);

  it('renders AsyncDataSource Form using Antd', () => {
    render(<AsyncDataSource />);
    const countryField = screen.getByLabelText('Country');
    expect(countryField).toBeInTheDocument();
  });
});
