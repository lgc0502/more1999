import React, { Component } from "react";
import ReactDOM from 'react-dom';
import postApi from './postApi.js';
import {XYPlot,RadialChart,HorizontalBarSeries,YAxis,LabelSeries} from "react-vis";
import Listgroup from "./Listgroup.js";

const transtype = {"animal":'動物救援',"pipe":'民生管線',"dirty":'髒亂污染',"traffic":'交通運輸',"road":'道路維修',"aisle":'騎樓舉發',"noise":'噪音舉發',"light":'路燈故障',"parking":'違規停車'}

class Instantnotification extends Component{
    
  constructor(props){
    super(props)
    this.state = {
      width:props.width||-1,
      height:props.height||-1,
      isLoading: true,
      request_data: {},
      finish_bar_data:{},
      unfinish_bar_data:{}
    }
  }
  updateSize(){
    try{
      const parentDom = ReactDOM.findDOMNode(this).parentNode;
      let {width,height} = this.props;
      
      if(!width){
        width = parentDom.offsetWidth;
        
        if(width>600){
          width = width*0.35
          height = width*0.8
        }else{
          width = width*0.7
          height = width*0.75
        }
      }
      
      this.setState({width,height});
    }catch(ignore){}
  }
  componentDidMount(){
    this.updateSize();
    window.addEventListener('resize',this.updateSize.bind(this));
    
    postApi.requertPost('./this_week_data','null').then(data => {
        
      this.setState({
        request_data:data,
        isLoading : false,
        finish_bar_data: Object.keys(data.res.Category).map((key,i)=>{
          return {x:data.res.Category[key][0],y:transtype[key],label:data.res.Category[key][0]+'/'+data.res.Category[key][1],style:{fill:"#598c14"}} 
          }),
        unfinish_bar_data:Object.keys(data.res.Category).map((key,i)=>{
          return {x:data.res.Category[key][1],y:transtype[key]} 
          })
      })
    })
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.updateSize.bind(this));
  }
  render(){
    const {isLoading,request_data,finish_bar_data,unfinish_bar_data} = this.state
    
    if(isLoading){
      return (
        <div class="loaddata">
          <h3 id="load_text">正在接通1999 ......</h3>
        </div>
      )
    }
    return(
      <div>
        <div className="instant board">
          <div className="ui segment dashboard">
            <svg className="hint">
              <circle  style={{cx:"50%",cy:"50%",r:"5",fill:"#598c14"}}/></svg> 
            <span className="hint">已處理</span>
            <svg className="hint">
              <circle  style={{cx:"50%",cy:"50%",r:"5",fill:"#b0a696",}}/></svg> 
            <span className="hint">處理中</span>
            <RadialChart  
              key={`dashboardRadial`}
              width={window.innerWidth*0.18}
              height={window.innerWidth*0.18}
              innerRadius={window.innerWidth*0.05-window.innerWidth*0.01}
              radius={window.innerWidth*0.05}
              getAngle={d => d}
              data={[request_data.res.FinishRate.finish[0],request_data.res.FinishRate.unfinish[0]]}
              colorType="category"
              colorRange={["#b0a696","#598c14"]} 
              stroke={null} 
              className="ui container radial-chart instantdonut">
              {/* <svg id="donutratio" width="90" height="90">
                <circle  style={{cx:"40%",cy:"40%",r:"32",fill:"#b0a696",opacity:0.4 }}/></svg>  */}
            </RadialChart>
            <span className="ratio">完成度</span>
            <span className="ratio">{((request_data.res.FinishRate.finish[0]/(request_data.res.FinishRate.finish[0]+request_data.res.FinishRate.unfinish[0]))*100).toFixed(1)+"%"}</span>                  
            <h3>本週截至目前通報</h3>
            <h3><font color="#598c14">{request_data.res.FinishRate.finish[0]}</font> / <font color="#b0a696">{request_data.res.FinishRate.unfinish[0]}</font></h3>
            <span id="ratiohint" style={{fontSize:12}}><font color="#598c14">處理</font> / <font color="#b0a696">未處理</font></span>
          </div>
          <div className="ui segment dashboard">
         
            <XYPlot
              width={this.state.width}
              height={this.state.height}
              yType='ordinal'
              xRange={[this.state.width*0.2,this.state.width]}
              yRange={[0,this.state.height]}
              stackBy='x'
              className="instant-category-chart">
              <YAxis
                className="categoryaxe"
                width={this.state.width*0.2}
                style={{strokeOpacity:0}}
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
               <LabelSeries
              allowOffsetToBeReversed
              data={finish_bar_data}
              labelAnchorX="text-after-edge"
              labelAnchorY="baseline"
             />
            </XYPlot>  
          </div>
        </div>
        <h2>即時未處理通報案件</h2>
        <Listgroup {...request_data}/> 
      </div>
    )
  }
}
export default Instantnotification