import React, { Component } from 'react'
import L from 'leaflet'
import {feature} from "topojson-client"

class Map extends Component{
    constructor(props){
        super(props)
        this.state = {
            poplData:{},
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
                  poplData:topology.features
                },()=>L.geoJSON(this.state.poplData).addTo(map)  )
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