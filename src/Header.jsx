import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom'

const Header = () =>{
    return(
        <header className="App-header">
            <Link to="/">上週累積</Link>
            <Link to="/instantnotification">待處理通報</Link>
        </header>
    )
}
export default Header