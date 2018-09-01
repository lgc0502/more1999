import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import "./App.css";
const App =(props)=> {
  
    return (
        <div className="App"> 
          <Header {...props}/>
          <Main {...props}/>
        </div>
    );
}



export default App;
