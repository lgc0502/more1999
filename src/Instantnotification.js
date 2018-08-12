import React, { Component } from "react";
import Listgroup from "./Listgroup.js";
import Dropdown from './Dropdownsearch.js';
class Instantnotification extends Component{
    render(){
        return(
            <div>
                <Dropdown/>
                <Listgroup/> 
            </div>
        )
    }
}
export default Instantnotification