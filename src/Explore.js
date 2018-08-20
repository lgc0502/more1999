import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';
import geolocation from './geolocation'
class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:'',
            lat_lng:'',
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

        // postApi.requertPost('./explore',{
        //     params:{
        //       location:this.state.location,
        //     }
        //   }).then(data => {
        //     this.setState({
        //       lat_lng:data,
        //       isLoading : false
        //     })
        //  })
    }
    componentDidMount(){
        let p=geolocation.getLocation()
        this.setState({
            lat_lng:[p.lat,p.lon],
            isloading:false
        })

    }
    render(){
        console.log(this.state.lat_lng)
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
                <Exploremap point={[this.state.lat_lng.lat,this.state.lat_lng.lon]} data={this.props.towngeo}/>
            </div>
        )
    }
}
export default Explore