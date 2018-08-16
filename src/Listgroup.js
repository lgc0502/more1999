import React,{Component} from 'react'


// const c = [
//     {
//         category:"路燈故障",
//         area:"永康區",
//         address:'ccc',
//          description:"中山北路的肯德基前有一隻狗正在過馬路",
//         date:"2018-08-10"
//     },
//     {
//         title:"路燈故障",
//         subtitle:"9盞以下路燈故障",
//         town:"永康區",
//         status:"處理中...",
//         description:"中山北路的肯德基前有一隻狗正在過馬路",
//         date:"2018-08-10"
//     }
// ]

class Listgroup extends Component{
    constructor(props){
        super(props)
        this.state = {
            unfinishlist:props.res.UnfinishList
        }
    }
    render(){
        const {unfinishlist} = this.state
        return(
            <div className="overview">
                {
                    unfinishlist.map((d,i)=>(
                        <div key={d.category+i} className="ui raised segment case">
                            <div className="listcategory">
                                <span className="categorydescription" style={{fontWeight:600}} >{d.category} </span>
                            </div>
                            <div className="casedescription">
                                <p style={{marginTop:1 ,marginBottom:0.5}}>{d.area}</p>
                                <p style={{marginTop:1 ,marginBottom:0.5}}>{d.address}</p>
                                <p>{d.description}</p>
                                <p style={{color:"gray"}}>處理中</p> 
                                <p style={{fill:"gray"}}>{d.date}</p>
                            </div>  
                        </div>
                    ))
                } 
            </div>  
        )
    }
}
export default Listgroup