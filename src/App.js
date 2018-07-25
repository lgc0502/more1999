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
      isLoading: true,
      request_data: {},
    }
    
  }
  componentDidMount(){
    postApi.requertPost('台南市','null').then(data => {
      this.setState({
        request_data:data,
        isLoading : false
      })
   })
  }
  componentDidUpdate(){
    this.eventEmitter = emitter.addListener("get_requestdata",(data)=>{   
        this.setState({
          request_data:{...data},
        })
    })
  }
  render() {
    const {isLoading,request_data} = this.state
   if(isLading){
     return (
       <p>loading!!!</p>
     )
   }
    return (
     
      <div> 
        <div className="ui container" id="Donutchart">
          <Donutchart
            {...request_data}/> </div>
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