import React from 'react'
import {Link} from 'react-router-dom'

const Header = ()=>{
    return(
        <header>
            <Link to='/'>即時通報通知</Link>
            <Link to='/instant'>上週通報累積</Link>
        </header>
    )
}
export default Header