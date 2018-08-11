import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom'

const Header = () =>{
    return(
        <header className="App-header">
            <Link to="/"><text>上週累積</text></Link>
            <Link to="/instantnotification"><text>待處理通報</text></Link>
        </header>
    )
}
export default Header