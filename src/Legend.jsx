import React from 'react'
function getColor(d){

    return d > 100 ? '#FFEDA0':
           d > 80  ? '#BD0026':
           d > 60  ? '#E31A1C':
           d > 40  ? '#FC4E2A':
           d > 20  ? '#FD8D3C':
           d > 0   ? '#FEB24C':
           d === 0 ? '#FED976':
                    '#FFEDA0';
}
function legendinfo(grades,i){
    if (grades[i + 1])
        return  `${grades[i]}～${grades[i+1]}`
    else
        return  `${grades[i]}+`
}
const Legend = ()=>{
    
        const grades = [0, 20, 40, 60, 80, 100]
        
        return(
            <div className="legend">
            {
                grades.map((d,i)=>(
                    <div>
                    <i style={{background: getColor(grades[i])}}></i>
                        {legendinfo(grades,i)}
                    </div>
                ))
            }
            </div>

        )
};
export default Legend