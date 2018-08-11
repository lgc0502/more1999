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
      <Switch>
        <div className="App"> 
          <header className="App-header">
            <MainMenu/>
          </header>
            <div>
              <PropsRoute exact path='/' component={Historicalstatistics} data={this.props}/>
              <Route exact path='/instantnotification' component={Instantnotification}/>
            </div>
        </div>
      </Switch> 
    )
  }
}

export default App