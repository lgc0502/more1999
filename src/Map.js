import React, { Component } from 'react'
import L from 'leaflet'
import {feature} from "topojson-client"

const a = {
    "R01":10,
    "R02":40,
    "R03":30,
    "R04":50,
    "R05":7,
    "R06":2,
    "R07":12,
    "R08":22,
    "R09":21,
    "R10":12,
    "R11":1,
    "R12":23,
    "R17":11,
    "R13":2,
    "R18":2,
    "R19":2,
    "R20":21,
    "R21":2,
    "R22":22,
    "R23":2,
    "R24":23,
    "R25":2,
    "R26":2,
    "R27":2,
    "R28":2,
    "R29":42,
    "R30":82,
    "R31":2,
    "D04":2,
    "R14":2,
    "R15":2,
    "R16":42,
    "D06":2,
    "D02":22,
    "D01":12,
    "D07":2,
    "D08":2,
}

class Map extends Component{
    constructor(props){
        super(props)
        this.state = {
            poplData:{},
        }   
        
    }
    
    componentDidMount(){
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
        fetch(this.props.towngeo)
        .then(res => {
            if(res.status !== 200){
                console.log(`There was a problem: ${res.status}`)
                return
            }
            res.json().then(topology => {
                
                topology.features.map((d)=>{
                    d.properties.casenum = a[d.properties.TOWNID]
                })
                
                this.setState({
                  poplData:topology.features
                },()=>L.geoJSON(this.state.poplData,{
                    style:function(feature){
                        return {
                            fillColor:getColor(feature.properties.casenum),
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            fillOpacity: 0.7
                        }
                    }
                
                }).addTo(map))
            })
        })
        var map = L.map('map',{
            center:[23.15,120.4],
            zoom: 10
        })     
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
                    attribution:"&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" ,                    maxZoom:18,
                }).addTo(map);    
    }
   
    render(){
        return(
            <div id="map"></div>
        )
    }
}
export default Map