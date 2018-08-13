import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <App {...(root.dataset)}/>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

var http = require("http");
setInterval(function(){
    http.get("https://moretest.herokuapp.com");
},300000)


