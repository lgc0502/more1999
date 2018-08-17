import axios from "axios";
import date from "./Date"

export default {

    requertPost:(url,param)=>{
        if (param ==="null")
        {
            console.log("1")
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
            console.log("2")
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
}