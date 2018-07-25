import React,{Component} from 'react'
import {RadialChart} from "react-vis"
//import compareLastweek from "./compareLastweek"

const Palette = ["#FFEFD5","#16982B"]
const compareLastweek = {
    'Donut':{
        'a':[4,20],
        'b':[5,15],
        'c':[6,3],
        'd':[7,20],
        'e':[5,10],
        'f':[4,20],
        'g':[5,15],
        'h':[6,3],
        'i':[7,20]
    }
}


class Donutchart extends Component {
    static defaultProps = {
       width:window.innerWidth*0.6/9,
       height: window.innerWidth*0.6/5,
       
    }
    constructor(props){
        super(props)
        this.state={
            type: Object.keys(this.props.data.requestdata.Donut)
        }
    }
    render () {
        console.log(this.props.data.requestdata.Donut)
       return (
           <div className="ui equal width centered grid row">
           
            {this.state.type.map((d,i)=>(  
               <div className="column"
                key= {`compare-${i}`}>
                <span
                    key = {`description-${i}`}
                    className = "chineseText ui container radial-title center aligned"
                    style ={{
                        color:"#000000"}}>
                    {d}
                </span>   
                <span
                    key = {`quantity-${i}`}
                    className = "compare_quantity ui container radial-title center aligned"
                    style ={{
                        fontSize:20,
                        color:"#000000"}}>
                    {this.props.data.requestdata.Donut[d][0]+"件"}
                </span>   
                <RadialChart  
                    key = {`Radial-${i}`}
                    width = {this.props.width}
                    height = {this.props.height*0.6}
                    innerRadius = {35}
                    radius = {40}
                    getAngle = {d => d}
                    data = {[this.props.data.requestdata.Donut[d][1],(100-this.props.data.Donut[d][0])]}
                    colorType = "category"
                    colorRange = {Palette}  
                    className =  "ui container radial-chart"  
                >
                </RadialChart>
                <span
                    key = {`radio-${i}`}
                    className = "chineseText ui container radial-title center aligned"
                    style ={{
                        fontSize:12,
                        color:"#000000"}}>
                    {this.props.data.requestdata.Donut[d][1]/100+'%'}
                </span>    
                </div>
            ))}
           </div>
           
        )
    }
}
export default Donutchart