import React, { Component } from "react";
import postApi from './postApi.js';
import {XYPlot,RadialChart,HorizontalBarSeries,YAxis} from "react-vis";
import Listgroup from "./Listgroup.js";

const palette = ['#2e1f54','#f00a36','#ed3b21','#ff6908','#ffc719','#598c14','#335238','#4a8594','#706357']

const transtype = {"animal":'動物救援',"pipe":'民生管線',"dirty":'髒亂污染',"traffic":'交通運輸',"road":'道路維修',"aisle":'騎樓舉發',"noise":'噪音舉發',"light":'路燈故障',"parking":'違規停車'}
class Instantnotification extends Component{
    
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      request_data: {},
      finish_bar_data:{},
      unfinish_bar_data:{}
    }
  }

  componentDidMount(){
    postApi.requertPost('./this_week_data','null').then(data => {
        
      this.setState({
        request_data:data,
        isLoading : false,
        finish_bar_data: Object.keys(data.res.Category).map((key,i)=>{
          return {x:data.res.Category[key][0],y:transtype[key]} 
          }),
        unfinish_bar_data:Object.keys(data.res.Category).map((key,i)=>{
          return {x:data.res.Category[key][1],y:transtype[key]} 
          })
      })
    })
  }

  render(){
    const {isLoading,request_data,finish_bar_data,unfinish_bar_data} = this.state
    console.log(request_data)
    console.log(finish_bar_data)
    console.log(unfinish_bar_data)
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
            <svg className="hint">
              <circle  style={{cx:"15",cy:"15",r:"5",fill:"#598c14"}}/></svg> 
            <span className="hint">已處理</span>
            <svg className="hint">
              <circle  style={{cx:"15",cy:"15",r:"5",fill:"#b0a696",}}/></svg> 
            <span className="hint">處理中</span>
            <RadialChart  
              key={`dashboardRadial`}
              width={window.innerWidth*0.1}
              height={window.innerWidth*0.1}
              innerRadius={35}
              radius={45}
              getAngle={d => d}
              data={[request_data.res.FinishRate.finish[0],request_data.res.FinishRate.unfinish[0]]}
              colorType="category"
              colorRange={["#b0a696","#598c14"]} 
              stroke={null} 
              className="ui container radial-chart instantdonut">
              <svg id="donutratio" width="90" height="90">
                <circle  style={{cx:"40",cy:"40",r:"32",fill:"#b0a696",opacity:0.4 }}/></svg> 
              <span className="ratio">{((request_data.res.FinishRate.finish[0]/(request_data.res.FinishRate.finish[0]+request_data.res.FinishRate.unfinish[0]))*100).toFixed(1)+"%"}</span>                  
              <span className="ratio">complete</span>
            </RadialChart>
           
            <h3>本週截至目前</h3>
            <h2>{request_data.res.FinishRate.finish[0]} / {request_data.res.FinishRate.unfinish[0]}</h2>
            <h3 id="ratiohint" style={{fontSize:12}}>處理 / 未處理</h3>
          </div>
          <div className="ui segment dashboard">
            <div className="instant-descript-data">
              {Object.keys(transtype).map((key)=>(
                  <p><span style={{color:"#598c14"}}>{request_data.res.Category[key][0]}</span> / <span style={{color:"#b0a696"}}>{request_data.res.Category[key][1]}</span></p>))}
            </div>
            <XYPlot
              width={window.innerWidth*0.32}
              height={window.innerWidth*0.25}
              yType='ordinal'
              xRange={[90,window.innerWidth*0.3]}
              stackBy='x'
              className="instant-category-chart">
              <YAxis
                className="categoryaxe"
                width={window.innerWidth*0.06}
                top={1}/>
              <HorizontalBarSeries
                className="categorybar"
                data={finish_bar_data} 
                color={"#598c14"}
                style={{borderRadius:5}}/>
             
              <HorizontalBarSeries
                className="categorybar"
                data={unfinish_bar_data} 
                color="#b0a696"
                style={{opacity:0.4}}/> 
             
            </XYPlot>  
          </div>
        </div>
        <Listgroup {...request_data}/> 
      </div>
    )
  }
}
export default Instantnotification