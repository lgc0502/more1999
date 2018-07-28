import React, { Component } from 'react'
import L from 'leaflet'

class Map extends Component(){
    constructor(){
        this.state = {
            poplData:{},
        }
    }
    ComponentDidMount(){
        fetch(this.props.data.towngeo)
            .then(res => {
                if(res.status !== 200){
                    console.log(`There was a problem: ${res.status}`)
                    return
                }
                res.json().then(topology => {
                    console.log(topology)
                    this.setState({
                      poplData:feature(topology,topology.objects).features
                    })
                })
            })
        //create map
        this.map = L.map('map',{
            center:[23.1505,120.3456],
            zoom: 13,
            layers: [
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" 
                }),
                L.geoJSON(this.state.poplData).addTo(map)
            ]
        })
    }
    render(){
        return(
            <div id="map"></div>
        )
    }
}
export default Map