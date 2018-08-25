import React, { Component } from 'react';
import {XYPlot,YAxis,HorizontalBarSeries} from "react-vis"
const type = {"parking":'違規停車',"light":'路燈故障',"noise":'噪音舉發',"aisle":'騎樓舉發',"road":'道路維修',"traffic":'交通運輸',"dirty":'髒亂污染',"pipe":'民生管線',"animal":'動物救援'}
const palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple']
export default class Towninfo extends Component {
    constructor(props){
        super(props)

    }

    render(){
       
        var responsetime = new Object;
        Object.keys(this.props.time).map((d)=>{
            let time = this.props.time[d].split(":")
            
            if(time[0]==='0' & time[1]==='0' & time[2]==='0'){
                responsetime[d]='-' 
            }
            else if(time[0]!='0' & time[0]!=0)
            {
                responsetime[d]=time[0]+'天'+time[1]+'小時'+time[2]+'分' 
            }
            else{
                responsetime[d]=time[1]+'小時'+time[2]+'分'
            }
        })
       
        return(
            <div className="ui segment" style={{height:500}} >
                <h2>{this.props.town}</h2>
                <div>
                {Object.keys(this.props.category).map((key,i)=>(
                    <div className={`ui ${palette[i]} segment history-mapinfo`} style={{color:(this.props.category[key]===0)?"#b0a696":"#000"}}>
                      <p><span >{type[key]}</span></p>
                      <p><span style={{color:"#b0a696"}}>處理時間 </span>{responsetime[key]}</p>
                      <p><span style={{color:"#b0a696"}}>通報數 </span>{this.props.category[key]}</p>
                    </div>     
                ))}
                </div>
            </div>
        )
    }
}