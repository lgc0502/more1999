import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'

const Main=(props)=>{ 
    const data = props
    return(
        <main>
            <Switch>
                <Route exact path="/" render={()=>(<Historicalstatistics towngeo={data}/>)}/>
                <Route exact path="/instant" render={()=><Instantnotification/>}/>
            </Switch>   
        </main>
    )
}

   
export default Main