import React, { ReactNode, useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import { render, screen } from '@testing-library/react';
import antdAdapter from '../../src/adapters/antdAdapter';
import '@testing-library/jest-dom';

const FormListManual = () => {
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
        children: (
          fields: any[],
          { add, remove }: { add: Function; remove: Function },
        ): ReactNode => {
          return (
            <>
              <NiceForm
                meta={{
                  fields: fields.map((field: any, _: number) => {
                    return {
                      ...field,
                      name: [field.name],
                      style: {
                        marginBottom: '10px',
                      },
                      extraNode: (
                        <>
                          {fields.length > 1 ? (
                            <div
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

describe('antd/FormListManual', () => {
  config.addAdapter(antdAdapter);

  it('renders FormListManual Nice Form using Antd', () => {
    render(<FormListManual />);
    const inputPwd = screen.getByLabelText('Password');
    expect(inputPwd).toBeInTheDocument();
  });
});
