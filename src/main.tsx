import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppEntry } from './domain/app';
import { GlobalStyles } from './styles/GlobalStyles';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <AppEntry />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
