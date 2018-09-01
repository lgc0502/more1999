import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {XYPlot,RadialChart,YAxis,LabelSeries} from "react-vis";

class Overview extends Component{ 

    constructor(props){
        super(props)
        this.state = {
            width:props.width||-1,
            height:props.height||-1,
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
    }
    render(){
        const {FinishNum,UnFinishNum,CompleteRate,TotalNum} = this.props
        return(
            <div className="Overview">
                <div className="Overview-chart">
                    <RadialChart  
                        key={`OverviewRadialChart`}
                        width={window.innerWidth*0.2}
                        height={window.innerWidth*0.2}
                        className="radial-chart"
                        innerRadius={window.innerWidth*0.05-window.innerWidth*0.01}
                        radius={window.innerWidth*0.05}
                        getAngle={d => d}
                        data={[FinishNum,UnFinishNum]}
                        colorType="category"
                        colorRange={["#DCC7AA","#6B7A8F"]} 
                        stroke={null}>
                    <LabelSeries
                        allowOffsetToBeReversed
                        data={[{x:0, y:0,label:'完成度'}]}
                        labelAnchorX="middle"
                        labelAnchorY="hanging"
                        style={{fill:"#F7882F",fontWeight:600,}}
                    />
                    <LabelSeries
                        allowOffsetToBeReversed
                        data={[{x:0, y:0,label:CompleteRate+'%'}]}
                        labelAnchorX="middle"
                        labelAnchorY="baseline"
                        style={{fill:"#F7882F",fontWeight:600,}}
                    />
                    </RadialChart>
                </div>
                <div className="Overview-description">
                    <h3>本週截至目前通報{TotalNum}件</h3>
                    <h3><font color="#598c14">{FinishNum}件完工</font> / <font color="#b0a696">{UnFinishNum}處理中</font></h3>
                </div>
            </div>
        )
    }
}

   
export default Overview