import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'

const Main=(props)=>{ 
    const data = props
    return(
        <main>
            <Switch>
                <Route exact path="/" component={Instantnotification}/>
                <Route path="/history" render={()=>(<Historicalstatistics towngeo={data}/>)}/>
            </Switch>   
        </main>
    )
}

   
export default Main