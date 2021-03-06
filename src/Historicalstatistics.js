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
    let dateForres = false;
    let dateForshow = true;
    postApi.requertPost('./village_visualization',{
      params:{
        town:'台南市',
        village:'null',
        begin_date:date.lastweekdate(dateForres).begin,
        end_date:date.lastweekdate(dateForres).end,
      }
    }).then(data => {
      this.setState({
        request_data:data,
        villdata:data,
        isLoading : false
      })
   })
    this.setState({
      date:date.lastweekdate(dateForshow)
    })
  }
 
  componentDidUpdate(){
   
    this.eventEmitter = emitter.addListener("get_requestdata",(data)=>{   
        this.setState({
          villdata:{...data}
        })
    })
  }
  componentWillUnmount(){
    this.eventEmitter.removeAllListeners()
  }
  render(){
    
    const {isLoading,request_data,villdata} = this.state
    
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
            
            <div id="Donutchart">
              <Donutchart
                {...request_data}/>
            </div>
            
            <div className="hotzone">
              <h2 style={{clear:"left"}}>通報熱區</h2>
              <div id="Map">
                  <React_leaflet
                    data={this.props.towngeo}
                    {...request_data}/>
              </div>
            </div>

            <h2 >鄉鎮里級查詢</h2>
            <div className="ui container" id="dropdown">
              <Dropdown/>
            </div>
            <div id="ButtonGroup">
              <ButtonGroup/>
            </div>
            <div id="Areachart">
              <Areachart
                {...villdata}/>
            </div>
        </div>
    )
  }
}
export default Historicalstatistics
    