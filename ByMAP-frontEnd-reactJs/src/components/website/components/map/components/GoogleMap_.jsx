import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useContext } from 'react'
import { UserLocationContext } from '../context/UserLocationContext';
import Marker from './Marker';
import { SelectedBusinessContext } from '../context/SelectedBusinessContext';

function GoogleMap_() {
    const {userLocation,setUserLocation}=useContext(UserLocationContext)
    const {selectedBusiness,setSelectedBusiness}=useContext(SelectedBusinessContext)
    const containerStyle = {
        width: '100%',
        height: '500px',
        borderRadius:20
      };
  
      const userLocal = localStorage.getItem("userLocation")
      const parsed = JSON.parse(userLocal);
  return (
    <div>
 <LoadScript
        googleMapsApiKey={"AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU"}
      >
     <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            !selectedBusiness.name?  {
                lat:parsed.lat,
                lng:parsed.lng
            }:selectedBusiness.geometry.location
          }
          zoom={selectedBusiness.name?15:10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <>
          <Marker userLocation={parsed} />
          </>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMap_