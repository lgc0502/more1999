import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON} from 'react-leaflet'
import L from 'leaflet'


class Exploremap extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:[23.15,120.4],
            zoom:10,
            minZoom:10,
            maxZoom:20,
            isLoading:true,
           
        }
        
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
                     className='leafletmap' 
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
                                fillOpacity: 0.4
                            }}
                        }
                       
                    />  
                    <Legend/>         
                </Map>
              
            </div>
        )
    }
}
export default Exploremap