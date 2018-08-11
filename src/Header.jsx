import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom'

const Header = () =>{
    return(
        <header className="App-header">
            <Link to="/"><Text>上週累積</Text></Link>
            <Link to="/instantnotification"><Text>待處理通報</Text></Link>
        </header>
    )
}
export default Header