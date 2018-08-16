import axios from "axios";
import date from "./Date"

export default {

    requertPost:(url,selectedtown,selectedvill)=>{
       
        return axios.get(url, {
            params:{
                town:selectedtown,
                village: selectedvill,
                begin_date:date.lastweekdate().begin,
                end_date:date.lastweekdate().end,
            }
        })
        
        .then(response=>{
            return {res:response.data}
        })
        .catch(error=>{
            alert("error")
            console.log(error)
        })
    }
}