function crossmonth(today,begindatecross,enddatecross,date,label){
    let i = 1
    let date31 = [1,3,5,7,8,10,12]
    if (label === "end")
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

export default {
    lastweekdate:()=>{
        let today = new Date()
        let enddatecross = 0
        let begindatecross = 0
        
        let end_date = today.getDate() - today.getDay()
        end_date = (end_date>0)?end_date:crossmonth(today,begindatecross,enddatecross,end_date,"end")
        end_date = (end_date>10)?end_date:"0"+end_date
        
        let begin_date = end_date -7
        begin_date  = (begin_date>0)?begin_date :crossmonth(today,begindatecross,enddatecross,begin_date,"begin")
        begin_date = (begin_date>10)?begin_date:"0"+begin_date

        let begin_month = (enddatecross === 0 & begindatecross === 0)?today.getMonth()+1:today.getMonth()
        begin_month = (today.getMonth()<10) ? "0"+begin_month:begin_month
        let end_month = (enddatecross === 0)?today.getMonth()+1:today.getMonth()
        end_month = (today.getMonth()<10) ? "0"+end_month:end_month
        //y-m-d
        begin_date  =today.getFullYear()+"-"+begin_month+"-"+begin_date 
        end_date = today.getFullYear()+"-"+end_month+"-"+end_date
        
        return {
            begin:begin_date,
            end:end_date
        }
    } 
}