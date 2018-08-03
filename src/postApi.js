import React,{Component} from "react"
import axios from "axios";

let today = new Date()
let end_date = today.getDate() - today.getDay()
let enddatecross = 0
let begindatecross = 0

function crossmonth(date,label){
    let i = 1
    let date31 = [1,3,5,7,8,10,12]
    if (label == "end")
        enddatecross = 1;
    else
        begindatecross = 1;
    
    for (i=0;i<date31.length;i++)
    {
        if (today.getMonth()+1 == date31[i] )
            return 31+date
    }
    return 30+date
}
end_date = (end_date>0)?end_date:crossmonth(end_date,"end")
let begin_date = end_date -7
begin_date  = (begin_date>0)?begin_date :crossmonth(begin_date,"begin")

export default {
   
    requertPost:(selectedtown,selectedvill)=>{
        return axios.get('/village_visualization', {
            params:{
                town:selectedtown,
                village: selectedvill,
                begin_date:(today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(enddatecross == 0&begindatecross == 0?today.getMonth()+1:today.getMonth())+"-"+begin_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+begin_date,
                end_date:(today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(enddatecross == 0?today.getMonth()+1:today.getMonth())+"-"+end_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+end_date,
            }
        })
        .then(response=>{
            alert("ok")
            return {res:response.data}
        })
        .catch(error=>{
            alert("error")
            console.log(error)
        })
    }
}