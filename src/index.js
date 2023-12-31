import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import $ from "jquery";
import MediaContextProvider from './Context/MediaStore';
import AuthContextProvider, { AuthContext } from './Context/AuthStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
      <MediaContextProvider>

        <App />

      </MediaContextProvider>

    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// $(document).bind("contextmenu",function(e) {
//  e.preventDefault();
// });

// $(document).keydown(function(e){
//     if(e.which === 123){
//        return false;
//     }
// });
