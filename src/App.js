import React, { Component } from "react"
import Header from './Header'
import Main from './Main'


const App=(props) => {
    return (
        <div className="App"> 
          <Header/>
          <Main {...props}/>    
        </div>
    )
}

export default App