import React, { Component } from "react"
import Map from './townMap'
import Dropdown from './Dropdownsearch'
import Areachart from './Areachart'
import Donutchart from './Donutchart'
import ButtonGroup from './ButtonGroup'
import emitter from './events'
import postApi from './postApi'

class App extends Component {
  constructor(props){
    super(props)
   
    this.state = {
      request_data: {},
    }
    
  }
  componentWillMount(){
    postApi.requertPost('台南市','null').then(data => {
      this.setState({
        request_data:data,
      })
   })
  }
  componentDidUpdate(){
    this.eventEmitter = emitter.addListener("get_requestdata",(data)=>{   
        this.setState({
          request_data:data,
        })
    })
  }
  render() {
    console.log(this.state.request_data) 
   if(this.state.request_data.length === 0){
     return false
   }
    return (
      <div> 
        <div className="ui container" id="Donutchart">
          <Donutchart
            {...this.state.request_data}/> </div>
        <div className="ui container" id="dropdown">
          <Dropdown/></div>
        <div className="ui container" id="Map">
          <Map
            data = {this.props}/></div>
        <div className="ui container" id="ButtonGroup">
          <ButtonGroup/></div>
        <div className="ui container" id="Areachart">
          <Areachart
            data={this.state.request_data}/> </div>
       </div> 
    )
  }
}

export default App