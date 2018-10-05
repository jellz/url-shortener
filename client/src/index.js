import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_BASE = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000' : 'https://api.jlz.fun';

export { API_BASE };

ReactDOM.render(<App />, document.getElementById('root'));