import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON,Marker,Circle,CircleMarker} from 'react-leaflet'



class Exploremap extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:[23.15,120.4],
            zoom:11,
            minZoom:10,
            maxZoom:20,
            isLoading:true,
           
        }
        
    }
    handlebtnClick(){
        this.refs.map.leafletElement.setView([23.15,120.35],10);
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
        const {point} = this.props
        if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">等一下 ......</h3>
             </div>
            )
          }
        const position =this.state.center
        return(
            <div>
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
                    <Circle center={point} color="red" fillColor='#f03' fillOpacity={0.5} radius={1000}></Circle>
                    <Marker position={point}><i class="fas fa-map-marker-alt"></i></Marker>    
                </Map>
              
            </div>
        )
    }
}
export default Exploremap