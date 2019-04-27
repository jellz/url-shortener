import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_BASE = window.origin;

export { API_BASE };

ReactDOM.render(<App />, document.getElementById('root'));
