import React, { Component } from 'react'
import L from 'leaflet'
import {feature} from "topojson-client"
import 'leaflet-easybutton'
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
        var geojson;
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
        function highlightFeature(e){
            var layer = e.target;
            layer.setStyle({
                weight:3,
                color: 'rgb(165,160,81)',
                fillOpacity:0.7
            });
            if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
                layer.bringToFront();
            }
        }
        function resetHighlight(e){
            geojson.resetStyle(e.target);
        }
        // function zoomToFeature(e){
        //     map.fitBounds(e.target.getBounds())
        // }
        function onEachFeature(feature,layer){
            layer.on({
                mouseover : highlightFeature,
                mouseout: resetHighlight,
               //click: zoomToFeature
            });
        }
        fetch('./data/tainan.json')
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
                },()=>{
                    geojson = L.geoJSON(this.state.poplData,{
                                    style:function(feature){
                                        return {
                                            fillColor:getColor(feature.properties.casenum),
                                            weight: 2,
                                            opacity: 1,
                                            color: 'white',
                                            fillOpacity: 0.7
                                        }
                                    },
                                    onEachFeature: onEachFeature
                                });
                    geojson.addTo(map);
                })
        })
        var map = L.map('map',{
            center:[23.15,120.35],
            zoom: 10,
            minZoom:10,
            maxZoom:20
        })   
        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0,  20, 40, 60, 80, 100];
                
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };
        legend.addTo(map);
        L.easyButton('fa-sync-alt',function(btn,map){
            map.setView([23.15,120.35],10);
        },'Zoom To Home').addTo(map)     
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
                    attribution:"&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" ,                    maxZoom:18,
                }).addTo(map);
        
        }
        )}
    render(){
        return(
            <div id="map"></div>
        )
    }
}
export default Map