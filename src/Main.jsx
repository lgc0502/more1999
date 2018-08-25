import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'
import Explore from './Explore'

const Main=(props)=>{ 
    const data = props
    console.log("main")
    console.log(data)
    return(
        <main>
            <Switch>
                <Route exact path="/" component={Instantnotification}/>
                <Route path="/history" render={()=>(<Historicalstatistics towngeo={data}/>)}/>
                <Route path="/explore" render={()=>(<Explore  towngeo={data}/>)}/>
            </Switch>   
        </main>
    )
}

   
export default Main