import React from 'react';
import {Switch,Route,PropsRoute} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics'
import Instantnotification from './Instantnotification'
const Main = (props) =>{
   
        <Switch>
            <PropsRoute path='/' component={Historicalstatistics} data={props}/>
            <Route path='/instantnotification' component={Instantnotification}/>
        </Switch>
    
}
export default Main