
var geo_options={
    enableHighAccuracy: true,
    maximumAge:60000,
    timeout:30000,
}
var p=new Object();
export default {
    getLocation:()=>{
        if(navigator.geolocation){
            return new Promise((res,rej)=>{
                navigator.geolocation.getCurrentPosition(res,rej,geo_options);
            })
        }else{
            alert("Geolocation is not supported by this brower.");
        }
        
    }
    
}
