import React,{Component} from 'react'
import {Map,TileLayer,GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import Towninfo from './Towninfo'
import Legend from './Legend'

const a = {
    "R01":{
            total:10,
            time:{
                'parking':"0:0:0",
                'light':"0:0:0",
                'noise':"0:0:0",
                'aisle':"0:0:0",
                'road':"0:0:0",
                'traffic':"0:0:0",
                'dirty':"0:0:0",
                'pipe':"0:0:0",
                'animal':"0:0:0",
            },
            category:{
                'parking':1,
                'light':2,
                'noise':3,
                'aisle':4,
                'road':5,
                'traffic':6,
                'dirty':7,
                'pipe':8,
                'animal':9 
            }
          },
    "R02":{
        total:30,
        efficiency: '1:4:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':142,
            'dirty':33,
            'pipe':0,
            'animal':10 
        }
      },
    "R03":{
        total:40,
        efficiency: '0:14:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':10,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':10,
            'animal':1 
        }
      },
    "R04":{
        total:50,
        efficiency: '0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':10,
            'road':10,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R05":{
        total:0,
        efficiency: '0:12:5',
        category:{
            'parking':10,
            'light':3,
            'noise':51,
            'aisle':10,
            'road':10,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R06":{
        total:4,
        efficiency: '0:1:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R07":{
        total:10,
        efficiency: '0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R08":{
        total:10,
        efficiency: '0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R09":{
        total:10,
        efficiency: '0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R10":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R11":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R12":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R17":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R13":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R18":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R19":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R20":{
        total:10,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R21":{
        total:40,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R22":{
        total:24,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R23":{
        total:8,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R24":{
        total:45,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R25":{
        total:0,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R26":{
        total:20,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R27":{
        total:70,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R28":{
        total:90,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R29":{
        total:20,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R30":{
        total:60,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R31":{
        total:20,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D04":{
        total:102,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R14":{
        total:101,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R15":{
        total:102,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "R16":{
        total:140,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D06":{
        total:20,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D02":{
        total:40,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D01":{
        total:150,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D07":{
        total:9,
        efficiency:'0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
    "D08":{
        total:3,
        efficiency: '0:21:5',
        category:{
            'parking':10,
            'light':3,
            'noise':5,
            'aisle':0,
            'road':0,
            'traffic':12,
            'dirty':33,
            'pipe':0,
            'animal':1 
        }
      },
}
function getColor(d){

    return d > 100 ? '#FFEDA0':
           d > 80  ? '#BD0026':
           d > 60  ? '#E31A1C':
           d > 40  ? '#FC4E2A':
           d > 20  ? '#FD8D3C':
           d > 0   ? '#FEB24C':
           d === 0 ? '#FED976':
                    '#FFEDA0';
}

class React_leaflet extends Component{
    constructor(props){
        super(props)
        this.state = {
            center:[23.15,120.4],
            zoom:10,
            minZoom:10,
            maxZoom:20,
            isLoading:true,
            selecttown:'天堂',
            selecttownid:'R01'
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
        console.log(this.props)
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