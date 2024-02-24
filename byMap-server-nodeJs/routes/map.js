// const router = require("express").Router();
// const axios = require("axios");
// const { route } = require("./home");

// const apiKey = "AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU";
// const endpoint = "https://places.googleapis.com/v1/places:searchNearby";
// const textSearchEndpoint = "https://places.googleapis.com/v1/places:searchText";




// // "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",

// // ChIJM2pEmXstpg0R9s03L36pf-g

// router.get("/api/searchNearby", async (req, res) => {
//   const headers = {
//     "Content-Type": "application/json",
//     "X-Goog-Api-Key": apiKey,
//     "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress", // Include placeId in the response
//   };
//   const requestData = {
//     includedTypes: ["clothing_store"],
//     maxResultCount: 10,
//     locationRestriction: {
//       circle: {
//         center: {
//           latitude: 33.5479861,
//           longitude: -7.6656633,
//         },
//         radius: 1000.0,
//       },
//     },
//   };

//   axios
//     .post(endpoint, requestData, { headers })
//     .then((response) => {
//       // Handle the API response data here
//       return res.json(response.data);
//     })
//     .catch((error) => {
//       // Handle errors here
//       console.error(error);
//     });
// });

// router.get("/getPhoto", async (req, res) => {
//   try {
//     const photoEndpoint = "https://maps.googleapis.com/maps/api/place/photo";

//     const photoParams = {
//       maxwidth: 400,
//       photoreference: req.query.photoreference,
//       key: apiKey,
//     };

//     const response = await axios.post(photoEndpoint, photoParams, { headers });

//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/getId", (req, res) => {
//   const searchTextParams = {
//     textQuery: "coffe mon ami casablanca", // Replace with your actual search query
//   };

//   axios
//     .post(textSearchEndpoint, searchTextParams, { headers })
//     .then((response) => {
//       return res.json(response);
//     })
//     .catch((error) => {
//       res.status(400).json(error);
//     });
// });






// router.get('/api/getphotoName/:name' , async (req , res)=> {

//   const headers = {
//     "Content-Type": "application/json",
//     "X-Goog-Api-Key": apiKey,
//     "X-Goog-FieldMask": "id,name,photos", // Include placeId in the response
//   };
 
//  const response = await  axios.get('https://places.googleapis.com/v1/places/'+req.params.name, { headers })
// res.json(response.data)

// //  https://places.googleapis.com/v1/places/ChIJM2pEmXstpg0R9s03L36pf-g/photos/ATplDJbG58UkIArTLbi0-FrgYQS3hOc5K48TorgtYTr1rgJT6FrAehHMStYtgJVsD3GrXLhOy2NuRTjPoaV79LcznSR17ga9Wy6b4qClwkcZv3w_UdgklmnPK7z6GKDFj5lf34sj7ptx1llhn0Y-aZIM_Ur_u_u-OXoDRwLb/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU




// }) 




// module.exports = router;
