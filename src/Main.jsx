import React from 'react';
import {Switch,Route,PropsRoute} from 'react-router-dom';
import Historicalstatistics from './Historicalstatistics.js';
import Instantnotification from './Instantnotification.js';

const Main=()=>{
    return(
        <main>
            <Switch>
                <Route exact path='/' component={Instantnotification}/>
                <Route exact path='/instantnotification' component={Historicalstatistics}/>
            </Switch>
        </main>
    )
}

   
export default Main