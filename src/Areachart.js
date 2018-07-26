import React,{Component} from 'react';
import {
  XYPlot,
  XAxis,
  //YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from "react-vis";
import {timeFormat} from 'd3-time-format'
import emitter from './events'
const Palette = ["#5E86C1","#33E6CC","#7400A1","#E6005C","#A52A2A","#FF2400","#FFBF00","	#9ACD32","#1E90FF"]
class Areachart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dateCollection : Object.keys(props.res.Area), 
      data: props.res.Area  ,
      type: {
        'parking':1,
        'light':1,
        'noise':1,
        'aisle':1,
        'road':1,
        'traffic':1,
        'dirty':1,
        'pipe':1,
        'animal':1 
      }
    }
  }
  componentWillMount(){
    this.setState({
      typeCollection : Object.keys(this.state.data[this.state.dateCollection[0]])
    })
  }
  componentWillUpdate(){
    console.log("in the state")
    this.eventEmitter = emitter.addListener("showarea",(selectedtype)=>{
      console.log(selectedtype)
      this.setState({
          type:{
            'parking':selectedtype === 'parking'?1:0,
            'light':selectedtype === 'light'?1:0,
            'noise':selectedtype === 'noise'?1:0,
            'aisle':selectedtype === 'aisle'?1:0,
            'road':selectedtype === 'road'?1:0,
            'traffic':selectedtype === 'traffic'?1:0,
            'dirty':selectedtype === 'dirty'?1:0,
            'pipe':selectedtype === 'pipe'?1:0,
            'animal':selectedtype === 'animal'?1:0, 
          }
      })
    })
  }
  render() { 
    const timestamp_begin = new Date(this.state.dateCollection[0])
    const timestamp_end = new Date(this.state.dateCollection[0]) 
    const formatTime = timeFormat('%B %d')
    const {data,dateCollection,typeCollection,type} = this.state
    
    return (
      <XYPlot
        width={window.innerWidth*0.75}
        height={window.innerWidth*0.35}
        className="ui container centered grid"
        Range={[window.innerWidth*0.1,window.innerWidth*0.6]}
       >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis  
           XDomain={[timestamp_begin,timestamp_end]}
           xRange={[window.innerWidth*0.1,window.innerWidth*0.6]}
           tickFormat={(d)=>formatTime(d)}
           tickTotal={6}
           xType="time"
           style={{
            line:{stroke:"#ADDDE1"},
            text:{fill:"#6b6b76",fontWeight: 400}
          }}
        />
         {typeCollection.map((d,i)=>(
              <AreaSeries
                  key={`AreaSeries-${d}`}
                  className="area-series-example"
                  curve="curveMonotoneX"
                  data={
                    dateCollection.map((d1,i1)=>{  

                      return({x:new Date(d1),y: data[d1][d] +(9-3*i),y0:9-3*i})
                    })
                  }
                  color={Palette[i]}
                  opacity={type.d===1?1:0.2}  
                />    
              )
            )}
          </XYPlot>  
    );
  }
}
export default Areachart