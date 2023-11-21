import React from 'react';
import ReactDOM from 'react-dom/client';
import UsersApp from './Users';
import GlobalStyle from './globalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <UsersApp />
  </React.StrictMode>
);
