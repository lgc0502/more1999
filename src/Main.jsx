import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'
import Explore from './Explore'

const Main=(props)=>{ 
    const data = props
   
    return(
        <main>
            <Switch>
                <Route exact path="/" component={Instantnotification}/>
                <Route path="/history" render={()=>(<Historicalstatistics towngeo={data}/>)}/>
                <Route path="/explore" render={()=>(<Explore  datapath={data}/>)}/>
                <Route component={Instantnotification}/>
            </Switch>   
        </main>
    )
}

   
export default Main