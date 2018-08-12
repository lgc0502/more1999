import React from 'react';
import {Switch,Route,PropsRoute} from 'react-router-dom'
import Historicalstatistics from './Historicalstatistics.js'
import Instantnotification from './Instantnotification.js'

// const Main=(props)=>{
//     return(
//         <Switch>
//             <PropsRoute exact path='/' component={Historicalstatistics} data={props}/>
//             <Route exact path='/instantnotification' component={Instantnotification}/>
//         </Switch>
//     )
// }
const Main=
        <Switch>
            <PropsRoute exact path='/' component={Historicalstatistics} data={props}/>
            <Route exact path='/instantnotification' component={Instantnotification}/>
        </Switch>
   
export default Main