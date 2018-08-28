import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON,Marker,Circle,CircleMarker,LayerGroup,Popup} from 'react-leaflet'
import L from 'leaflet'
                                           

const iconUrl={"違規停車":'Asset1.png',"路燈故障":'Asset2.png',"噪音舉發":'Asset3.png',"騎樓舉發":'Asset4.png',"道路維修":'Asset5.png',"交通運輸":'Asset6.png',"髒亂及污染":'Asset7.png',"民生管線":'Asset8.png' ,"動物救援":'Asset9.png'}

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
        this.refs.map.leafletElement.setView(this.props.point,15);
    }
   componentDidMount(){
        fetch(this.props.data.towngeo)
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

        const {point,address,category,time,cases}= this.props
        if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">等一下 ......</h3>
             </div>
            )
          }
        const position =this.props.point
       
        const myviews = L.icon({
            iconUrl:`${this.props.data.icon}myview.png`,
            iconSize:[38,38],
            iconAnchor:[19,19],
            popupAnchor:[-3,-76],  
        });
        
        return(
            <div>
                {cases.map((d)=>{       
    
                    console.log(typeof(d.category))                  
                    console.log(`${iconUrl.d.category}`)
                })
                        }
                <Map ref='map' 
                     className='exploremap' 
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
                            <Marker position={d.position} icon={createicon(`${this.props.data.icon}${iconUrl.d.category}`)}>
                                <Popup>{d.description}<br/>{d.date}<br/>{d.status}</Popup>
                            </Marker>))
                        }
                    </LayerGroup> 
                </Map>
              
            </div>
        )        
    }
}
export default Exploremap