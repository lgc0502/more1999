import React,{Component} from "react"
import axios from "axios";

let today = new Date()
let end_date = today.getDate() - today.getDay()
let begin_date = end_date -7

export default {
    requertPost:(selectedtown,selectedvill)=>{
        return axios.get('/village_visualization', {
            params:{
                town:selectedtown,
                village: selectedvill,
                begin_date:(today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(today.getMonth()+1)+"-"+begin_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+begin_date,
                end_date:(today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(today.getMonth()+1)+"-"+end_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+end_date,
            }
        })
        .then(response=>{
            alert("ok")
            response.data.then((value)=>{return {res:value} })
        })
        .catch(error=>{
            alert("error")
            console.log(error)
        })
    }
}