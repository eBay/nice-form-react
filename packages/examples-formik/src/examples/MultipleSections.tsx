import { config as niceFormConfig } from '@ebay/nice-form-react';
import NiceForm from '@ebay/nice-form-react/NiceForm';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import { Form, Formik } from 'formik';
import { fieldToDatePicker } from 'formik-mui-x-date-pickers';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

const MyDatePicker = ({ ...props }) => {
  props.onChange = (value: Dayjs | null) => {
    props.form.setFieldTouched(props.field.name, true, false);
    props.form.setFieldValue(props.field.name, value, true);
    props.field.onChange(value);
  };
  props.onBlur = () => {
    props.form.setFieldTouched(props.field.name, true, true);
    props.field.onBlur();
  };
  return (
    <DatePicker {...fieldToDatePicker({ field: props.field, form: props.form, meta: props.meta })}>
      {props.children}
    </DatePicker>
  );
};

NiceForm.defineWidget('date-picker', MyDatePicker, ({ field }) => field);

const MultipleSections = () => {
  const meta = {
    columns: 1,
    rowGap: 18,
    fields: [
      { key: 'name.first', label: 'First Name', required: true },
      { key: 'name.last', label: 'Last Name', required: true },
      { key: 'dob', label: 'Date of Birth', widget: 'date-picker', fullWidth: true },
      {
        key: 'email',
        label: 'Email',
        rules: [{ type: 'email', message: 'Invalid email' }],
      },
      {
        key: 'security',
        label: 'Security Question',
        widget: 'select',
        fullWidth: true,
        placeholder: 'Select a question...',
        options: ["What's your pet's name?", 'Your nick name?'],
      },
      { key: 'answer', label: 'Security Answer' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'phone', label: 'phone' },
    ],
  };

  const meta1 = {
    ...meta,
    fields: meta.fields.slice(0, 3),
  };
  const meta2 = {
    ...meta,
    fields: meta.fields.slice(3, 6),
  };
  const meta3 = {
    ...meta,
    fields: meta.fields.slice(6),
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form style={{ width: '500px' }}>
          <section style={{ marginBottom: 20 }}>
            <header style={{ marginBottom: 16 }}>
              Personal Information
              <Divider />
            </header>

            <NiceForm meta={meta1} />
          </section>
          <section style={{ marginBottom: 20 }}>
            <header style={{ marginBottom: 16 }}>
              Account Information
              <Divider />
            </header>
            <NiceForm meta={meta2} />
          </section>
          <section style={{ marginBottom: 20 }}>
            <header style={{ marginBottom: 16 }}>
              Contact Information
              <Divider />
            </header>
            <NiceForm meta={meta3} />
          </section>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </LocalizationProvider>
    </Formik>
  );
};

export default MultipleSections;
