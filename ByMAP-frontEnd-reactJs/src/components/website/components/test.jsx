import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Test() {
//     const apiKey = 'AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU';
// const endpoint = 'https://places.googleapis.com/v1/places:searchNearby';
// const location = '33.5479861,-7.6656633'; // Replace with the latitude and longitude of your desired location
// const radius = 5000; // Replace with your desired search radius in meters
// const keyword = 'restaurant';

// const requestData = {
//     includedTypes: [ 'clothing_store'],
//     maxResultCount: 10,
//     locationRestriction: {
//       circle: {
//         center: {
//           latitude: 33.5479861,
//           longitude: -7.6656633
//         },
//         radius: 1000.0
//       }
//     }
//   };
  
//   const headers = {
//     'Content-Type': 'application/json',
//     'X-Goog-Api-Key': apiKey,
//     'X-Goog-FieldMask': 'places.displayName'
//   };
  
//   axios.post(endpoint, requestData, { headers })
//     .then(response => {
//       // Handle the API response data here
//       console.log(response.data);
//     })
//     .catch(error => {
//       // Handle errors here
//       console.error(error);
//     });


 const apiKey = 'AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU';
const photoEndpoint = 'https://maps.googleapis.com/maps/api/place/photo';

const [places, setPlaces] = useState([]);
const [selectedPlace, setSelectedPlace] = useState(null);

useEffect(() => {
  // Replace 'http://localhost:3001' with the actual URL of your Node.js server
  const serverUrl = 'http://localhost:3001';

  // Fetch places nearby
//   fetch(`${serverUrl}/searchNearby`)
//     .then(response => response.json())
//     .then(data => setPlaces(data.places))
//     .catch(error => console.error('Error fetching places:', error));

axios.get(`${serverUrl}/searchNearby`).then(res=> console.log(res)).catch(err=> console.log(err))

}, []);


const handleSelectPlace = async (place) => {
    // Fetch photo for the selected place
    try {
      // Replace 'http://localhost:3001' with the actual URL of your Node.js server
      const serverUrl = 'http://localhost:3001';

      const response = await fetch(`${serverUrl}/getPhoto?photoreference=${place.photo_reference}`);
      const photoData = await response.json();

      // Update the state with the selected place and its photo data
      setSelectedPlace({
        ...place,
        photoUrl: photoData.photoUrl, // Replace with the actual property from the response
      });
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };


  return (
    <div>
    <h1>Places Nearby</h1>
    <ul>
      {places.map(place => (
        <li key={place.place_id} onClick={() => handleSelectPlace(place)}>
          {place.name}
        </li>
      ))}
    </ul>

    {selectedPlace && (
      <div>
        <h2>{selectedPlace.name}</h2>
        {selectedPlace.photoUrl && (
          <img src={selectedPlace.photoUrl} alt={selectedPlace.name} />
        )}
        {/* Display other details about the selected place */}
      </div>
    )}
  </div>

  )
}
