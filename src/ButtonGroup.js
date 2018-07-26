import React,{Component} from "react"
import emitter from './events'
const Palette = ["#5E86C1","#33E6CC","#7400A1","#E6005C","#A52A2A","#FF2400","#FFBF00","#9ACD32","#1E90FF"]
const type = ['交通運輸','騎樓舉發','違規停車','動物救援','噪音舉發','路燈故障','道路維修','髒亂污染','民生管線',]

class ButtonGroup extends Component{
    constructor(props){
        super(props)
    }
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
                <button key = {`button-${d}`} id= {`${d}`}className = {`ui toggle basic button `} onClick = {this.handleClick.bind(this)}>{type[i]}</button>)
                }
            </div>
        )
    }
}
export default ButtonGroup