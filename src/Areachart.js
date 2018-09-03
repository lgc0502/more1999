import React,{Component} from 'react';
import {
  XYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Crosshair,
  YAxis
} from "react-vis";
import {timeFormat} from 'd3-time-format'
import emitter from './events'
import ReactDOM from 'react-dom';
const Palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple'];
const formatDay= timeFormat('%a');
const ONE_DAY = 86400000
class Areachart extends Component {

  constructor(props) {
    super(props)
    this.state= {
      width:props.width||0,
      height:props.height||0,
      dateCollection : Object.keys(props.data), 
      //typeCollection : Object.keys(props.data[Object.keys(props.data)[0]]),
      crosshairValues: []
    }
  }
  updateSize(){
    try{
      const parentDom = ReactDOM.findDOMNode(this).parentNode;
      let {width,height} = this.props;
      
      if(!width){
        width = parentDom.offsetWidth;
        width = width*0.95
        height = width*0.9
      
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
    const data = //typeCollection.map((d,i)=>(
      dateCollection.map((date,i1)=>{  
        if(this.props.id==="DailyNum")
          return({x:timestamp_begin+i1*ONE_DAY,y: this.props.data[date] })
        else if(this.props.id==="HourNum")
          return({x:date,y: this.props.data[date] })
         
      })
   // ))
   
    return (
        <XYPlot
          width={this.state.width}
          height={this.state.height}
          className="Areachart"
          xRange={[0,this.state.width*0.9]}
          xType={(this.props.id==="DailyNum"?'time':'linear')}
          onMouseLeave={()=>this.setState({crosshairValues:[]})}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <YAxis/>
          <XAxis  
            xDomain={(this.props.id==="DailyNum"?[timestamp_begin,timestamp_begin+6*ONE_DAY]:[dateCollection[0],dateCollection[23]])}
            xRange={[0,this.state.width*0.8]}
            tickFormat={(this.props.id==="DailyNum"?(d)=>formatDay(d):(d)=>{return d+":00"})}
            tickTotal={(this.props.id==="DailyNum"?3:6)}
            style={{
              line:{stroke:"#ADDDE1"},
              text:{fill:"#6b6b76",fontWeight: 400}
            }}
          />
          {/* {typeCollection.map((type,typeIndex)=>{ */}
                <AreaSeries
                    // onNearestX={(value,{index})=>{
                    //     this.setState({crosshairValues:data.map(d => {return d[index]})})
                    //     }}
                    onNearestX= {(value, {index}) =>
                    this.setState({crosshairValues:[{x:value.x,y:value.y}]})}
                    key={`AreaSeries-${this.props.id}`}
                    curve="curveMonotoneX"
                    data={
                      dateCollection.map((date,dateIndex)=>{  
                        if(this.props.id==="DailyNum"){
                          return({x:timestamp_begin+dateIndex*ONE_DAY,y: this.props.data[date]/* +(450-30*typeIndex),y0:450-30*typeIndex*/})
                        }
                        else if(this.props.id==="HourNum"){
                          return({x:date,y: this.props.data[date]/* +(450-30*typeIndex),y0:450-30*typeIndex*/})
                        }
                      })
                    }
                    // color={Palette[typeIndex]}
                  />    
                  {/* }
              )} */}
            <Crosshair values={this.state.crosshairValues}/>
            </XYPlot>  
    );
  }
}
export default Areachart