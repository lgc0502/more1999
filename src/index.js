import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var root =  document.getElementById('root');
ReactDOM.render(<App {...(root.dataset)}/>,root);
registerServiceWorker();
var http = require("http");
setInterval(function(){
    http.get("https://moretest.herokuapp.com");
},300000)


