import React, { Component } from "react"
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import MainMenu from './MainMenu'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'

class App extends Component {
  constructor(props){
    super(props)
  }
  
  
  render() {
    console.log(this.props)
    
    return (
      <Router>
        <div className="App"> 
          <header className="App-header">
            <MainMenu/>
          </header>
            <div>
              <Route exact path='/' component={Historicalstatistics} {...this.props}/>
              <Route exact path='/instantnotification' component={Instantnotification}/>
            </div>
        </div>
      </Router> 
    )
  }
}

export default App