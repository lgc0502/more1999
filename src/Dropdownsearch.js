import React,{Component} from "react"
import {Dropdown, Divider, Container} from 'semantic-ui-react'
import townOptions from './townOptions'
import emitter from './events'
import postApi from './postApi'

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
    postApi.requertPost(this.state.selectedtown,this.state.selectedvill).then(data => {
      this.setState({postContent: data},()=> emitter.emit("get_requestdata",this.state.postContent))
    })

  }
  
  render() {
    const getMajorMethod = () => {
    
      const view = townOptions.filter(({text}) => text === this.state.selectedtown)[0]
     
      return (
        <div  className="eight wide column villdropdown">
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
     
          <Container className="ui grid">
            <div className="eight wide column towndropdown">
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
        </Container>
       
      
    )
  }
}

export default Dropdownsearch