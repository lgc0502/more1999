import React,{Component} from 'react';
import {
  XYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from "react-vis";
import {timeFormat} from 'd3-time-format'
import emitter from './events'

const Palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple']
const formatTime= timeFormat('%m/%d %a')
class Areachart extends Component {

  constructor(props) {
    super(props)
    this.state= {
      dateCollection : Object.keys(props.res.Area), 
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
      },
      typeCollection : Object.keys(props.res.Area[Object.keys(props.res.Area)[0]])
    }
  }
  componentDidMount(){
    this.eventEmitter = emitter.addListener("showarea",(selectedtype)=>{
      this.setState({
          type:{
            'parking':(selectedtype=== '違規停車')?1:0,
            'light':(selectedtype=== '路燈故障')?1:0,
            'noise':(selectedtype=== '噪音舉發')?1:0,
            'aisle':(selectedtype=== '騎樓舉發')?1:0,
            'road':(selectedtype=== '道路維修')?1:0,
            'traffic':(selectedtype=== '交通運輸')?1:0,
            'dirty':(selectedtype=== '髒亂污染')?1:0,
            'pipe':(selectedtype=== '民生管線')?1:0,
            'animal':(selectedtype=== '動物救援')?1:0, 
          }
      },()=>console.log("changetype"))
      
    })
  }
  componentWillUnmount(){
    this.eventEmitter.removeAllListeners()
  }
  
  render() { 
    const timestamp_begin = new Date(this.state.dateCollection[0])
    const timestamp_end = new Date(this.state.dateCollection[0]) 
    const {dateCollection,typeCollection} = this.state
    console.log("re-render areachart")
    return (
      <XYPlot
        width={window.innerWidth*0.75}
        height={window.innerWidth*0.35}
        className="ui container centered grid"
        Range={[window.innerWidth*0.1,window.innerWidth*0.7]}
       >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis  
           XDomain={[timestamp_begin,timestamp_end]}
           xRange={[0,window.innerWidth*0.65]}
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
                      return({x:new Date(d1),y: this.props.res.Area[d1][d] +(450-30*i),y0:450-30*i})
                    })
                  }
                  color={Palette[i]}
                  opacity={(this.state.type[d]===1)?1:0.2}  
                />    
              )
            )}
          </XYPlot>  
    );
  }
}
export default Areachart