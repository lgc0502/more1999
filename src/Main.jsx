import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Historicalstatistics from './Historicalstatistics.js';
import Instantnotification from './Instantnotification.js';

const Main=(props)=>{
    return(
        <main>
            <Switch>
                <Route exact path='/' render={props=><Historicalstatistics {...props}/>}/>
                <Route exact path='/instantnotification' component={Instantnotification}/>
            </Switch>
        </main>
    )
}

   
export default Main