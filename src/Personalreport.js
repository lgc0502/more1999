import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';
import postApi from './postApi.js';
import ReactDOM from 'react-dom';

class Personalreport extends Component {
    constructor(props){
        super(props);
        this.state = {
            width:props.width||0,
            location:'',
            result:'',
            address:props.Address,
            lat_lng:props.position,
            cases:props.Detail,
            unfinish:props.Unfinish,
            Category:props.Category,
            DailyNum:props.DailyNum,
            HourNum:props.HourNum,
            Time:props.Time,
            isLoading:false,
            crosshairValues: []
        };
    }
    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          
          if(!width){
            width = parentDom.offsetWidth;
            
            if(width>600){
              width = width
              height = width*0.2
            }else{
              width = width
              height = width*0.2
            }
          }
          
          this.setState({width,height});
        }catch(ignore){}
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
                result:data.res.result,
                lat_lng:data.res.position,
                cases:data.res.Detail,
                unfinish:data.res.Unfinish,
                Category:data.res.Category,
                DailyNum:data.res.DailyNum,
                HourNum:data.res.HourNum,
                Time:data.res.Time,
                allbtn:true,
                isLoading : false
            },()=>{if(this.state.result==="success")
                    this.setState({
                        address:this.state.location
                    })
                    else{
                        this.setState({
                            address:"台南火車站（你輸入的位置無法辨識）"
                        })
                    }})
         })
    }
    all(){
        this.setState({
            allbtn:true,
        })
    }
    unfinish(){
        this.setState({
            allbtn:false,
        })
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.updateSize.bind(this));
      }
    render(){
       if(this.state.isLoading){
            return (
             <div className="loaddata">
               <h3 id="load_text">還在找 ......</h3>
             </div>
            )
        }
       
        return (
            <div className="Personalreport">
                <h2>搜尋地點 查看通報狀況</h2>
                <div className="ui input">
                    <input type="text" placeholder="Search..." value={this.state.location} onChange={evt=>this.updateInputValue(evt)}/>
                    <button className="ui icon button" onClick={this.handleclick.bind(this)}>
                        <i className="search icon"></i>
                    </button>
                </div>
                <div className='current-location'>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{this.state.address}</span>
                </div>
                <div className="btnbar">
                    <div className="ui buttons">
                        <button className="ui orange button" onClick={this.all.bind(this)}>全部</button>
                        <button className="ui orange button" onClick={this.unfinish.bind(this)}>未完工</button>
                    </div>
                </div>
                <div className="report">
                    <Exploremap 
                        {...this.state}/>
                </div>
            </div>
        )
    }
}
export default Personalreport