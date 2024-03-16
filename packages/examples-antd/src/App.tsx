import React, { useState } from 'react';
import useHash from './useHash';
import './App.css';
import NiceFormMeta from '@ebay/nice-form-react/src/NiceFormMeta';
import CodeViewer from './CodeViewer';
import Basic from './examples/Basic';
import Simple from './examples/Simple';
import ViewEdit from './examples/ViewEdit';
import ComplexLayout from './examples/ComplexLayout';
import DynamicFields from './examples/DynamicFields';
import FieldCondition from './examples/FieldCondition';
import ViewMode from './examples/ViewMode';
import AsyncDataSource from './examples/AsyncDataSource';
import MultipleColumns from './examples/MultipleColumns';
import MultipleSections from './examples/MultipleSections';
import SingleField from './examples/SingleField';
import Validation from './examples/Validation';
import FormInModal from './examples/FormInModal';
import Coordinated from './examples/Coordinated';
import CustomComponent from './examples/CustomComponent';
import Mixed from './examples/Mixed';
import Wizard from './examples/Wizard';
import FormList from './examples/FormList';
import FormListManual from './examples/FormListManual';

const examples: {
  [key: string]: {
    name: string;
    component: () => JSX.Element;
    description: React.ReactNode;
  };
} = {
  simple: {
    name: 'Simple',
    component: Simple,
    description: 'The most simple usage.',
  },
  basic: { name: 'Basic', component: Basic, description: 'Basic usage.' },
  'view-mode': {
    name: 'View Mode',
    component: ViewMode,
    description:
      'FormBuilder could also be used as view mode just for displaying information in form layout. It could be used even without Form.',
  },
  'view-edit': {
    name: 'View / Edit',
    component: ViewEdit,
    description: 'FormBuilder makes it super easy to toggle view/edit mode of a form.',
  },
  'dynamic-fields': {
    name: 'Dynamic Fields',
    component: DynamicFields,
    description:
      "You can dynamically add or remove fields according to the user's input. In this example, if choose other, then a new input appears.",
  },
  'form-list': {
    name: 'Form List',
    component: FormList,
    description: 'Antd form list support.',
  },
  'form-list-manual': {
    name: 'Manual Form List',
    component: FormListManual,
    description: 'Antd form list support.',
  },
  'field-condition': {
    name: 'Field Condition',
    component: FieldCondition,
    description:
      'By condition property, you can control whether to render a field or not. In this example, if choose other, then a new input appears.',
  },

  'async-data-source': {
    name: 'Async Data Source',
    component: AsyncDataSource,
    description:
      'Some form field widgets may need to load data source if necessary, the sample shows how to do it',
  },
  'multiple-columns': {
    name: 'Multiple Columns',
    component: MultipleColumns,
    description:
      "It's easy to set multiple columns layout for the form. Note it should be able to divide 24",
  },
  'complex-layout': {
    name: 'Complex Layout',
    component: ComplexLayout,
    description: 'The example shows a complex layout. Similar approach with multiple columns.',
  },
  'multiple-sections': {
    name: 'Multiple Sections',
    component: MultipleSections,
    description:
      'Some times you need to group fields into different fieldset, or need more complex layout. You can use multiple form metas in one form.',
  },
  'single-field': {
    name: 'Single Field',
    component: SingleField,
    description:
      'You can use FormBuilder for even a single form field. This example also shows inline layout of the form.',
  },
  validation: {
    name: 'Validation',
    component: Validation,
    description: (
      <span>
        You can use rules property to specify how to validate fields. For more information please go
        to:{' '}
        <a
          href="https://ant.design/components/form/#Validation-Rules"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ant.design/components/form/#Validation-Rules
        </a>
      </span>
    ),
  },
  'form-in-modal': {
    name: 'Form in Modal',
    component: FormInModal,
    description:
      'The example shows how to use form in a dialog to call api and show status in dialog buttons.',
  },
  coordinated: {
    name: 'Coordinated Controls',
    component: Coordinated,
    description:
      'You can set field value according to input of another control by use form.setFieldsValue api.',
  },
  'custom-component': {
    name: 'Custom Component',
    component: CustomComponent,
    description:
      "It's easy to create your own form field component, ether to get new capabilities or even just for layout.",
  },
  mixed: {
    name: 'Mixed',
    component: Mixed,
    description:
      'Form builder is designed to not limit original antd form api, so you can use them together.',
  },
  wizard: {
    name: 'Wizard',
    component: Wizard,
    description:
      'Wizard is an advanced usage of form builder, you can design your own meta structure to support dynamic wizard.',
  },
};

function App() {
  const current = useHash() || 'basic';

  const renderExample = () => {
    const item = examples[current];
    if (!item || !item.component) {
      return <span style={{ color: 'red' }}>Error: example "{current}" not found.</span>;
    }
    const Comp = item.component;
    return (
      <React.Fragment>
        <h1>
          {item.name}
          <p className="example-description">{item.description}</p>
        </h1>
        <Comp />
      </React.Fragment>
    );
  };
  return (
    <div className="app">
      <div className="sider">
        <h1>
          <select
            className="lib-switch"
            value="antd"
            onChange={(e) => (document.location = `./${e.target.value}`)}
          >
            <option value="antd">Ant.Design</option>
            <option value="formik">Formik + MUI</option>
          </select>
          <span className="example-title">Examples</span>
        </h1>
        <ul>
          {Object.keys(examples).map((key) => (
            <li key={key}>
              <a href={`#${key}`} className={current === key ? 'active' : ''}>
                {examples[key].name}
              </a>
            </li>
          ))}
        </ul>

        <div className="social">
          <a href="https://github.com/ebay/nice-form-react">
            <img
              src="https://img.shields.io/github/stars/rekit/nice-form-react?style=social"
              alt="Github Repo"
            />
          </a>
          <br />
          <a href="https://github.com/ebay/nice-form-react">
            <img src="https://img.shields.io/badge/API-Reference-green" alt="api reference" />
          </a>
          <br />
          <a href="https://codesandbox.io/s/github/ebay/nice-form-react/tree/master/examples-v4">
            <img
              width="150px"
              src="https://codesandbox.io/static/img/play-codesandbox.svg"
              alt="codesandbox"
            />
          </a>
        </div>
      </div>
      <div className="example-container">
        <div>{renderExample()}</div>
        <div className="code-container">
          <CodeViewer code={current} />
        </div>
      </div>
    </div>
  );
}

export default App;
