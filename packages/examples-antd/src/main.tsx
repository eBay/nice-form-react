import React from 'react';
import ReactDOM from 'react-dom/client';
// import niceFormConfig from '@ebay/nice-form-react/config';
import { config as niceFormConfig } from '@ebay/nice-form-react';
import antdAdapter from '@ebay/nice-form-react/adapters/antdAdapter';
import App from './App';
import './index.css';

niceFormConfig.addAdapter(antdAdapter);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
