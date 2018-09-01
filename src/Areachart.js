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
const Palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple'];
const formatDay= timeFormat('%a');
const formatHour= timeFormat('%H');
const ONE_DAY = 86400000
const ONE_HOUR = 3600000
class Areachart extends Component {

  constructor(props) {
    super(props)
    this.state= {
      width:props.width||-1,
      height:props.height||-1,
      dateCollection : Object.keys(props.data), 
      typeCollection : Object.keys(props.data[Object.keys(props.data)[0]]),
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
    this.updateSize();
    window.addEventListener('resize',this.updateSize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.updateSize.bind(this));
  }
  
  render() { 
    const timestamp_begin = new Date(this.state.dateCollection[0]).getTime();
    const {dateCollection,typeCollection} = this.state
    const data = typeCollection.map((d,i)=>(
      dateCollection.map((date,i1)=>{  
        if(this.props.id==="DailyNum")
          return({x:timestamp_begin+i1*ONE_DAY,y: this.props.data[date] })
        else if(this.props.id==="HourNum")
          return({x:timestamp_begin+i1*ONE_HOUR,y: this.props.data[date] })
         
      })
    ))
 
    return (
      <div className="ui segment">
        <XYPlot
          width={this.state.width}
          height={this.state.height}
          className="Areachart"
          Range={[0,window.innerWidth*0.7]}
          xType="time"
          onMouseLeave={()=>this.setState({crosshairValues:[]})}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis  
            xDomain={(this.props.id==="DailyNum"?[timestamp_begin-ONE_DAY,timestamp_begin+6*ONE_DAY]:[timestamp_begin-ONE_HOUR,timestamp_begin+23*ONE_HOUR])}
            tickFormat={(d)=>{
              if(this.props.id==="DailyNum")
                formatDay(d)
              else if(this.props.id==="HourNum")
                formatHour(d) }}
            tickTotal={(this.props.id==="DailyNum"?7:24)}
            tickLabelAngle={(this.state.width>600?0:90)}
            style={{
              line:{stroke:"#ADDDE1"},
              text:{fill:"#6b6b76",fontWeight: 400}
            }}
          />
          {typeCollection.map((type,typeIndex)=>(
                <AreaSeries
                    onNearestX={(value,{index})=>{
                        this.setState({crosshairValues:data.map(d => {return d[index]})})
                        }}
                    key={`AreaSeries-${this.props.id}-${type}`}
                    curve="curveMonotoneX"
                    data={
                      dateCollection.map((date,dateIndex)=>{  
                        if(this.props.id==="DailyNum")
                          return({x:timestamp_begin+dateIndex*ONE_DAY,y: this.props.data[date] +(450-30*typeIndex),y0:450-30*typeIndex})
                        else if(this.props.id==="HourNum")
                          return({x:timestamp_begin+dateIndex*ONE_HOUR,y: this.props.data[date] +(450-30*typeIndex),y0:450-30*typeIndex})
                      })
                    }
                    color={Palette[typeIndex]}
                  />    
                )
              )}
            <Crosshair values={this.state.crosshairValues}/>
            </XYPlot>  
      </div>
    );
  }
}
export default Areachart