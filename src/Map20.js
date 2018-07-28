import React, { Component } from 'react'
import L from 'leaflet'

const DEFAULT_VIEWPORT = {
  center:[23.1505,120.3456],
  zoom:13
}
class Map20 extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 23.1505,
      lng: 120.3456,
      zoom: 13,
      poplData:[],
      viewport:DEFAULT_VIEWPORT,
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
              console.log(topology)
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
      <Map 
        onClick = {this.onClickReset}
        onViewportChanged = {this.onViewportChanged}
        viewport = {this.state.viewport}
        center={position} 
        zoom={this.state.zoom} 
        style={{height: "70vh"}}>
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
export default Map20