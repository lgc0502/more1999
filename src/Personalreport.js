import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';
import geolocation from './geolocation';
import postApi from './postApi.js';
import ReactDOM from 'react-dom';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries,
    Crosshair
  } from "react-vis";
import {timeFormat} from 'd3-time-format'
import Areachart from './Areachart.js'
import Barchart from './Barchart.js';

const formatTime= timeFormat('%H')
const transtype = {"parking":"違規停車","light":"路燈故障","noise":"噪音舉發","aisle":"騎樓舉發","road":"道路維修","traffic":"交通運輸","dirty":"髒亂污染","pipe":"民生管線" ,"animal":"動物救援"}
const typecolor = {"parking":'#2e1f54',"light":'#f00a36',"noise":'#ed3b21',"aisle":'#ff6908',"road":'#ffc719',"traffic":'#598c14',"dirty":'#335238',"pipe":'#4a8594' ,"animal":'#706357'};
class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            width:props.width||-1,
            location:'',
            lat_lng:props.position,
            category:props.Detail.category,
            time:props.Detail.hour,
            cases:props.Detail.detail,
            address:props.Detail.address,
            isLoading:true,
            crosshairValues: []
        };
    }
    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          
          if(!width){
            width = parentDom.offsetWidth;
            
            if(width>600){
              width = width
              height = width*0.2
            }else{
              width = width
              height = width*0.2
            }
          }
          
          this.setState({width,height});
        }catch(ignore){}
      }
    updateInputValue(evt){
        this.setState({
            location:evt.target.value
        });
    }
    handleclick(){
        
        postApi.requertPost('./explore',{
            params:{
              location:this.state.location,
            }
          }).then(data => {
              
            this.setState({
              lat_lng:data.res.position,//array
              address:this.state.location,
              category:data.res.category,//object
              time:data.res.hour,//object
              cases:data.res.detail,//array
              isLoading : false
            })
         })
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.updateSize.bind(this));
      }
    render(){
     
       const beginhour=0;
       const endhour=23; 
       const {lat_lng,category,time,cases,address} = this.state;
       const {Category,Time,DailyNum,HourNum} = this.props;
       if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">還在找 ......</h3>
             </div>
            )
        }
       
        return (
            <div>
                <h2>搜尋地點 查看通報狀況</h2>
                <div className="ui large input">
                    <input type="text" placeholder="Search..." value={this.state.location} onChange={evt=>this.updateInputValue(evt)}/>
                    <button className="ui icon button" onClick={this.handleclick.bind(this)}>
                        <i class="search icon"></i>
                    </button>
                </div>
                <div className='current-location'>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{this.state.address}</span>
                </div>
                <Exploremap 
                    point={lat_lng} 
                    address={address}
                    category={category}//object
                    time={time}//object
                    cases={cases}//array
                    data={this.props.datapath}/>
                 <div className="Map-description">
                    <Barchart
                        id="Category"
                        data={Category}/>
                    <Barchart
                        id="Time"
                        data={Time}/>
                    <Areachart
                        id="DailyNum"
                        data={DailyNum}/>
                    <Areachart
                        id="HourNum"
                        data={HourNum}/>
                </div>
                
            </div>
        )
    }
}
export default Explore