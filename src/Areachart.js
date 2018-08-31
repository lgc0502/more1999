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
import ReactDOM from 'react-dom';
const Palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple']
const formatTime= timeFormat('%m/%d %a')
const ONE_DAY = 86400000
class Areachart extends Component {

  constructor(props) {
    super(props)
    this.state= {
      width:props.width||-1,
      height:props.height||-1,
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
  updateSize(){
    try{
      const parentDom = ReactDOM.findDOMNode(this).parentNode;
      let {width,height} = this.props;
      
      if(!width){
        width = parentDom.offsetWidth;
        
        if(width>600){
          width = width
          height = width*0.45
        }else{
          width = width
          height = width
        }
      }
      
      this.setState({width,height});
    }catch(ignore){}
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
    const timestamp_begin = new Date(this.state.dateCollection[0]).getTime();
    const {dateCollection,typeCollection} = this.state

    
    const data = typeCollection.map((d,i)=>(
        dateCollection.map((d1,i1)=>{  
            return({x:timestamp_begin+i1*ONE_DAY,y: this.props.res.Area[d1][d] })
        })
      ))
    
    return (
      <XYPlot
        onMouseLeave={()=>this.setState({crosshairValues:[]})}
        width={this.state.width}
        height={this.state.height}
        className="ui container centered grid"
       
        Range={[0,window.innerWidth*0.7]}
        xType="time">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis  
           xDomain={[timestamp_begin-ONE_DAY,timestamp_begin+6*ONE_DAY]}
           tickFormat={(d)=>formatTime(d)}
           tickTotal={7}
           tickLabelAngle={(this.state.width>600?0:90)}
           style={{
            line:{stroke:"#ADDDE1"},
            text:{fill:"#6b6b76",fontWeight: 400}
          }}
        />
         {typeCollection.map((d,i)=>(
              <AreaSeries
                  onNearestX={(value,{index})=>{
                      this.setState({crosshairValues:data.map(d => {return d[index]})})
                      }}
                  key={`AreaSeries-${d}`}
                  className="area-series-example"
                  curve="curveMonotoneX"
                  data={
                    dateCollection.map((d1,i1)=>{  
                      return({x:timestamp_begin+i1*ONE_DAY,y: this.props.res.Area[d1][d] +(450-30*i),y0:450-30*i})
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