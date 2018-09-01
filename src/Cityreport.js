import React, { Component } from "react";
import ReactDOM from 'react-dom';
import React_leaflet from './React_leaflet.js';

class Cityreport extends Component{
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
        return(
            <div className="Cityreport">
                <div className="Map-chart" id="Map">
                    <React_leaflet
                        data={this.props.towngeo}
                        {...this.state}/>
                </div>
            </div>
        )
    }
}
export default Cityreport