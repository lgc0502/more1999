import React, {Component} from "react"
import {geoMercator, geoPath} from "d3-geo"
import {feature} from "topojson-client"
import emitter from './events'

class townMap extends Component{
    constructor(props){
        super(props)
        this.state = {
            townData:[],
            villData:[],
            town:'善化區',
            vill: '文正里',
        }   
    }
    
    projection(){
        return geoMercator()
                .scale(45000)
                .center([120.1,23.2])
                .translate([800/2,450/2])
    }
    componentDidMount(){
        fetch(this.props.data.townmap)
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
        fetch(this.props.data.villmap,{
                headers:{
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                if(res.status !== 200){
                    console.log(`There was a problem: ${res.status}`)
                    return
                }
                res.json().then(topology => {
                    this.setState({
                        villData:feature(topology,topology.objects.臺南市各鄉鎮邊界).features,
                    })
    
                })
            }) 
    }
    componentDidUpdate(){
        //render
        console.log("in")
        this.eventEmitter = emitter.addListener("markTown",(selected)=>{
            this.setState({
                town:selected,
            })
        })
        this.eventEmitter = emitter.addListener("markVill",(selected)=>{   
            this.setState({
                vill:selected,
            })
        })
      }
    render(){
        
        return(
            <svg width={800} height={500} viewBox="0 0 800 500">
                <g className="vills">
                    {
                        this.state.villData.map((d,i) =>(
                            <path
                                key = {`villpath-${ i }`}
                                d = {geoPath().projection(this.projection())(d)}
                                className = "vill"
                                fill = {(this.state.villData[i].properties.TOWNNAME === this.state.town && this.state.villData[i].properties.VILLNAME === this.state.vill)?"#B22222":"#DAA520"}
                                stroke = "#ffffff"
                                strokeWidth={0.5}
                            />
                        ))
                    }
                </g>
                <g className="towns">
                    {
                        this.state.townData.map((d,i) =>(
                            <path
                                key = {`townpath-${i}`}
                                d = {geoPath().projection(this.projection())(d)}
                                className = "town"
                                fill = "#F5CE28"
                                stroke = {(this.state.townData[i].properties.TOWNNAME === this.state.town)?"#800000":"#ffffff"}
                                strokeWidth = {(this.state.townData[i].properties.TOWNNAME === this.state.town)?2.5:1.5}
                                opacity={0.3}

                            />
                        ))
                    }
                </g>
            </svg>
        )
    }
}
export default townMap