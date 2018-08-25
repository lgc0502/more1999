import React,{Component} from "react"
import emitter from './events'
const Palette = ['red','orange','yellow','olive','green','teal','blue','violet','purple']
const type = ['違規停車','路燈故障','噪音舉發','騎樓舉發','道路維修','交通運輸','髒亂污染','民生管線','動物救援']

class ButtonGroup extends Component{
   
    handleClick(e){
        const{id} = e.target
        emitter.emit("showarea",id); 
    }
    componentWillMount(){
        //load data
    }
    render(){ 
        return(
            <div>
                {type.map((d,i)=>
                <button key={`button-${d}`} id={`${d}`}className={`ui toggle ${Palette} basic button `} onClick={this.handleClick.bind(this)}>{type[i]}</button>)
                }
            </div>
        )
    }
}
export default ButtonGroup