
function showPosition(position){
    var position = new Object();
    position['lat']=position.coords.latitude;
    position['lon']=position.coords.longitude;
    console.log(position)
    return position
}

export default {
    geyLocation:()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
        }else{
            alert("Geolocation is not supported by this brower.");
        }
    }
    
}
