import React, { Component } from "react"
import Map_init from './townMap'
import Map from './Map'
import Dropdown from './Dropdownsearch'
import Areachart from './Areachart'
import Donutchart from './Donutchart'
import ButtonGroup from './ButtonGroup'
import emitter from './events'
import postApi from './postApi'
import date from './Date'
class App extends Component {
  constructor(props){
    super(props)
   
    this.state = {
      isLoading: true,
      request_data: {},
      date:null
    }
    
  }
  componentDidMount(){
    postApi.requertPost('台南市','null').then(data => {
      this.setState({
        request_data:data,
        isLoading : false
      })
   })
    this.setState({
      date:date.lastweekdate()
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
    
   if(isLoading){
     return (
      <div class="loaddata">
        <h3 id="load_text">正在接通1999 ......</h3>
      </div>
     )
   }
    return (
      
      <div> 
        <h1 class="date">{this.state.date.begin+" - "+this.state.date.end}</h1>
        <div className="ui container" id="Donutchart">
          <Donutchart
            {...request_data}/> </div>
        <div className="ui container" id="dropdown">
          <Dropdown/></div>
        <div className="ui container" id="leafletmap">
          <Map
            data={this.props}/></div>

        <div className="ui container" id="ButtonGroup">
          <ButtonGroup/></div>
        <div className="ui container" id="Areachart">
          <Areachart
            {...request_data}/> </div>
  </div> 
    )
  }
}

export default App