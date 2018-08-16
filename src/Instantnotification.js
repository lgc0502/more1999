import React, { Component } from "react";
import Listgroup from "./Listgroup.js";
import Dropdown from './Dropdownsearch.js';
import postApi from './postApi.js';
import {RadialChart} from "react-vis";
class Instantnotification extends Component{
    
    constructor(props){
        super(props)
       
        this.state = {
          isLoading: true,
          request_data: {},
        }
      }
    componentDidMount(){
        postApi.requertPost('./this_week_data','null','null').then(data => {
          this.setState({
            request_data:data,
            isLoading : false
          })
       })
      }

    render(){
        console.log(this.state.request_data)
        const {isLoading,request_data} = this.state
        if(isLoading){
          return (
           <div class="loaddata">
             <h3 id="load_text">正在接通1999 ......</h3>
           </div>
          )
        }
        return(
            <div>
                <div className="ui segment dashboard">
                  <RadialChart  
                      key={`dashboardRadial-${i}`}
                      width={window.innerWidth*0.6}
                      height={window.innerWidth*0.6}
                      innerRadius={35}
                      radius={40}
                      getAngle={d => d}
                      data={[89,11]}
                      colorType="category"
                      colorRange={["#9e9e9e69","#16982B"]} 
                      stroke={null} 
                      className="ui container radial-chart"  
                  >
                  </RadialChart>
                  <h3>本週截至目前</h3>
                  <h2>453 / 57</h2>
                  <h3>處理 / 未處理</h3>
                </div>
                <div className="ui segment dashboard">
                </div>
                <Listgroup {...request_data}/> 
            </div>
        )
    }
}
export default Instantnotification