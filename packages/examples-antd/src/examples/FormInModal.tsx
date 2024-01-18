import { useState, useCallback } from 'react';
import { Form, Button, Modal } from 'antd';
import NiceForm from '@ebay/nice-form-react';

export default () => {
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
