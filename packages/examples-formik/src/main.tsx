import React from 'react';
import ReactDOM from 'react-dom/client';
import { config as niceFormConfig } from '@ebay/nice-form-react';
import formikAdapter from '@ebay/nice-form-react/adapters/formikAdapter';
import formikMuiAdapter from '@ebay/nice-form-react/adapters/formikMuiAdapter';
import App from './App.tsx';
import './index.css';

niceFormConfig.addAdapter(formikAdapter);
niceFormConfig.addAdapter(formikMuiAdapter);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
