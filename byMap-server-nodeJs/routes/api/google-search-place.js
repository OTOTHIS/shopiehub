const axios = require('axios')
const router = require('express').Router()

const BASE_URL='https://maps.googleapis.com/maps/api/place'
const GOOGLE_API_KEY="AIzaSyDCnCdCAWm-OISbfMyniHMNIy5NBqXF_YU"

router.get('/api/google-search-place', async (req, res) => {
    console.log(req.query)
    try{
        const responce=await axios(BASE_URL+
            "/findplacefromtext/json"+
            "?fields=formatted_address,name,rating,opening_hours,geometry,photos"+
            "&input="+req.query.searchtext+
            "&inputtype=textquery"+
            "&locationbias=circle:30000@"+req.query.lat+","+req.query.lng+
            "&key="+GOOGLE_API_KEY);

        const data=responce.data;
        res.status(200).json(data);
    }catch(error)
    {
        console.error(error)
        res.status(500).json({error:error});
    }
})


module.exports = router;