import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
        <App {...(root.dataset)}/>
    </BrowserRouter>
),document.getElementById('root'))


registerServiceWorker();
var http = require("http");
setInterval(function(){
    http.get("https://moretest.herokuapp.com");
},300000)


