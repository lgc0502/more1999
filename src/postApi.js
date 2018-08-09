import React,{Component} from "react"
import axios from "axios";
import date from "./Date"



export default {

    requertPost:(selectedtown,selectedvill)=>{
        console.log(date.lastweekdate())
        return axios.get('/village_visualization', {
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