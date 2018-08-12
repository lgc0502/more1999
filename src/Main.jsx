import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Historicalstatistics from './Historicalstatistics.js';
import Instantnotification from './Instantnotification.js';

const Main=(props)=>{
    console.log(props)
    const data = props
    return(
        <main>
            <Switch>
                <Route exact path='/' render={()=>(<Historicalstatistics towngeo={data}/>)}/>
                <Route exact path='/instantnotification' component={Instantnotification}/>
            </Switch>
        </main>
    )
}

   
export default Main