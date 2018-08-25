import React,{Component} from 'react'


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
            <div className="caseslist">
                <table className="ui basic table">
                <thead>
                    <tr>
                        <th>地區</th>
                        <th>類別</th>
                        <th>描述</th>
                        <th>狀態</th>
                        <th>通報時間</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    unfinishlist.map((d,i)=>(
                        <tr key={d.category+i}>
                            <td>{d.area}</td>
                            <td>{d.category}</td>
                            <td>{d.description}</td>
                            <td>處理中...</td>
                            <td>{d.date}</td>
                     
                            {/* <svg className="icon" width="20" height="20">
                                <circle  style={{
                                    cx:"10",
                                    cy:"10",
                                    r:"4",
                                    fill:"orange" }}/></svg> */}
                        </tr>
                    ))
                } 
                </tbody>
                </table>
            </div>  
        )
    }
}
export default Listgroup