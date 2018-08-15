import React from 'react'
import {NavLink} from 'react-router-dom'

const i = 0
const Header = ()=>{
    return(
        <header className='ui grid container'>
            <NavLink 
                exact
                className="four wide column"
                to='/'
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'red'
                }}
            >即時通報通知</NavLink>
            <NavLink 
                className="four wide column"
                to={{
                    pathname:'/history',
                    state: {id: i+1}
                }}
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'red'
                }}
            >上週通報累積</NavLink>
            
        </header>
    )
}
export default Header