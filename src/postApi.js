import axios from "axios";
import date from "./Date"

export default {

    requertPost:(url,param)=>{
        if (param ==="null")
        {
            return axios.get(url)
            .then(response=>{
                return {res:response.data}
            })
            .catch(error=>{
                alert("error")
                console.log(error)
            })
        }
        else{
            return axios.get(url,param)
            .then(response=>{
                console.log("requrst successful")
                return {res:response.data}
            })
            .catch(error=>{
                alert("error")
                console.log(error)
            })
        }

        
    }
}