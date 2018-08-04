
function crossmonth(today,cross,date,label){
    let i = 1
    let date31 = [1,3,5,7,8,10,12]
    if (label === "end")
        cross.enddate = 1;
    else
        cross.begindate = 1;
    for (i=0;i<date31.length;i++)
    {
        if (today.getMonth()+1 == date31[i] )
            return 31+date
    }
    return 30+date
}

export default {
    
    
    lastweekdate:()=>{
        let today = new Date()
        let cross = {begindate:0,enddate:0}
        
        
        let end_date = today.getDate() - today.getDay()
        end_date = (end_date>0)?end_date:crossmonth(today,cross,"end")
        
        let begin_date = end_date -7
        begin_date  = (begin_date>0)?begin_date :crossmonth(today,cross,"begin")
      
        //y-m-d
        begin_date  = (today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(cross.enddate === 0&cross.begindate == 0?today.getMonth()+1:today.getMonth())+"-"+begin_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+begin_date;
        end_date = (today.getMonth()<10) ? today.getFullYear()+"-"+"0"+(cross.enddate === 0?today.getMonth()+1:today.getMonth())+"-"+end_date : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+end_date;
        
        return {
            begin:begin_date,
            end:end_date
        }
    } 
}