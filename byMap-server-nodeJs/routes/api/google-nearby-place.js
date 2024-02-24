const axios = require('axios')
const router = require('express').Router()

const BASE_URL='https://maps.googleapis.com/maps/api/place'
const GOOGLE_API_KEY="AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU"

router.get('/api/google-nearby-place', async (req, res) => {
    req.query.category = "clothing_store";
    try{
        const responce=await axios(BASE_URL+
            '/nearbysearch/json?fields=formatted_address,name,rating,opening_hours,geometry,photos&type='+
        req.query.category+'&location='+req.query.lat+','+req.query.lng+'&radius=5000&key='
        +GOOGLE_API_KEY);

        const data=responce.data;
        res.status(200).json(data);
    }catch(error)
    {
        console.error(error)
        res.status(500).json({error:error});
    }
})


module.exports = router;