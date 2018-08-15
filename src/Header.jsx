import React from 'react'
import {NavLink} from 'react-router-dom'

const i = 0
const Header = ()=>{
    return(
        <header className='grid-container'>
            <NavLink 
                exact
                to='/'
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >即時通報通知</NavLink>
            <NavLink 
                to={{
                    pathname:'/history',
                    state: {id: i+1}
                }}
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >上週通報累積</NavLink>
            <NavLink 
                to={{
                    pathname:'/history',
                    state: {id: i+1}
                }}
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >上週通報累積</NavLink>
            
        </header>
    )
}
export default Header