import React,{Component} from "react"
import {Dropdown, Divider, Container} from 'semantic-ui-react'
import townOptions from './townOptions'
import emitter from './events'
import postApi from './postApi'
import date from "./Date"
class Dropdownsearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedtown: '善化區',
      selectedvill: '文正里',
      postContent: null
    }
  }
  
  setTownValue(e,data){
    this.setState({
      selectedtown:data.value})
      emitter.emit("markTown",data.value);  
  }

  setVillValue(e,data){
    this.setState({
      selectedvill:data.value })
      emitter.emit("markVill",data.value); 
  }

  startloaddata(){
    let param = {
      params:{
        town:this.state.selectedtown,
        village:this.state.selectedvill,
        begin_date:date.lastweekdate().begin,
        end_date:date.lastweekdate().end,
      }
    }
    
    postApi.requertPost('./village_visualization',{
      params:{
        town:this.state.selectedtown,
        village:this.state.selectedvill,
        begin_date:date.lastweekdate().begin,
        end_date:date.lastweekdate().end,
      }
    }).then(data => {
      this.setState({postContent: data},()=> emitter.emit("get_requestdata",this.state.postContent))
    })

  }
  
  render() {
    const getMajorMethod = () => {
    
      const view = townOptions.filter(({text}) => text === this.state.selectedtown)[0]
     
      return (
        <div className="dropdown">
            <Divider hidden/>
              <Dropdown
                onChange={this.setVillValue.bind(this)}
                selection
                search
                placeholder='村里'
                options={view.minor}
               />
            <div className="ui animated button" onClick={this.startloaddata.bind(this)}>
              <div className="visible content">查詢</div>
              <div className="hidden content">
                <i className="down arrow icon"></i>
              </div>
            </div>
        </div>
      )
    }
    return (
     
          <div className="grid-container">
            <div className="dropdown">
              <Divider hidden/>
              <Dropdown
                onChange={this.setTownValue.bind(this)}
                selection
                search
                placeholder='區'
                options={townOptions}
               // value = {selectedtown}
               />
            </div>
               {getMajorMethod()}
        </div>
       
      
    )
  }
}

export default Dropdownsearch