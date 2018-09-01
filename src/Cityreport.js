import React, { Component } from "react";
import ReactDOM from 'react-dom';
import React_leaflet from './React_leaflet.js';

class Cityreport extends Component{
    constructor(props){
        super(props)
        this.state = {
            width:props.width||-1,
            height:props.height||-1,
            data:props.Thisweek,
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
    thisweekdata(){
        this.setState({
            data:this.props.Thisweek
        })
    }
    lastweekdata(){
        this.setState({
            data:this.props.Lastweek
        })
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
    }
    render(){
        return(
            <div className="Cityreport">
                <div className="ui buttons">
                    <button className="ui button" onClick={this.thisweekdata.bind(this)}>本週</button>
                    <button className="ui button" onClick={this.lastweekdata.bind(this)}>上週</button>
                </div>
                <div className="Map-chart" id="Map">
                    <React_leaflet
                        data={this.props.towngeo}
                        {...this.state.data}/>
                </div>
            </div>
        )
    }
}
export default Cityreport