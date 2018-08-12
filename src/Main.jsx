import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Historicalstatistics from './Historicalstatistics.js';
import Instantnotification from './Instantnotification.js';

const Main=()=>{
    return(
        <main>
            <Switch>
                <Route exact path='/' component={Historicalstatistics}/>
                <Route exact path='/instantnotification' component={Instantnotification}/>
            </Switch>
        </main>
    )
}

   
export default Main