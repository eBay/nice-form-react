import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NiceForm from '@ebay/nice-form-react';
import { Formik, Form } from 'formik';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default function FormInModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = useState(false);

  const handleFinish = useCallback(
    (values) => {
      setPending(true);
      setTimeout(() => {
        setPending(false);
        enqueueSnackbar('Submit success!', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        handleClose();
      }, 2000);
    },
    [setPending],
  );

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
}
