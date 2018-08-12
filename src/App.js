import React, { Component } from "react";
import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
        <div className="App"> 
          <Header/>
          <Main/>
        </div>
    );
  }
}

export default App;