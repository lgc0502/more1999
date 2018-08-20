

var p=new Object();
export default {
    getLocation:()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
        }else{
            alert("Geolocation is not supported by this brower.");
        }
        console.log("I got you")
        console.log(p)
        return p;
    }
    
}
function showPosition(position){
    p=position.coords;
    
}
