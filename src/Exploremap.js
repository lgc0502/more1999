import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON,Marker,Circle,CircleMarker,LayerGroup,Popup} from 'react-leaflet'
import L from 'leaflet'
import Areachart from './Areachart.js'
import Barchart from './Barchart.js';                                          

const iconUrl={"parking":'Asset1.png',"light":'Asset2.png',"noise":'Asset3.png',"aisle":'Asset4.png',"road":'Asset5.png',"traffic":'Asset6.png',"dirty":'Asset7.png',"pipe":'Asset8.png' ,"animal":'Asset9.png'}
const transtype = {"parking":"違規停車","light":"路燈故障","noise":"噪音舉發","aisle":"騎樓舉發","road":"道路維修","traffic":"交通運輸","dirty":"髒亂污染","pipe":"民生管線" ,"animal":"動物救援"}
function createicon(url){
    return L.icon({
        iconUrl:url,
        iconSize:[38,38],
        iconAnchor:[19,19],
        popupAnchor:[-3,-76],  
    });
}
class Exploremap extends Component{
    constructor(props){
        super(props)
        this.state = {
            zoom:15,
            minZoom:11,
            maxZoom:30,
            data:{},
            isLoading:true,
           
        }
        
    }
    handlebtnClick(){
        this.refs.map.leafletElement.setView(this.props.position,15);
    }
   componentDidMount(){
    fetch('/static/data/tainan.json')
        .then(res => {
            if(res.status !== 200){
                console.log(`There was a problem: ${res.status}`)
                return 
            }
            res.json().then(topology => {
                this.setState({
                    data:topology.features,
                    isLoading:false
                }) 
                
            })
        })
   }
   
    render(){

        const {Category,DailyNum,cases,HourNum,Time,position}= this.props
        if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">等一下 ......</h3>
             </div>
            )
          }
       
        const myviews = L.icon({
            iconUrl:`${this.props.data.icon}myview.png`,
            iconSize:[38,38],
            iconAnchor:[19,19],
            popupAnchor:[-3,-76],  
        });
        
        return(
            <div>
               
                <Map ref='map' 
                     className="Personal-chart" 
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
                                fillColor:'black',
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                fillOpacity: 0.2
                            }}
                        }
                       
                    />  
                    <Circle center={position} color="red" fillColor='#f03' fillOpacity={0.5} radius={1017}></Circle>
                    <Marker position={position} icon={myviews}></Marker>    
                    <LayerGroup>
                        {cases.map((d)=>(                              
                            <Marker position={d.position} icon={createicon(this.props.data.icon+iconUrl[d.category])}>
                                <Popup>{transtype[d.category]}<br/>{d.description}<br/>{d.date}<br/>{d.status}</Popup>
                            </Marker>))
                        }
                    </LayerGroup> 
                </Map>
                <div className="Personal-description">
                    <div className="ui segment description-block">
                        <Barchart
                            id="Category"
                            data={Category}/>
                    </div>
                    <div className="ui segment description-block">
                        <Barchart
                            id="Time"
                            data={Time}/>
                    </div>
                    <div className="ui segment description-block">
                        <Areachart
                            id="DailyNum"
                            data={DailyNum}/>
                    </div>
                    <div className="ui segment description-block">
                        <Areachart
                            id="HourNum"
                            data={HourNum}/>
                    </div>
                </div>
                
            </div>
        )        
    }
}
export default Exploremap