var express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const appRoutes = require("./app/appEndpoints");
const twilioRoutes = require("./app/twilioEndpoints");

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// configure body parser for handle request body
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Configure static folder of sites
app.use(express.static("public"));

// Configure api routes
app.use("/mijo/_api", appRoutes);
app.use("/mijo/twilio", twilioRoutes);

// Generate url to gatsby sites
fs.writeFileSync(
  "./sites-config.js",
  `export default {
  API_PLACE_ORDER_URL: "${process.env.APP_URL}${process.env.APP_PLACE_ORDER_ENDPOINT}",
};
`
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
