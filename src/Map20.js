import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup,GeoJSON } from 'react-leaflet'
import {feature} from "topojson-client"
export default class Map20 extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 23.1505,
      lng: 120.3456,
      zoom: 10,
      townData:[]
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
                    townData:feature(topology,topology.objects.tainan).features,
                })
            })

        })
    
}
  render() {
    const position = [this.state.lat, this.state.lng]
    const {townData} = this.state
    return (
      <Map center={position} zoom={this.state.zoom} style={{height: "70vh"}}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={townData} 
          className="geojson"
          fill = "#F5CE28"
          stroke = "#ffffff"
          strokeWidth = {1.5}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      
    )
  }
}