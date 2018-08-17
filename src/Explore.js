import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';

class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:''
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
    }
    render(){
        return (
            <div>
                <h3>搜尋地點 查看通報狀況</h3>
                <div className="ui large input">
                    <input type="text" placeholder="Search..." value={this.state.location} onChange={evt=>this.updateInputValue(evt)}/>
                    <button className="ui icon button" onClick={this.handleclick.bind(this)}>
                        <i class="search icon"></i>
                    </button>
                </div>
                <Exploremap data={this.props.towngeo}/>
            </div>
        )
    }
}
export default Explore