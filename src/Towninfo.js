import React, { Component } from 'react';
import {XYPlot,YAxis,HorizontalBarSeries} from "react-vis"
const type = {"parking":'違規停車',"light":'路燈故障',"noise":'噪音舉發',"aisle":'騎樓舉發',"road":'道路維修',"traffic":'交通運輸',"dirty":'髒亂污染',"pipe":'民生管線',"animal":'動物救援'}
export default class Towninfo extends Component {
    constructor(props){
        super(props)

    }

    render(){
       
        // const categorynum = Object.keys(this.props.category).map((key,i)=>{
        //     return {x:this.props.category[key],y:type[key]} 
        // })
        // const responsetime = Object.keys(this.props.time).map((key,i)=>{
        //     let time = this.props.time[key].split(":")
        //     return {x:time[0]*24*60*60+time[1]*3600+time[2]*60,y:type[key]} 
        // })
        const responsetime = this.props.time.map((d)=>{
            let time = d.split(":")
            if(time[0]===0)
                return (time[1]+'時'+time[2]+'分')
            else
                return (time[0]+'天'+time[1]+'時'+time[2]+'分') 
        })
       console.log(responsetime)
        return(
            <div className="ui segment" style={{height:500}} >
                <h3>{this.props.town}</h3>
                <div>
                {Object.keys(this.props.category).map((key)=>(
                    <div className="ui segment history-mapinfo">
                    <p><span style={{color:"#598c14"}}>{type[key]}</span></p>
                      <p><span style={{color:"#598c14"}}>{responsetime[key]}</span></p>
                      <p><span style={{color:"#598c14"}}>{this.props.category[key]}</span></p>
                    </div>     
                ))}
                </div>
                {/* <h4 id="mapinfo_time">平均處理時間</h4>
                <h4 id="mapinfo_category">各類別統計</h4>
                <XYPlot
                    className="categorybar time"
                    width={window.innerWidth*0.2-window.innerWidth*0.06}
                    height={window.innerWidth*0.25}
                    yType='ordinal'
                    xDomain={[Math.max.apply(Math,responsetime.map((d)=>{return d.x})),0]}
                    xRange={[0,window.innerWidth*0.06]}
                    yRange={[0,window.innerWidth*0.23]}
                 >
                 <HorizontalBarSeries
                    className="categorybar"
                    data={responsetime} 
                    color="rgb(190,194,63)"
                 /> 
                </XYPlot>
                <div className="history-descript-data">
                {Object.keys(this.props.time).map((key)=>(
                  <p><span style={{color:"#598c14"}}>{this.props.time[key]}</span></p>))}
                </div>
                 <XYPlot
                    className="categorybar category"
                    width={window.innerWidth*0.2}
                    height={window.innerWidth*0.25}
                    yType='ordinal'
                    xRange={[95,window.innerWidth*0.18]}
                    yRange={[0,window.innerWidth*0.23]}
                 >
                 <YAxis 
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
               
                <div className="history-descript-data">
                {Object.keys(this.props.category).map((key)=>(
                  <p><span style={{color:"#598c14"}}>{this.props.category[key]}</span></p>))}
                </div> */}
            </div>
        )
    }
}