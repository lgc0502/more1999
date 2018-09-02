import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {XYPlot,VerticalBarSeries,XAxis,YAxis,LabelSeries} from "react-vis";
const transtype = {"animal":'動物救援',"pipe":'民生管線',"dirty":'髒亂污染',"traffic":'交通運輸',"road":'道路維修',"aisle":'騎樓舉發',"noise":'噪音舉發',"light":'路燈故障',"parking":'違規停車'}
class Barchart extends Component{
    
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
              width = width
              height = width
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
    componentWillUnmount(){
        window.removeEventListener('resize',this.updateSize.bind(this));
    }
    render(){
        const {data,id} = this.props;
        let barchartdata;
        if(id==="Category"){
            barchartdata= Object.keys(data).map((key,i)=>{
                return {x:transtype[key],y:data[key],label:data[key],style:{fill:"#598c14"}} });
        }else if(id==="Time"){
            barchartdata= Object.keys(data).map((key,i)=>{
                return {x:transtype[key],y:data[key].Seconds,label:data[key].Formated,style:{fill:"#598c14"}} });
        }
        return(
                <XYPlot
                    key={`CityReportBarChart${id}`}
                    width={this.state.width}
                    height={this.state.height}
                    xType='ordinal'
                    className="Barchart">
                    <XAxis
                        tickLabelAngle={-45}/>
                    <YAxis/>
                    <VerticalBarSeries
                        data={barchartdata} 
                        color={"#598c14"}
                        style={{borderRadius:5}}/>
                    <LabelSeries
                        allowOffsetToBeReversed
                        data={barchartdata}
                        labelAnchorX="text-after-edge"
                        labelAnchorY="baseline"/>
                </XYPlot>  
        )
    }
}
export default Barchart