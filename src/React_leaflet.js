import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import Legend from './Legend'
import emitter from './events'
import Barchart from './Barchart.js';
import Areachart from './Areachart.js';
import {DiscreteColorLegendItem} from 'react-vis';
function getColor(d){

    return d > 100  ? '#BD0026':
           d > 80  ? '#E31A1C':
           d > 60  ? '#FC4E2A':
           d > 40  ? '#FD8D3C':
           d > 20   ? '#FEB24C':
           d === 0 ? '#FFEDA0':
                    '#FED976';
}
const type=["違規停車","路燈故障","噪音舉發","騎樓舉發","道路維修","交通運輸","髒亂污染","民生管線" ,"動物救援"]
const Palette =['#19CDD7','#DDB27C','#88572C','#FF991F','#F15C17','#223F9A','#DA70BF','#125C77','#5B3075','#9F989A']
class React_leaflet extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:[23.16,120.3],
            zoom:10,
            minZoom:10,
            maxZoom:20,
            isLoading:true,
            selecttown:'台南市',
            selecttownid:'All',
            data:''
        }
        
    }
    highlightFeature(e){
        let layer = e.target;
        layer.setStyle({
            weight:3,
            color: 'rgb(165,160,81)',
            fillOpacity:0.7
        });
        if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
            layer.bringToFront();
        }
    }
    resetHighlight(e){
       this.refs.geojson.leafletElement.resetStyle(e.target);
    }
    showtowninfo(e){
        this.setState({
            selecttown:e.target.feature.properties.TOWNNAME,
            selecttownid:e.target.feature.properties.TOWNID
        },()=>{emitter.emit("boardcasting",this.state.selecttown); })
        
    }
    onEachFeature(feature,layer){
        layer.on({
            mouseover:this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),
            click:this.showtowninfo.bind(this)
        })
    }
    handlebtnClick(){
        this.refs.map.leafletElement.setView([23.15,120.35],10);
    }
   componentDidMount(){
       
   fetch('/static/data/tainan.json')
        .then(res => {
            if(res.status !== 200){
                console.log(`There was a problem: ${res.status}`)
                return 
            }
            res.json().then(topology => {
                
                topology.features.map((d)=>{
                    d.properties.casenum = this.props.Hotzone[d.properties.TOWNID]
                  
                })
                this.setState({
                    data:topology.features,
                    isLoading:false
                }) 
                
            })
        })
   }
    render(){
        if(this.state.isLoading){
            return (
            <div class="load">
                <h3 id="load_text">正在接通1999 ......</h3>
              </div>
            )
          }
        const position =this.state.center;
        const towninfo = this.props.Detail[this.state.selecttownid];
    
        return(
            <div>
                <div className="Map-left">
                    <Map ref='map' 
                        className='Map-chart' 
                        center={position} 
                        zoom={this.state.zoom} 
                        minZoom={this.state.minZoom}
                        maxZoom={this.state.maxZoom}>
                        
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <button className='easy-button-button' onClick={this.handlebtnClick.bind(this)}><i className="fas fa-sync-alt"></i></button>  
                        <GeoJSON
                            ref='geojson'
                            data={this.state.data}
                            style={(feature)=>{
                                return {
                                    fillColor:getColor(feature.properties.casenum),
                                    weight: 2,
                                    opacity: 1,
                                    color: 'white',
                                    fillOpacity: 0.7
                                }}
                            }
                            onEachFeature={this.onEachFeature.bind(this)}
                        /> 
                        <Legend/>         
                    </Map>
                    <div className="left ui segment description-block">
                        <h3>各類通報件數</h3>
                        <Barchart
                            id="Category"
                            data={towninfo.Category}/> 
                    </div>
                    <div className="left ui segment description-block">
                        <h3>平均處理時間</h3>
                        <Barchart
                            id="Time"
                            data={towninfo.Time}/>
                    </div>
                </div>
                <div className="Map-right">
                {/* <DiscreteColorLegendItem
                    colors={Palette}
                    items={type}
                    orientation="horizontal"
                    />  */}
                    <div className="right ui segment description-block">
                        <h3>一週通報</h3>
                        <Areachart
                            id="DailyNum"
                            data={towninfo.DailyNum}/>
                    </div>
                    <div className="right ui segment description-block">
                        <h3>各時段累積通報</h3>
                        <Areachart
                            id="HourNum"
                            data={towninfo.HourNum}/>
                    </div> 
                </div>
            </div>
        )
    }
}
export default React_leaflet