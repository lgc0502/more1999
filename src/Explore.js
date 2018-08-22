import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';
import geolocation from './geolocation';
import postApi from './postApi.js';
import {
    XYPlot,
    XAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries
  } from "react-vis";
import {timeFormat} from 'd3-time-format'
const formatTime= timeFormat('%H')
const transtype = {"parking":"違規停車","light":"路燈故障","noise":"噪音舉發","aisle":"騎樓舉發","road":"道路維修","traffic":"交通運輸","dirty":"髒亂污染","pipe":"民生管線" ,"animal":"動物救援"}
const typecolor = {"parking":'#2e1f54',"light":'#f00a36',"noise":'#ed3b21',"aisle":'#ff6908',"road":'#ffc719',"traffic":'#598c14',"dirty":'#335238',"pipe":'#4a8594' ,"animal":'#706357'};
class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:'',
            lat_lng:'',
            category:{},
            time:{},
            cases:{},
            isLoading:true
        };
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
              category:data.res.category,//object
              time:data.res.hour,//object
              case:data.res.detail,//array
              isLoading : false
            })
         })
    }
    componentDidMount(){
        geolocation.getLocation().then(d=>{
            
            this.setState({
                lat_lng:[22.997,120.211]//[d.coords.latitude,d.coords.longitude],
            },()=>{
                postApi.requertPost('./position',{
                
                    params:{
                      lat:22.997,//d.coords.latitude,
                      lon:120.211,//d.coords.longitude,
                    }
                  }).then(data => {
                      console.log(data)
                        this.setState({
                            address:data.res.address,
                            category:data.res.category,//object
                            time:data.res.hour,//object
                            cases:data.res.detail,//array
                            isLoading : false
                        })
                 })
            })
        })
    }
    render(){
       console.log("explore")
       console.log(this.state)
       const beginhour=0;
       const endhour=23; 
       if(this.state.isLoading){
           console.log("loading explore")
            return (
             <div className="loaddata">
               <h3 id="load_text">還在找 ......</h3>
             </div>
            )
        }
        return (
            <div>
                <h3>搜尋地點 查看通報狀況</h3>
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
                    point={this.state.lat_lng} 
                    address={this.state.address}
                    category={this.state.category}//object
                    time={this.state.time}//object
                    cases={this.state.cases}//array
                    data={this.props.towngeo}/>
                 <div className="ui segment">
                    {Object.keys(this.state.category).map((t)=>(
                        <div className="explore-category">
                        <svg width="20" height="20">
                        <circle style={{
                                cx:"10",
                                cy:"10",
                                r:"4",
                                fill:typecolor[t] }}/></svg>
                        <span>{transtype[t]} : </span>
                        <span>{this.state.category[t]}</span>
                        </div>
                    ))
                    }
                 </div>
                 <XYPlot
                    width={window.innerWidth*0.75}
                    height={window.innerWidth*0.35}
                    className="ui container centered grid"
                    Range={[window.innerWidth*0.1,window.innerWidth*0.6]}
                   
                >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis  
                XDomain={[beginhour,endhour]}
                xRange={[window.innerWidth*0.1,window.innerWidth*0.6]}
                tickFormat={(d)=>formatTime(d)}
                tickTotal={24}
                xType="time"
                style={{
                    line:{stroke:"#ADDDE1"},
                    text:{fill:"#6b6b76",fontWeight: 400}
                }}
                />
                    <AreaSeries
                        className="area-series-example"
                        curve="curveMonotoneX"
                        data={
                            Object.keys(this.state.time).map((d)=>{  
                                return({x:new Date(d),y: this.state.time[d]})
                            })
                        }
                        />    
                </XYPlot>  
            </div>
        )
    }
}
export default Explore