import { config as niceFormConfig } from '@ebay/nice-form-react';
import NiceForm from '@ebay/nice-form-react/NiceForm';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Form, Formik } from 'formik';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

const ComplexLayout = () => {
  const meta = {
    columns: 4,
    layout: 'vertical', // Must set for vertical layout
    columnGap: 12,
    rowGap: 18,
    fields: [
      {
        key: 'label1',
        colSpan: 4,
        render() {
          return (
            <>
              <span>CENTER</span>
              <Divider />
            </>
          );
        },
      },
      { key: 'address', label: 'Address', colSpan: 4 },
      { key: 'address2', label: 'Address2', colSpan: 4 },
      { key: 'city', label: 'City', colSpan: 2 },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'Zip Code' },
      {
        key: 'label11',
        colSpan: 4,
        render() {
          return (
            <>
              <span>Bed &amp; Bath</span>
              <Divider />
            </>
          );
        },
      },
      {
        key: 'homeType',
        label: 'Home Type',
        colSpan: 2,
        widget: 'select',
        initialValue: 'House',
        options: ['House', 'Apartment'],
        fullWidth: true,
      },
      {
        key: 'roomType',
        label: 'Room Type',
        colSpan: 2,
        widget: 'select',
        fullWidth: true,

        initialValue: 'Entire home/apt',
        options: ['Entire home/apt', 'Shared'],
      },
      {
        key: 'bedrooms',
        label: 'Bedrooms',
        colSpan: 2,
        widget: 'select',
        fullWidth: true,

        options: ['1 Bedroom', '2 Bedrooms'],
      },
      {
        key: 'bathrooms',
        label: 'Bathrooms',
        colSpan: 2,
        fullWidth: true,

        widget: 'select',
        options: ['1 Bathroom', '2 Bathrooms'],
      },
      {
        key: 'king',
        label: 'King',
        widgetProps: { type: 'number', style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'queen',
        label: 'Queen',
        widgetProps: { type: 'number', style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'full',
        label: 'Full',
        widgetProps: { type: 'number', style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'twin',
        label: 'Twin',
        widgetProps: { type: 'number', style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'submit',
        colSpan: 4,

        render: () => {
          return (
            <Button type="submit" variant="contained" style={{ width: '100%' }}>
              Submit
            </Button>
          );
        },
      },
    ],
  };
  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <NiceForm meta={meta} />
      </Form>
    </Formik>
  );
};

export default ComplexLayout;
