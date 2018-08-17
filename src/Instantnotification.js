import React, { Component } from "react";
import Listgroup from "./Listgroup.js";
import postApi from './postApi.js';
import {XYPlot,RadialChart,HorizontalBarSeries, YAxis} from "react-vis";
const color = ['#2e1f54','#f00a36','#ed3b21','#ff6908','#ffc719','#598c14','#335238','#4a8594','#706357']

class Instantnotification extends Component{
    
    constructor(props){
        super(props)
       
        this.state = {
          isLoading: true,
          request_data: {},
        }
      }

    componentDidMount(){
        postApi.requertPost('./this_week_data','null').then(data => {
          this.setState({
            request_data:data,
            isLoading : false
          })
       })
      }

    render(){
       
        const {isLoading,request_data} = this.state
        console.log(request_data)
        if(isLoading){
          return (
           <div class="loaddata">
             <h3 id="load_text">正在接通1999 ......</h3>
           </div>
          )
        }
        return(
            <div>
              <div className="board">
                <div className="ui segment dashboard">
                  <RadialChart  
                      key={`dashboardRadial`}
                      width={window.innerWidth*0.1}
                      height={window.innerWidth*0.1}
                      innerRadius={35}
                      radius={45}
                      getAngle={d => d}
                      data={[request_data.res.FinishRate.finish[0],request_data.res.FinishRate.unfinish[0]]}
                      colorType="category"
                      colorRange={["#b0a696",color]} 
                      stroke={null} 
                      className="ui container radial-chart"  
                  >
                  </RadialChart>
                  <h3>本週截至目前</h3>
                  <h2>{request_data.res.FinishRate.finish[0]} / {request_data.res.FinishRate.unfinish[0]}</h2>
                  <h3 style=
                      {{
                        fontSize:12,
                        fill:'gray'
                      }}>處理 / 未處理</h3>
                </div>
                <div className="ui segment dashboard">
                
                <XYPlot
                    width={window.innerWidth*0.32}
                    height={window.innerWidth*0.25}
                    yType='ordinal'
                    xRange={[45,window.innerWidth*0.3]}
                    stackBy='x'
                 >
                 <YAxis
                  className="categoryaxe"
                  width={window.innerWidth*0.06}
                  top={1}/>
                 <HorizontalBarSeries
                    className="categorybar"
                    data={[
                      {y:'違規停車',x:10},
                      {y:'路燈故障',x:8},
                      {y:'噪音舉發',x:1},
                      {y:'騎樓舉發',x:0},
                      {y:'道路維修',x:20},
                      {y:'交通運輸',x:10},
                      {y:'髒亂污染',x:5},
                      {y:'民生管線',x:2},
                      {y:'動物救援',x:10},
                    ]} 
                    color="rgb(190,194,63)"
                    style={{
                      borderRadius:5
                    }}
                 /> 
                 <HorizontalBarSeries
                    className="categorybar"
                    data={[
                      {y:'違規停車',x:20},
                      {y:'路燈故障',x:18},
                      {y:'噪音舉發',x:10},
                      {y:'騎樓舉發',x:0},
                      {y:'道路維修',x:25},
                      {y:'交通運輸',x:15},
                      {y:'髒亂污染',x:15},
                      {y:'民生管線',x:20},
                      {y:'動物救援',x:15},
                    ]} 
                    color="#9e9e9e69"
                    style={{
                      borderRadius:5
                    }}
                 /> 
                </XYPlot>   
                </div>
              </div>
                <Listgroup {...request_data}/> 
            </div>
        )
    }
}
export default Instantnotification