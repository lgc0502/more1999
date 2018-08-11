import React, { Component } from "react"
import {Switch,Route,PropsRoute,Link} from 'react-router-dom'
import MainMenu from './MainMenu'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'

class App extends Component {
  constructor(props){
    super(props)
  }
  
  
  render() {
    
    return (
      
        <div className="App"> 
          <header className="App-header">
            <MainMenu/>
          </header>
            <Switch>
              <PropsRoute path='/' component={Historicalstatistics} data={this.props}/>
              <Route path='/instantnotification' component={Instantnotification}/>
            </Switch>
        </div>
       
    )
  }
}

export default App