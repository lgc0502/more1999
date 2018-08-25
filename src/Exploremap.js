import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON,Marker,Circle,CircleMarker,LayerGroup} from 'react-leaflet'

                                           
const typecolor = {"違規停車":'#2e1f54',"路燈故障":'#f00a36',"噪音舉發":'#ed3b21',"騎樓舉發":'#ff6908',"道路維修":'#ffc719',"交通運輸":'#598c14',"髒亂污染":'#335238',"民生管線":'#4a8594' ,"動物救援":'#706357'};
// const icon = {"違規停車":'parking-circle-slash',"路燈故障":'parking-circle-slash',"噪音舉發":'parking-circle-slash',"騎樓舉發":'parking-circle-slash',"道路維修":'parking-circle-slash',"交通運輸":'parking-circle-slash',"髒亂污染":'parking-circle-slash',"民生管線":'parking-circle-slash' ,"動物救援":'parking-circle-slash'};

class Exploremap extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:props.point,
            zoom:14,
            minZoom:11,
            maxZoom:30,
            data:{},
            isLoading:true,
           
        }
        
    }
    handlebtnClick(){
        this.refs.map.leafletElement.setView(this.props.point,14);
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
                    <Marker position={[22.99,120.21]}></Marker>    
                    <LayerGroup>
                        {cases.map((d)=>(
                            <Circle center={d.position} color="white" fillColor={typecolor[d.category]} fillOpacity={1} radius={20}></Circle>))
                        }
                    </LayerGroup> 
                </Map>
              
            </div>
        )        
    }
}
export default Exploremap