import React, { Component } from "react";
import Listgroup from "./Listgroup.js";
import Dropdown from './Dropdownsearch.js';
import postApi from './postApi.js';

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
                <Dropdown data={...request_data}/>
                <Listgroup/> 
            </div>
        )
    }
}
export default Instantnotification