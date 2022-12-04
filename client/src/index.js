import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import './index.css'
import {store} from './redux_1/store';
import axios from 'axios';
// import { positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true

if (localStorage.LoggedInUser) {
  const { token } = JSON.parse(localStorage.LoggedInUser);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// const options = {

//   position: positions.BOTTOM_CENTER,
//   timeout: 2000,
//   offset: '20px',
// }
root.render(
  <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
        <App />
    {/* </AlertProvider> */}
  </Provider>
);

