import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'
import Explore from './Explore'
import geolocation from './geolocation'
const Main=(props)=>{ 
    const data = props
    return(
        <main>
            <Switch>
                <Route exact path="/" component={Instantnotification}/>
                <Route path="/history" render={()=>(<Historicalstatistics towngeo={data}/>)}/>
                <Route path="/explore" render={()=>(<Explore position={geolocation.getLocation()} towngeo={data}/>)}/>
            </Switch>   
        </main>
    )
}

   
export default Main