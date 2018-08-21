import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON,Marker,Circle,CircleMarker} from 'react-leaflet'

                                           
const casestype = {"違規停車":'#2e1f54',"路燈故障":'#f00a36',"噪音舉發":'#ed3b21',"騎樓舉發":'#ff6908',"道路維修":'#ffc719',"交通運輸":'#598c14',"髒亂污染":'#335238',"民生管線":'#4a8594' ,"動物救援":'#706357'}

class Exploremap extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:props.point,
            zoom:13,
            minZoom:10,
            maxZoom:20,
            data:{},
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
        const {point,address,category,time,cases}= this.props
        if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">等一下 ......</h3>
             </div>
            )
          }
        const position =this.state.center
        console.log(this.props)
        return(
            <div>
                <Map ref='map' 
                     className='exploremap' 
                     center={[22.99,120.21]} 
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
                    <Circle center={[22.99,120.21]} color="red" fillColor='#f03' fillOpacity={0.5} radius={500}></Circle>
                    <Marker position={[22.99,120.21]}><i class="fas fa-map-marker-alt"></i></Marker>    
                    <div>
                        {
                            cases.map((d)=>{
                                <CircleMarker center={d.position} color={casestype[d.category]} fillColor={casestype[d.category]} fillOpacity={0.5} radius={5}></CircleMarker>
                            })
                        }
                    </div>
                </Map>
              
            </div>
        )        
    }
}
export default Exploremap