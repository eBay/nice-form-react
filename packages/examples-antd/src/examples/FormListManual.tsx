import { useCallback } from 'react';
import { Form, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import NiceForm from '@ebay/nice-form-react';

export default () => {
  const meta = {
    layout: 'horizontal',
    columns: 1,
    initialValues: {
      username: 'username',
      items: ['ddd', 'xxx'],
    },
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
      {
        key: 'items',
        label: 'Items',
        widget: Form.List,
        widgetProps: { name: 'items' },
        children: (fields, { add, remove }) => {
          return (
            <>
              <NiceForm
                meta={{
                  fields: fields.map((field, i) => {
                    return {
                      ...field,
                      name: [field.name],
                      style: {
                        marginBottom: '10px',
                      },
                      extraNode: (
                        <>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              style={{
                                position: 'absolute',
                                right: '-24px',
                                top: '9px',
                                color: 'red',
                              }}
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </>
                      ),
                    };
                  }),
                }}
              />
              <Button type="link" onClick={() => add('')}>
                + Add Item
              </Button>
            </>
          );
        },
      },
    ],
  };

  const handleFinish = useCallback((values: any) => {
    console.log('Submit: ', values);
  }, []);

  return (
    <Form onFinish={handleFinish} layout="horizontal">
      <NiceForm meta={meta} />

      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
