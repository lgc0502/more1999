import React,{Component} from 'react'
import {RadialChart} from "react-vis"

class Donutchart extends Component {
    static defaultProps = {
       width:window.innerWidth*0.6/9,
       height: window.innerWidth*0.6/5,
    }
    constructor(props){
        super(props)
        this.state={
            type: Object.keys(props.res.Donut),
            data: props.res.Donut
        }
    }
    componentWillMount(){
        const {data,type} = this.state
        const {width,height} = this.props
        const {Palette} = ["#FFEFD5","#16982B"]
    }
    componentWillUpdate(){
        const {data,type} = this.state
        const {width,height} = this.props
    }
    render () {    
       return (
           <div className="ui equal width centered grid row">  
            {type.map((d,i)=>(  
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
                    {data[d][0]+"件"}
                </span>   
                <RadialChart  
                    key = {`Radial-${i}`}
                    width = {this.props.width}
                    height = {this.props.height*0.6}
                    innerRadius = {35}
                    radius = {40}
                    getAngle = {d => d}
                    data = {[data[d][1],(100-data[d][0])]}
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
                    {data[d][1]/100+'%'}
                </span>    
                </div>
            ))}
           </div>
           
        )
    }
}
export default Donutchart