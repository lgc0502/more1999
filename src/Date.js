function crossmonth(today,cross,date,label){
    let i = 1
    let date31 = [1,3,5,7,8,10,12]
    if (label === "end")
        cross.enddate = 1;
    else if(label ==="endmodify")
        cross.enddate_modify = 1;
    else
        cross.begindate = 1;
    
    for (i=0;i<date31.length;i++)
    {
        if (today.getMonth()+1 === date31[i] )
            return 31+date
    }
    return 30+date
}

export default{
    collectdate:(modify)=>{
        let today = new Date()
        let cross = {begindate:0,enddate:0,enddate_modify:0}
        
        let end_date = today.getDate() - today.getDay()
        let end_date_modify = end_date-1
        end_date = (end_date>0)?end_date:crossmonth(today,cross,end_date,"end")
        end_date_modify = ( end_date_modify>0)? end_date_modify:crossmonth(today,cross, end_date_modify,"end_modify")
        end_date = (end_date>10)?end_date:"0"+end_date
        end_date_modify= (end_date_modify>10)?end_date_modify:"0"+end_date_modify
        
        let begin_date = end_date -6
        begin_date  = (begin_date>0)?begin_date :crossmonth(today,cross,begin_date,"begin")
        begin_date = (begin_date>10)?begin_date:"0"+begin_date

        let begin_month = (cross.enddate === 0 & cross.begindate === 0)?today.getMonth()+1:today.getMonth()
        begin_month = (today.getMonth()<10) ? "0"+begin_month:begin_month
        let end_month = (cross.enddate === 0)?today.getMonth()+1:today.getMonth()
        let end_month_modify = (cross.enddate_modify === 0)?today.getMonth()+1:today.getMonth()
        end_month = (today.getMonth()<10) ? "0"+end_month:end_month
        end_month_modify = (today.getMonth()<10) ? "0"+end_month_modify:end_month_modify
        //y-m-d
        begin_date  =today.getFullYear()+"-"+begin_month+"-"+begin_date 
        end_date = today.getFullYear()+"-"+end_month+"-"+end_date
        end_date_modify = today.getFullYear()+"-"+end_month_modify+"-"+end_date_modify
        if(modify === "lastweek")
        {
            return begin_date+' ~ '+ end_date_modify
        }else{
            return end_date+' ~'
        }
    } 
   
}