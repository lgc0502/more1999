import React,{Component} from 'react'
import {RadialChart,LabelSeries} from "react-vis"
import ReactDOM from 'react-dom';
class Donutchart extends Component {
    constructor(props){
        super(props)
        this.state={
            width:props.width||-1,
            height:props.height||-1,
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
    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          
          if(!width){
            width = parentDom.offsetWidth;
            
            if(width>600){
              width = width
              height = width*0.2
            }else{
              width = width
              height = width*0.2
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
    render () {   
        const {data,type}=this.state
        const {type_copy}=this.state
       return (
           <div className="radial-chart-block">  
            {type.map((d,i)=>(  
              
              <RadialChart  
              key={`Radial-${i}`}        
              width={(this.state.width>600?this.state.width/10:this.state.width*0.4)}
              height={(this.state.width>600?this.state.width/10:this.state.width*0.4)}
              innerRadius={(this.state.width>600?this.state.width/30:this.state.width*0.1)}
              radius={(this.state.width>600?this.state.width/25:this.state.width*0.12)}
              data={[{angle:data[d][1],label:this.state.type_copy[d],subLabel:data[d][0]+'件'},{angle:100-data[d][1]}]}
              colorType="category"
              colorRange={["#9e9e9e69","#16982B"]} 
              stroke={null} 
              className="history-radial-chart"  
          >
          <LabelSeries
           allowOffsetToBeReversed
           data={[{x:0, y:0,label:data[d][0]+'件'}]}
           labelAnchorX="middle"
           labelAnchorY="hanging"
           style={{fill:"#16982B",fontWeight:600,}}
          />
          <LabelSeries
           allowOffsetToBeReversed
           data={[{x:0, y:0,label:this.state.type_copy[d]}]}
           labelAnchorX="middle"
           labelAnchorY="baseline"
           style={{fontWeight:600,}}
          />
          </RadialChart>
               
            ))}
           </div>
           
        )
    }
}
export default Donutchart
