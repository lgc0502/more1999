import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {RadialChart,LabelSeries} from "react-vis";

const testdata = {
    FinishNum:70,
    UnFinishNum:30,
    CompleteRate:70,
    TotalNum:100
}
class Overview extends Component{ 

    constructor(props){
        super(props)
        this.state = {
            width:props.width||0,
            height:props.height||0,
        }
    }

    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          if(!width){
            width = parentDom.offsetWidth;
            width = width*0.3;
            height = width*0.3;
          }
          
          this.setState({width,height});
        }catch(ignore){}
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
    }
    render(){
        const {FinishNum,UnFinishNum,CompleteRate,TotalNum} = this.props//testdata
        return(
            <div className="Overview">
                <div className="Overview-chart">
                    <RadialChart
                        animation  
                        key={`OverviewRadialChart`}
                        width={this.state.width}
                        height={this.state.width}
                        className="radial-chart"
                        innerRadius={this.state.width*0.2}
                        radius={this.state.width*0.25}
                        data={[{angle:FinishNum},{angle:UnFinishNum}]}
                        colorType="category"
                        colorRange={["#b0a696","#598c14"]} 
                        stroke={null}>
                    <LabelSeries
                        allowOffsetToBeReversed
                        data={[{x:0, y:0,label:'完成度'}]}
                        labelAnchorX="middle"
                        labelAnchorY="hanging"
                        style={{fill:"#636d7b",fontWeight:600,fontSize:"2.5vmin",}}
                    />
                    <LabelSeries
                        allowOffsetToBeReversed
                        data={[{x:0, y:0,label:(CompleteRate*100).toFixed(1)+"%"}]}
                        labelAnchorX="middle"
                        labelAnchorY="baseline"
                        style={{fill:"#454f5d",fontWeight:600,fontSize:"3.5vmin"}}
                    />
                    </RadialChart>
                </div>
                <div className="flexbox Overview-description">
                    <h2>本週截至目前通報{TotalNum}件</h2>
                    <h2><font color="#598c14">{FinishNum}件完工</font> / <font color="#b0a696">{UnFinishNum}件處理中</font></h2>
                </div>
            </div>
        )
    }
}

   
export default Overview