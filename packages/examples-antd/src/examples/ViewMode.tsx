import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import NiceForm from '@ebay/nice-form-react';

const DateView = ({ value }: { value: Dayjs }) => value.format('MMM Do YYYY');

const ViewMode = () => {
  const personalInfo = {
    name: { first: 'Nate', last: 'Wang' },
    email: 'myemail@gmail.com',
    gender: 'Male',
    dateOfBirth: dayjs('2100-01-01'),
    phone: '15988888888',
    city: 'Shanghai',
    address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
  };

  const meta = {
    columns: 2,
    viewMode: true,
    initialValues: personalInfo,
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
    <div>
      <div style={{ width: '800px' }}>
        <h1>Personal Infomation</h1>
        <NiceForm meta={meta} />
      </div>
    </div>
  );
};

export default ViewMode;
