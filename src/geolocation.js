

var p=new Object();
export default {
    getLocation:()=>{
        if(navigator.geolocation){
            return new Promise((res,rej)=>{
                navigator.geolocation.getCurrentPosition(res,rej);
            })
        }else{
            alert("Geolocation is not supported by this brower.");
        }
        
    }
    
}
