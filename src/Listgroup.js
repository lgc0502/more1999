import React,{Component} from 'react'
import borders from 'react-vis/dist/plot/borders';

const c = [
    {
        title:"路燈故障",
        subtitle:"9盞以下路燈故障",
        town:"永康區",
        status:"處理中...",
        description:"中山北路的肯德基前有一隻狗正在過馬路",
        date:"2018-08-10"
    },
    {
        title:"路燈故障",
        subtitle:"9盞以下路燈故障",
        town:"永康區",
        status:"處理中...",
        description:"中山北路的肯德基前有一隻狗正在過馬路",
        date:"2018-08-10"
    }
]

class Listgroup extends Component{
    render(){
        
        return(
               <div className="overview">{
                c.map((d)=>(
              
                <div class="ui raised segment case">
                    <div className="listcategory">
                    {/*<svg className="icon" width="20" height="20">
                     <circle  style={{
                        cx:"10",
                        cy:"10",
                        r:"4",
                        fill:"red" }}/></svg> */}
                    <span className="categorydescription" style={{fontWeight:600}} >{d.title} </span>
                    <span className="categorydescription" style={{fontWeight:600}} >{d.subtitle}</span></div>
                    <div className="casedescription">
                    <p style={{marginTop:1 ,marginBottom:0.5}}>{d.town}</p>
                    <p>{d.description}</p>
                    <p style={{color:"gray"}}>{d.status}</p>
                    <p style={{fill:"gray"}}>{d.date}</p>
                    </div>  
                </div>
                ))} </div>
                
            
        )
    }
}
export default Listgroup