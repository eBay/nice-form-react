import { useCallback } from 'react';
import { Form, Button } from 'antd';
import NiceForm from '@ebay/nice-form-react';

export default () => {
  const meta = {
    layout: 'horizontal',
    columns: 1,
    initialValues: {
      username: 'username',
      // Single field examples
      items: ['Item 1', 'Item 2'],
      cities: ['Beijing'],
      // Multiple fields examples
      users: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
      ],
      contacts: [
        { name: 'Alice', email: 'alice@example.com', phone: '123-456' },
      ],
      products: [
        { name: 'Laptop', category: 'Electronics', price: 999 },
        { name: 'T-Shirt', category: 'Clothing', price: 29 },
      ],
      employees: [
        { name: 'Bob', department: 'Engineering', role: 'Developer', active: true },
      ],
    },
    fields: [
      { key: 'username', label: 'User Name' },
      
      // === Single Field Examples ===
      { key: 'items', label: 'Items (Single Input)', widget: 'form-list' },
      {
        key: 'cities',
        label: 'Cities (Single Select)',
        widget: 'form-list',
        listItemMeta: {
          widget: 'select',
          options: ['Beijing', 'Shanghai', 'Nanjing', 'Hangzhou'],
        },
      },
      
      // === Multiple Fields Examples ===
      {
        key: 'users',
        label: 'Users (2 Inputs)',
        widget: 'form-list',
        listItemMeta: {
          columns: 2,
          fields: [
            { key: 'firstName', widget: 'input', placeholder: 'First Name' },
            { key: 'lastName', widget: 'input', placeholder: 'Last Name' },
          ],
        },
      },
      {
        key: 'contacts',
        label: 'Contacts (3 Inputs)',
        widget: 'form-list',
        listItemMeta: {
          columns: 3,
          fields: [
            { key: 'name', widget: 'input', placeholder: 'Name' },
            { key: 'email', widget: 'input', placeholder: 'Email' },
            { key: 'phone', widget: 'input', placeholder: 'Phone' },
          ],
        },
      },
      {
        key: 'products',
        label: 'Products (Input + Select + Number)',
        widget: 'form-list',
        listItemMeta: {
          columns: 3,
          fields: [
            { key: 'name', widget: 'input', placeholder: 'Product Name' },
            { 
              key: 'category', 
              widget: 'select', 
              widgetProps: { placeholder: 'Select Category' },
              options: [
                { label: 'Electronics', value: 'Electronics' },
                { label: 'Clothing', value: 'Clothing' },
                { label: 'Food', value: 'Food' },
                { label: 'Books', value: 'Books' },
              ],
            },
            { key: 'price', widget: 'number', placeholder: 'Price' },
          ],
        },
      },
      {
        key: 'employees',
        label: 'Employees (Input + Select + Select + Checkbox)',
        widget: 'form-list',
        listItemMeta: {
          columns: 4,
          fields: [
            { key: 'name', widget: 'input', placeholder: 'Employee Name' },
            { 
              key: 'department', 
              widget: 'select',
              widgetProps: { placeholder: 'Department' },
              options: [
                { label: 'Engineering', value: 'Engineering' },
                { label: 'Marketing', value: 'Marketing' },
                { label: 'Sales', value: 'Sales' },
                { label: 'HR', value: 'HR' },
              ],
            },
            { 
              key: 'role', 
              widget: 'select',
              widgetProps: { placeholder: 'Role' },
              options: [
                { label: 'Manager', value: 'Manager' },
                { label: 'Developer', value: 'Developer' },
                { label: 'Designer', value: 'Designer' },
                { label: 'Analyst', value: 'Analyst' },
              ],
            },
            { key: 'active', widget: 'checkbox', label: 'Active' },
          ],
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

      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
