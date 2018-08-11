import React, { Component } from "react"
import Listgroup from "./Listgroup"
import Dropdown from './Dropdownsearch'
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