import React, { useState, useCallback } from 'react';
import { Form, Button, Modal } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen, within, act } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const FormInModal = () => {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = useCallback(() => setModalOpen(true), [setModalOpen]);
  const hideModal = useCallback(() => setModalOpen(false), [setModalOpen]);
  const [pending, setPending] = useState(false);
  const handleFinish = useCallback(
    (values: any) => {
      setPending(true);
      console.log('submit: ', values);
      setTimeout(() => {
        setPending(false);
        Modal.success({ title: 'Success', content: 'Submit success.', onOk: hideModal });
      }, 2000);
    },
    [setPending, hideModal],
  );

  const meta = {
    disabled: pending,
    fields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'desc', label: 'Description' },
    ],
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        New Item
      </Button>
      <Modal
        title="New Item"
        closable={!pending}
        maskClosable={!pending}
        open={modalOpen}
        destroyOnClose
        onOk={() => form.submit()}
        onCancel={hideModal}
        okText={pending ? 'Loading...' : 'Ok'}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
      >
        <Form form={form} onFinish={handleFinish}>
          <NiceForm meta={meta} />
        </Form>
      </Modal>
    </div>
  );
};

describe('antd/FormInModal', () => {
  config.addAdapter(antdAdapter);

  it('renders FormInModal Nice Form using Antd', async () => {
    render(<FormInModal />);

    // click on button to open modal
    const button = screen.getByRole('button', { name: /New\sItem/ });
    expect(button).toBeTruthy();

    act(() => {
      button.click();
    });

    const modalDialog = await screen.findByRole('dialog');
    expect(modalDialog).toBeInTheDocument();
    const inputName = within(modalDialog).getByLabelText('Name');
    expect(inputName).toBeInTheDocument();
  });
});
