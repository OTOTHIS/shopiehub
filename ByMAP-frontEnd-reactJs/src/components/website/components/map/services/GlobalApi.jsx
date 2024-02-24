import axios from "axios";


const getNearByPlace=(category,lat,lng)=>axios.get('http://localhost:9900/api/google-nearby-place?category='+
category+"&lat="+lat+"&lng="+lng);


const searchPlace=(searchtext,lat,lng)=>axios.get('http://localhost:9900/api/google-search-place?searchtext='+
searchtext+"&lat="+lat+"&lng="+lng);


export default{
    getNearByPlace,
    searchPlace
    
}
