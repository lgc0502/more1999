import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import Towninfo from './Towninfo'
import Legend from './Legend'

function getColor(d){

    return d > 100  ? '#BD0026':
           d > 80  ? '#E31A1C':
           d > 60  ? '#FC4E2A':
           d > 40  ? '#FD8D3C':
           d > 20   ? '#FEB24C':
           d === 0 ? '#FFEDA0':
                    '#FED976';
}

class React_leaflet extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:[23.15,120.3],
            zoom:10,
            minZoom:10,
            maxZoom:20,
            isLoading:true,
            selecttown:'台南市',
            selecttownid:'ALL'
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
        })
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
        fetch(this.props.data.towngeo)
        .then(res => {
            if(res.status !== 200){
                console.log(`There was a problem: ${res.status}`)
                return 
            }
            res.json().then(topology => {
                
                topology.features.map((d)=>{
                    d.properties.casenum = this.props.res.Hotzone[d.properties.TOWNID].total
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
                <div className="Mapinfo leaflet">
                    <Towninfo town={this.state.selecttown}
                              time={this.props.res.Hotzone[this.state.selecttownid].time}
                              category={this.props.res.Hotzone[this.state.selecttownid].category}/>
                </div>
            </div>
        )
    }
}
export default React_leaflet