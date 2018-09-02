import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render( 
    <App {...(root.dataset)}/>, document.getElementById('root'));
registerServiceWorker();

/*avoid heroku sleepy*/ 
var http = require("http");
setInterval(function(){
    http.get("https://moretest.herokuapp.com");
},300000)


