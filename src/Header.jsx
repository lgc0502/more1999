import React from 'react'
import {NavLink} from 'react-router-dom'

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
                   
                }}
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >上週通報累積</NavLink>
            <NavLink 
                to={{
                    pathname:'/explore',
                }}
                activeClassName="selected"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >探索周遭</NavLink>
            
        </header>
    )
}
export default Header