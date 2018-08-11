import React, { Component } from "react"
import {Router,Route,PropsRoute,Link} from 'react-router-dom'
import Header from './Header'
import Main from './Main'


class App extends Component {
  constructor(props){
    super(props)
  }
  
  
  render() {
    
    return (
        <div className="App"> 
          <Header/>
          <Main {...this.props}/>    
        </div>
    )
  }
}

export default App