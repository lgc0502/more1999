import React ,{Component} from 'react';
import Exploremap from './Exploremap.js';

class Explore extends Component {
    render(){
        return (
            <div>
                <h3>搜尋地點 查看通報狀況</h3>
                <div className="ui input">
                    <input type="text" placeholder="Search..."/>
                    <button className="ui icon button">
                        <i class="search icon"></i>
                    </button>
                </div>
                <Exploremap data={this.props.towngeo}/>
            </div>
        )
    }
}
export default Explore