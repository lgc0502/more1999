import React, { Component } from 'react';
import {XYPlot,YAxis,Hint,HorizontalBarSeries} from "react-vis"
const type = {"parking":'違規停車',"light":'路燈故障',"noise":'噪音舉發',"aisle":'騎樓舉發',"road":'道路維修',"traffic":'交通運輸',"dirty":'髒亂污染',"pipe":'民生管線',"animal":'動物救援'}
export default class Towninfo extends Component {
    constructor(props){
        super(props)

    }
    
    
    render(){
       
        const categorynum = Object.keys(this.props.category).map((key,i)=>{
            return {x:this.props.category[key],y:type[key]} 
        })
        const responsetime = this.props.efficiency.split(":")
        return(
            <div className="ui segment">
                <h3>{this.props.town}</h3>
                <h4>平均處理時間</h4>
                {responsetime[0]+'天'+responsetime[1]+'時'+responsetime[2]+'分'}
                <h4>各類別統計</h4>
                 <XYPlot
                    width={window.innerWidth*0.2}
                    height={window.innerWidth*0.25}
                    yType = 'ordinal'
                    xRange={[window.innerWidth*0.025,window.innerWidth*0.2]}
                 >
                 < YAxis 
                    className="categoryaxe"
                    width={window.innerWidth*0.06}
                    top={1}
                   />
                 <HorizontalBarSeries
                    className="categorybar"
                    data={categorynum} 
                    color="rgb(190,194,63)"
                 />
                
                </XYPlot>
            </div>
        )
    }
}