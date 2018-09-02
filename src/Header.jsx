import React from 'react'

const Header = (props)=>{
    return(
        <header>
            {/* <img src={window.location.origin+'/image/logo.png'} className="logo" alt="Tainan City Hall"/> */}
            <img src={props.logo} className="logo" alt="Tainan City Hall"/>
            <h1 className="topic">台南視政廳</h1>
        </header>
    )
}
export default Header