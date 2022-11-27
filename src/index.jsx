import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles.less';
import { AppProvider } from './contexts/AppProvider/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
