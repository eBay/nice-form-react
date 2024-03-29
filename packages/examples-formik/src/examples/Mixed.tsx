import NiceForm from '@ebay/nice-form-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';

const Mixed = () => {
  const getMeta1 = () => {
    return {
      rowGap: 18,
      fields: [
        {
          key: 'name.first',
          label: 'First Name',
          required: true,
          widgetProps: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              console.log('e: ', e);
            },
          },
        },
        { key: 'name.last', label: 'Last Name', required: true },
        {
          key: 'dob',
          label: 'Date of Birth',
          widget: 'date-picker',
        },
      ],
    };
  };
  const meta2 = {
    rowGap: 18,
    fields: [
      {
        key: 'email',
        label: 'Email',
      },
    ],
  };

  const prefixMeta = {
    fields: [
      {
        key: 'prefix',
        options: ['+86', '+87'],
        widget: 'select',
        widgetProps: {
          style: { width: 100, border: 'none' },
          variant: 'standard',
        },
      },
    ],
  };
  const prefixSelector = <NiceForm meta={prefixMeta} />;

  return (
    <Formik
      layout="horizontal"
      initialValues={{ prefix: '+86', phone: '' }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      style={{ width: '500px' }}
    >
      {(form) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <NiceForm meta={getMeta1()} />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              InputProps={{
                startAdornment: prefixSelector,
              }}
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone && Boolean(form.errors.phone)}
              helperText={form.touched.phone && form.errors.phone}
              style={{ marginBottom: 18, marginTop: 18 }}
            ></TextField>
            <NiceForm meta={meta2} />
            <Button type="submit" variant="contained" style={{ marginTop: 18 }}>
              Submit
            </Button>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
};

export default Mixed;
