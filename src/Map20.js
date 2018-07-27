import React, { Component } from 'react'
import {Map,TileLayer,GeoJSON} from 'react-leaflet'

export default class Map20 extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 23.1505,
      lng: 120.3456,
      zoom: 10,
      poplData:[]
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
                  poplData:topology.data,
                //  PolygonsCenter:topology.geopoint
                })
            })

        })
    
}
  render() {
    const position = [this.state.lat, this.state.lng]
    const {poplData} = this.state
    return (
      <Map center={position} zoom={this.state.zoom} style={{height: "70vh"}}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={poplData} 
          className="geojson"
          fill = "#F5CE28"
          stroke = "#ffffff"
          strokeWidth = {1.5}
        />
        
      </Map>
      
    )
  }
}