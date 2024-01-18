import React from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { InputLabel } from '@mui/material';
import { ReactElement } from 'react';
import NiceForm from '../../src/NiceForm';
import type { NiceFormMeta } from '../../src/types';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const DateView = ({ value, label }: { value: Dayjs; label: ReactElement }) => {
  return (
    <div>
      <InputLabel shrink={true}>{label}</InputLabel>
      <div>{value.format('MMM Do YYYY')}</div>
    </div>
  );
};

const ViewMode = () => {
  const personalInfo = {
    name: { first: 'Nate', last: 'Wang' },
    email: 'myemail@gmail.com',
    gender: 'Male',
    dateOfBirth: dayjs('2100-01-01'),
    // phone: '15988888888',
    city: 'Shanghai',
    address:
      'No.1000 Some Road, Zhangjiang Park, Pudong New District,Zhangjiang Park, Pudong New DistrictZhangjiang Park, Pudong New District',
  };

  const meta: NiceFormMeta = {
    columns: 2,
    viewMode: true,
    initialValues: personalInfo,
    rowGap: 20,
    columnGap: 20,
    fields: [
      { key: 'name.first', label: 'First Name', tooltip: 'First name' },
      { key: 'name.last', label: 'Last Name' },
      { key: 'gender', label: 'Gender' },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        viewWidget: DateView,
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address', colSpan: 2 },
      { key: 'city', label: 'City' },
      { key: 'zipCode', label: 'Zip Code' },
    ],
  };

  return (
    <div style={{ width: '800px' }}>
      <h1>Personal Infomation</h1>
      <NiceForm meta={meta} />
    </div>
  );
};

describe('formik/ViewMode', () => {
  it('renders ViewMode Form using formik', async () => {
    render(<ViewMode />);
    const email = screen.getByText('Email');
    waitFor(() => expect(email).toBeInTheDocument(), { timeout: 3000 });
  });
});
