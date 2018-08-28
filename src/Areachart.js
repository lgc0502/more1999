import React,{Component} from 'react';
import {
  XYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Crosshair
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
      typeCollection : Object.keys(props.res.Area[Object.keys(props.res.Area)[0]]),
      crosshairValues: []
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
      })
      
    })
  }
  componentWillUnmount(){
    this.eventEmitter.removeAllListeners()
  }
  
  render() { 
    const timestamp_begin = new Date(this.state.dateCollection[0])
    const timestamp_end = new Date(this.state.dateCollection[6]) 
    const {dateCollection,typeCollection} = this.state
   
    return (
      <XYPlot
        onMouseLeave={()=>this.setState({crosshairValues:[]})}
        width={window.innerWidth*0.75}
        height={window.innerWidth*0.35}
        className="ui container centered grid"
        Range={[0,window.innerWidth*0.7]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis  
           XDomain={[0,8]}
           xRange={[10,window.innerWidth*0.7]}
           tickFormat={(d)=>formatTime(d)}
           tickTotal={7}
           style={{
            line:{stroke:"#ADDDE1"},
            text:{fill:"#6b6b76",fontWeight: 400}
          }}
        />
         {typeCollection.map((d,i)=>(
              <AreaSeries
                onNearestX={(value,{index})=>
                      this.setState({crosshairValues:dateCollection.map((d1,i1)=>{  
                        console.log("ij")
                        return({x:new Date(d1),y: this.props.res.Area[d1][d] +(450-30*i),y0:450-30*i})
                      }).map(d=>d[index])})}
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
          <Crosshair values={this.state.crosshairValues}/>
          </XYPlot>  
    );
  }
}
export default Areachart