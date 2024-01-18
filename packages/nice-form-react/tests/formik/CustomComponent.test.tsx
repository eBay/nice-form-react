import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import { Formik, Form, FieldMetaProps } from 'formik';
import Button from '@mui/material/Button';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen } from '@testing-library/react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fieldToDatePicker } from 'formik-mui-x-date-pickers';
import '@testing-library/jest-dom';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const MyDatePicker = ({ children, ...props }: { children: ReactNode } & any) => {
  props.onChange = (value: any) => {
    props.form.setFieldTouched(props.field.name, true, false);
    props.form.setFieldValue(props.field.name, value, true);
    props.field.onChange(value);
  };
  props.onBlur = () => {
    props.form.setFieldTouched(props.field.name, true, true);
    props.field.onBlur();
  };
  return (
    <DatePicker {...fieldToDatePicker(props)} label={props?.label}>
      {children}
    </DatePicker>
  );
};

NiceForm.defineWidget('date-picker', MyDatePicker, ({ field }) => field);

const PriceInput = ({
  form,
  field,
  meta,
  ...widgetProps
}: {
  form: any;
  field: any;
  meta: FieldMetaProps<any>;
}) => {
  return field.value ? (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <TextField
          {...widgetProps}
          fullWidth
          defaultValue={meta.initialValue.price}
          name="price"
          type="number"
          error={meta.touched['product'] && !!form.errors['product']}
          helperText={form.errors['product']?.toString()}
          onChange={(e) => {
            form.setFieldValue('_temp_price_currency', { ...field.value, price: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          {...widgetProps}
          select
          fullWidth
          defaultValue={meta.initialValue.currency}
          label="Currency"
          name="currency"
          onChange={(e) => {
            form.setFieldValue('_temp_price_currency', {
              ...field.value,
              currency: e.target.value,
            });
          }}
        >
          <MenuItem value="RMB">RMB</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  ) : null;
};

const CaptchaInput = ({
  field,
  meta,
  form,
  ...widgetProps
}: {
  form: any;
  field: any;
  meta: FieldMetaProps<any>;
}) => (
  <Grid container spacing={1}>
    <Grid item xs={8}>
      <TextField {...field} {...widgetProps} />
    </Grid>
    <Grid item xs={4}>
      <Button variant="outlined" style={{ marginTop: 10 }}>
        Get Captcha
      </Button>
    </Grid>
  </Grid>
);

const CustomComponent = () => {
  const meta = {
    rowGap: 18,
    fields: [
      { key: 'product', label: 'Product' },
      {
        key: '_temp_price_currency',
        label: 'Price',
        widget: PriceInput,
      },
      {
        key: 'captcha',
        label: 'Captcha',
        required: true,
        widget: CaptchaInput,
        widgetProps: {
          fullWidth: true,
          helperText: 'We must make sure that your are a human.',
        },
      },
      {
        key: 'shipDate',
        label: 'Ship Date',
        widget: ({}: { form: any; field: any; meta: FieldMetaProps<any> }) => {
          return (
            <Grid container alignItems={'center'}>
              <NiceForm
                meta={{
                  fields: [
                    {
                      key: 'startDate',
                      widget: 'date-picker',
                      label: 'Ship Start Date',
                      widgetProps: { style: { width: '100%' } },
                    },
                  ],
                }}
              />
              <Grid item xs={1} style={{ textAlign: 'center' }}>
                {' — '}
              </Grid>
              <NiceForm
                meta={{
                  fields: [
                    {
                      key: 'endDate',
                      widget: 'date-picker',
                      label: 'Ship End Date',
                      widgetProps: { style: { width: '100%' } },
                    },
                  ],
                }}
              />
            </Grid>
          );
        },
      },
      { key: 'note', label: 'Note' },
    ],
  };

  return (
    <Formik
      initialValues={{ product: '', _temp_price_currency: { price: '8', currency: 'USD' } }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {() => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <NiceForm meta={meta} />
            <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
              Submit
            </Button>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
};

describe('formik/CustomComponent', () => {
  it('renders CustomComponent Nice Form using Formik', async () => {
    render(<CustomComponent />);
    const inputProduct = await screen.findByLabelText('Product');
    expect(inputProduct).toBeInTheDocument();
  });
});
