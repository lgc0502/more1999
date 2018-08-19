

var p=new Object();
export default {
    getLocation:()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
        }else{
            alert("Geolocation is not supported by this brower.");
        }
        return p;
    }
    
}
function showPosition(position){
    p['lat']=position.coords.latitude;
    p['lon']=position.coords.longitude;
}
