import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
<App />
=======
import {BrowserRouter} from 'react-router-dom';


ReactDOM.render(
<BrowserRouter>
    <App />
>>>>>>> 3e9a8b8845abba8e4583dcfbf39e88cb0b4969f7
</BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();
