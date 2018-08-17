import React ,{Component} from 'react';
import React_leaflet from './React_leaflet.js';

class Explore extends Component {
    render(){
        return (
            <div>
                <h1>搜尋地點 查看通報狀況</h1>
                <div className="ui input">
                    <input type="text" placeholder="Search..."/>
                    <button className="ui icon button">
                        <i class="search icon"></i>
                    </button>
                </div>
                <React_leaflet data={this.props.towngeo}/>
            </div>
        )
    }
}