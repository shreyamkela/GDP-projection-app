const express = require("express");
const cors = require("cors");

var app = express();
var origin = "http://localhost:3000";
var port = 3001;

//use cors to allow cross origin resource sharing. This is required to enable get and post from frontend port 3000 to this backend port 3001
app.use(cors({ origin: `${origin}`, credentials: true }));

app.use(express.urlencoded({ extended: true })); // Through this, req.body contains the POSTed form data - body-parser functionality is available with express v4.16+ in this manner. Body parser itself was deprecated in the newer versions.
app.use(express.json());
// From Postman, when checking the post routes, the req.body will by posted through x-www-form-urlencoded in the body tab Postman (not form-data)

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${origin}`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Routing
var apiGraph = require("./routes/apiGraph");
// Route configurations
app.use("/api/graph", apiGraph);

app.listen(port, () => {
  console.log(`Express Server is up on port ${port}`);
});
