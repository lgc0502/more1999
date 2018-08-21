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
            cases:{},
            isloading:true
        };
    }
    updateInputValue(evt){
        this.setState({
            location:evt.target.value
        });
    }
    handleclick(){
        
        postApi.requertPost('./explore',{
            params:{
              location:this.state.location,
            }
          }).then(data => {
            this.setState({
              lat_lng:data.res.position,//array
              category:data.res.category,//object
              time:data.res.hour,//object
              case:data.res.detail,//array
              isLoading : false
            })
         })
    }
    componentDidMount(){
        geolocation.getLocation().then(d=>{
            
            this.setState({
                lat_lng:[22.997,120.211]//[d.coords.latitude,d.coords.longitude],
            },()=>{
                postApi.requertPost('./position',{
                
                    params:{
                      lat:22.997,//d.coords.latitude,
                      lon:120.211,//d.coords.longitude,
                    }
                  }).then(data => {
                      console.log(data)
                        this.setState({
                            address:data.res.address,
                            category:data.res.category,//object
                            time:data.res.hour,//object
                            cases:data.res.detail,//array
                            isLoading : false
                        })
                 })
            })
        })
    }
    render(){
       console.log("explore")
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
                    point={this.state.lat_lng} 
                    address={this.state.address}
                    category={this.state.category}//object
                    time={this.state.time}//object
                    cases={this.state.cases}//array
                    data={this.props.towngeo}/>
            </div>
        )
    }
}
export default Explore