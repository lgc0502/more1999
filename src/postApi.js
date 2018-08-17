import axios from "axios";
import date from "./Date"

export default {

    requertPost:(url,param)=>{
       
        return axios.get(url,param)
        .then(response=>{
            return {res:response.data}
        })
        .catch(error=>{
            alert("error")
            console.log(error)
        })
    }
}