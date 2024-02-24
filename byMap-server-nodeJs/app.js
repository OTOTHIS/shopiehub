const express = require("express");
const app = express();
const port = 9900;
const morgan = require("morgan");
// For parsing JSON data in the request body
app.use(express.json());

// CORS
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
const opreation = require("./routes/operation");
const entrepots = require("./routes/Entrepost");
const googlenearbyplace = require("./routes/api/google-nearby-place");
const googlesearchplace = require("./routes/api/google-search-place");
const produit = require("./routes/produit");

const home = require("./routes/home");
app.use(entrepots);

app.use(produit);

app.use(home);
// const map = require('./routes/map');
// app.use(map);

app.use(googlenearbyplace);

app.use(googlesearchplace);

app.use(opreation);

app.listen(port, () => {
  console.log(`L'application est en écoute sur le port ${port}`);
});
