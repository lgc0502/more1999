import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom'

const MainMenu = () =>{
    return(
        <div>
            <Link to="/">
                <button>上週累積</button>
            </Link>
            <Link to="instantnotification">
                <button>待處理通報</button>
            </Link>
        </div>
    )
}
export default MainMenu