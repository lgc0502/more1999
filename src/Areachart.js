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
      type: null
    }
  }
  componentWillMount(){
    this.setState({
      typeCollection : Object.keys(this.state.data[this.state.dateCollection[0]])
    })
  }
  componentDidUpdate(){
    this.eventEmitter = emitter.addListener("showarea",(selectedtype)=>{
      this.setState({
          type:selectedtype,
      })
  })
  }
  render() { 
    const timestamp_begin = new Date(this.state.dateCollection[0])
    const timestamp_end = new Date(this.state.dateCollection[0]) 
    const formatTime = timeFormat('%B %d')
    const {data,dateCollection,typeCollection} = this.state
    console.log(this.state.type)
    return (
      <XYPlot
        width={window.innerWidth*0.75}
        height={window.innerWidth*0.35}
        className="ui container centered grid"
        Range = {[window.innerWidth*0.1,window.innerWidth*0.6]}
       >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis  
           XDomain = {[timestamp_begin,timestamp_end]}
           xRange = {[window.innerWidth*0.1,window.innerWidth*0.6]}
           tickFormat = {(d)=>formatTime(d)}
           tickTotal = {6}
           xType="time"
           style={{
            line:{stroke:"#ADDDE1"},
            text:{fill:"#6b6b76",fontWeight: 400}
          }}
        />
         {typeCollection.map((d,i)=>(
              <AreaSeries
                  key = {`AreaSeries-${i}`}
                  className="area-series-example"
                  curve="curveMonotoneX"
                  data = {
                    dateCollection.map((d1,i1)=>{  

                      return({x:new Date(d1),y: data[d1][d] +(9-3*i),y0:9-3*i})
                    })
                  }
                  color = {Palette[i]}
                  opacity = {1}  
                />    
              )
            )}
          </XYPlot>  
    );
  }
}
export default Areachart