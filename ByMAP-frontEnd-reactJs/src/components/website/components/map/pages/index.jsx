

import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";
import GlobalApi from "../services/GlobalApi";
import { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import GoogleMap_ from "../components/GoogleMap_";
import { BusinessListContext } from "../context/BusinessListContext";

import { SelectedBusinessContext } from "../context/SelectedBusinessContext";
import BusinessToast from "../components/BusinessToast";

export default function Home() {
  const [businessList,setBusinessList]=useState([]);
  const [selectedBusiness,setSelectedBusiness]=useState([]);

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(()=>{
    if(userLocation)
      getNearByPlace('restaurant');
    
   
  },[userLocation])

  const getNearByPlace = (category) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
  
        // Save user's location in localStorage
        localStorage.setItem('userLocation', JSON.stringify({ lat: userLat, lng: userLng }));
  
        // Use the user's location in the API call
        GlobalApi.getNearByPlace(category, userLat, userLng)
          .then((resp) => {
            console.log(resp.data);
            setBusinessList(resp.data.results);
          })
          .catch((error) => {
            console.error('Error fetching nearby places:', error);
          });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };
  return (
    <div className="flex">
      <SelectedBusinessContext.Provider value={{selectedBusiness,setSelectedBusiness}}>
      <BusinessListContext.Provider value={{businessList,setBusinessList}}>
  
      <div className="grid grid-cols-1
      md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8">
        <div>
          {/* Search Bar  */}
          <SearchBar/>
          {/* Category List  */}
          <CategoryList setSelectedCategory={(category)=>
            getNearByPlace(category)} />
          {/* Business List */}
          <BusinessList businessListData={businessList} />
        </div>

        {/* Google Map */}
        <div className="order-first md:order-last">
          <GoogleMap_/>
          <BusinessToast userLocation={userLocation} />
        </div>
      </div>
      </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
  );
}
