import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';
import codeBasic from './examples/Basic.tsx?raw';
import codeDynamicFields from './examples/DynamicFields.js?raw';
import codeFieldCondition from './examples/FieldCondition.js?raw';
import codeAsyncDataSource from './examples/AsyncDataSource.js?raw';
import codeMultipleColumns from './examples/MultipleColumns.js?raw';
import codeComplexLayout from './examples/ComplexLayout.js?raw';
import codeMultipleSections from './examples/MultipleSections.js?raw';
import codeSingleField from './examples/SingleField.js?raw';
import codeValidation from './examples/Validation.js?raw';
import codeCoordinated from './examples/Coordinated.js?raw';
import codeFormInModal from './examples/FormInModal.js?raw';
import codeCustomComponent from './examples/CustomComponent.js?raw';
import codeViewEdit from './examples/ViewEdit.js?raw';
import codeMixed from './examples/Mixed.js?raw';
import codeWizard from './examples/Wizard.js?raw';
import codeSimple from './examples/Simple.js?raw';
import codeViewMode from './examples/ViewMode.js?raw';
import codeFormList from './examples/FormList.js?raw';
import codeFormListManual from './examples/FormListManual.tsx?raw';

type CodeMap = {
  [key: string]: string;
};

const codeMap: CodeMap = {
  basic: codeBasic,
  'view-edit': codeViewEdit,
  'dynamic-fields': codeDynamicFields,
  'field-condition': codeFieldCondition,
  'async-data-source': codeAsyncDataSource,
  'multiple-columns': codeMultipleColumns,
  'complex-layout': codeComplexLayout,
  'multiple-sections': codeMultipleSections,
  'single-field': codeSingleField,
  validation: codeValidation,
  coordinated: codeCoordinated,
  'form-in-modal': codeFormInModal,
  'custom-component': codeCustomComponent,
  mixed: codeMixed,
  wizard: codeWizard,
  simple: codeSimple,
  'view-mode': codeViewMode,
  'form-list': codeFormList,
  'form-list-manual': codeFormListManual,
};

interface CodeViewerProps {
  code: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  return (
    <pre style={{ fontSize: 14 }}>
      <code className="language-js line-numbers">
        {codeMap[code] || `// Error: code of "${code}" not found`}
      </code>
    </pre>
  );
};

export default CodeViewer;
