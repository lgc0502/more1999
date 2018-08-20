import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';
import geolocation from './geolocation';
import postApi from './postApi.js';
class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:'',
            lat_lng:'',
            category:{},
            time:{},
            case:{},
            isloading:true
        };
    }
    updateInputValue(evt){
        this.setState({
            location:evt.target.value
        });
    }
    handleclick(){
        //postApi
        console.log(this.state.location)
        postApi.requertPost('./explore',{
            params:{
              location:this.state.location,
            }
          }).then(data => {
            this.setState({
              lat_lng:data.position,//array
              category:data.category,//object
              time:data.hour,//object
              case:data.detail,//array
              isLoading : false
            })
         })
    }
    componentDidMount(){
        geolocation.getLocation().then(data=>{
            console.log("data")
            console.log(data)
        })
        this.setState({
            lat_lng:[23.0,121.3],
            isloading:false
        },()=>{
            postApi.requertPost('./position',{
                params:{
                  lat:23.0,
                  lon:121.3,
                }
              }).then(data => {
                  console.log(data)
                    this.setState({
                        category:data.category,//object
                        time:data.hour,//object
                        case:data.detail,//array
                        isLoading : false
                    })
             })
        })
        

    }
    render(){
        console.log(this.state)
        if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">還在找 ......</h3>
             </div>
            )
        }
        return (
            <div>
                <h3>搜尋地點 查看通報狀況</h3>
                <div className="ui large input">
                    <input type="text" placeholder="Search..." value={this.state.location} onChange={evt=>this.updateInputValue(evt)}/>
                    <button className="ui icon button" onClick={this.handleclick.bind(this)}>
                        <i class="search icon"></i>
                    </button>
                </div>
                <Exploremap 
                    point={[this.state.lat_lng.lat,this.state.lat_lng.lon]} 
                    category={this.state.category}//object
                    time={this.state.time}//object
                    case={this.state.case}//array
                    data={this.props.towngeo}/>
            </div>
        )
    }
}
export default Explore