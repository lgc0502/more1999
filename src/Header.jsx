import React from 'react'
import {Link} from 'react-router-dom'
const i = 0
const Header = ()=>{
    return(
        <header>
            <Link to='/'>即時通報通知</Link>
            <Link to={{
                pathname:'/instant',
                state: {id: i+1}
            }}>上週通報累積</Link>
        </header>
    )
}
export default Header