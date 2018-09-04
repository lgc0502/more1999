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
            allbtn:true,
            crosshairValues: [],
            allbtncolor:"ui orange button",
            unfinishbtncolor:"ui orange basic button",
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
                isLoading : false,
                allbtncolor:"ui orange button",
                unfinishbtncolor:"ui orange basic button",
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
    allbutton(){
        this.setState({
            allbtn:true,
            allbtncolor:"ui orange button",
            unfinishbtncolor:"ui orange basic button",
        })
    }
    unfinishbutton(){
        this.setState({
            allbtn:false,
            allbtncolor:"ui orange basic button",
            unfinishbtncolor:"ui orange button"
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
            <div class="load">
                <h3 id="load_text">正在接通1999 ......</h3>
              </div>
            )
        }

        return (
            <div className="Personalreport">
                 <svg className="line-block"><line x1="30%" y1="0" x2="70%" y2="0" stroke="gray"/></svg>
                <h3><font style={{color:"#598c14"}}>{this.state.address}</font></h3>
                <h2>ON AIR</h2>
                <h3>收聽範圍一公里</h3>
                <svg className="line-block"><line x1="40%" y1="0" x2="60%" y2="0" stroke="gray"/></svg>
                <div className="personal-control">
                    <div className="control btnbar">
                        <div className="ui buttons">
                            <button className={this.state.allbtncolor} onClick={this.allbutton.bind(this)}>全部</button>
                            <button className={this.state.unfinishbtncolor} onClick={this.unfinishbutton.bind(this)}>未完工</button>
                        </div>
                    </div>
                    <div className="ui input control">
                        <input type="text" placeholder="搜尋地點 查看通報狀況..." value={this.state.location} onChange={evt=>this.updateInputValue(evt)}/>
                        <button className="ui small icon button" onClick={this.handleclick.bind(this)}>
                            <i className="search icon"></i>
                        </button>
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