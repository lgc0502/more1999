import React, { Component } from "react";
import React_leaflet from './React_leaflet.js';
import Dropdown from './Dropdownsearch.js';
import Areachart from './Areachart.js';
import Donutchart from './Donutchart.js';
import ButtonGroup from './ButtonGroup.js';
import emitter from './events.js';
import postApi from './postApi.js';
import date from './Date.js';

class Historicalstatistics extends Component {
  
  constructor(props){
    super(props)
   
    this.state = {
      isLoading: true,
      request_data: {},
      date:null,
      hotzonedata:{},
      villdata:{}
    }
  }
  componentDidMount(){
    postApi.requertPost('./village_visualization',{
      params:{
        town:'台南市',
        village:'null',
        begin_date:date.lastweekdate().begin,
        end_date:date.lastweekdate().end,
      }
    }).then(data => {
      this.setState({
        //request_data:data,
        hotzonedata:data,
        villdata:data,
        isLoading : false
      })
   })
    this.setState({
      date:date.lastweekdate()
    })
  }
 
  componentDidUpdate(){
    console.log("share data in history")
    this.eventEmitter = emitter.addListener("get_requestdata",(data)=>{   
        this.setState({
          //request_data:{...data},
          villdata:{...data}
        },()=>{console.log("res data again")})
    })
  }
  componentWillUnmount(){
  
    this.eventEmitter.removeAllListeners()
  }
  render(){
    
    const {isLoading,hotzonedata,villdata} = this.state
    console.log("re-render history")
    
    if(isLoading){
      return (
        <div class="loaddata">
          <h3 id="load_text">正在接通1999 ......</h3>
        </div>
      )
    }
    return (   
        <div>
            <h1 className="date">{this.state.date.begin+"  -  "+this.state.date.end}</h1>
            <h1 className="tainanstate">大台南各類通報</h1>
            
            <div className="ui container" id="Donutchart">
              <Donutchart
                {...hotzonedata}/>
            </div>
            
            <div className="hotzone">
              <h1 class="tainanstate">通報熱區</h1>
              <div className="ui container" id="Map">
                  <React_leaflet
                    data={this.props.towngeo}
                    {...hotzonedata}/>
              </div>
            </div>

            <h1 class="tainanstate">鄉鎮里級查詢</h1>
            <div className="ui container" id="dropdown">
              <Dropdown/>
            </div>
            <div className="ui container" id="ButtonGroup">
              <ButtonGroup/>
            </div>
            <div className="ui container" id="Areachart">
              <Areachart
                {...villdata}/>
            </div>
        </div>
    )
  }
}
export default Historicalstatistics
    