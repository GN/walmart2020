import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <div className="d-flex flex-column min-vh-100">
        <App />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
