


export default {
    getLocation:()=>{
        if(navigator.geolocation){
            console.log(navigator.geolocation.getCurrentPosition(showPosition));
        }else{
            alert("Geolocation is not supported by this brower.");
        }
    }
    
}
function showPosition(position){
    var p = new Object();
    p['lat']=position.coords.latitude;
    p['lon']=position.coords.longitude;
    console.log(p)
    return p
}
