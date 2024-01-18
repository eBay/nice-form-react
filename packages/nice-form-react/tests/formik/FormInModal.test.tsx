import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form } from 'formik';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);

const FormInModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = useState(false);

  const handleFinish = useCallback(() => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      enqueueSnackbar('Submit success!', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      handleClose();
    }, 2000);
  }, [setPending]);

  const meta = {
    rowGap: 18,
    disabled: pending,
    fields: [
      {
        key: 'name',
        label: 'Name',
        required: true,
      },
      {
        key: 'desc',
        label: 'Description',
      },
    ],
  };

  return (
    <SnackbarProvider>
      <Button onClick={handleOpen} variant="contained">
        New Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent style={{ width: 500, paddingTop: 10 }}>
          <Formik onSubmit={handleFinish} initialValues={{}}>
            <Form>
              <NiceForm meta={meta}></NiceForm>
              <DialogActions style={{ marginTop: 15 }}>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Ok
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </SnackbarProvider>
  );
};

describe('formik/FormInModal', () => {
  it('renders FormInModal Form using formik', async () => {
    render(<FormInModal />);
    // click on button to open modal
    const button = screen.getByRole('button', { name: /New\sItem/ });
    expect(button).toBeTruthy();

    act(() => {
      button.click();
    });

    const modalDialog = await screen.findByRole('dialog');
    expect(modalDialog).toBeInTheDocument();
    const inputName = within(modalDialog).getByText('Name');
    expect(inputName).toBeInTheDocument();
  });
});
