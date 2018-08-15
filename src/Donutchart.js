import React,{Component} from 'react'
import {RadialChart} from "react-vis"

class Donutchart extends Component {
    constructor(props){
        super(props)
        this.state={
            type: Object.keys(props.res.Donut),
            data: props.res.Donut,
            type_copy:{
                'parking':'違規停車',
                'light':'路燈故障',
                'noise':'噪音舉發',
                'aisle':'騎樓舉發',
                'road':'道路維修',
                'traffic':'交通運輸',
                'dirty':'髒亂污染',
                'pipe':'民生管線',
                'animal':'動物救援' 
            }
        }
    }
    render () {   
        const {data,type}=this.state
        const {type_copy}=this.state
       return (
           <div className="ui equal width centered grid row">  
            {type.map((d,i)=>(  
               <div className="column"
                key={`compare-${i}`}>
                <span
                    key={`description-${i}`}
                    className="ui container radial-title center aligned chineseText"
                    style={{
                        fontSize:16,
                        color:"#000000"}}>
                    {type_copy[d]}
                </span>   
                <span
                    key={`quantity-${i}`}
                    className="compare_quantity ui container radial-title center aligned"
                    style={{
                        fontSize:18,
                        fontWeight:600,
                        color:"#d82109"}}>
                    {data[d][0]+" 件"}
                </span>   
                <RadialChart  
                    key={`Radial-${i}`}
                    width={window.innerWidth*0.6/9}
                    height={window.innerWidth*0.6/8}
                    innerRadius={35}
                    radius={40}
                    getAngle={d => d}
                    data={[data[d][1],(100-data[d][1])]}
                    colorType="category"
                    colorRange={["#9e9e9e69","#16982B"]} 
                    stroke={null} 
                    className="ui container radial-chart"  
                >
                </RadialChart>
                </div>
            ))}
           </div>
           
        )
    }
}
export default Donutchart