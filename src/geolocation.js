


export default {
    getLocation:()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition(position));
        }else{
            alert("Geolocation is not supported by this brower.");
        }
    }
    
}
function showPosition(position){
    var position = new Object();
    position['lat']=position.coords.latitude;
    position['lon']=position.coords.longitude;
    console.log(position)
    return position
}
