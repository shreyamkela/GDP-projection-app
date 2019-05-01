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

app.post("/", (req, res) => {
  let query = req.body.query;
  console.log(query);
  let value = null;
  try {
    // if expression is invalid then eval will throw error and would send 500 error code to frontend, therefore we need a try catch to tackle invalid expressions
    // 2 types of errors can be caught - 1) If the expression is invalid, eval doesnt work and crashes, 2) if there is math error i.e divide by zero, eval outputs infinity
    value = eval(query); // eval function can evaluate a valid mathematical expression - https://www.geeksforgeeks.org/javascript-eval-function/
    // FIXME Round off value to 2-3 decimal places if decimal exists in the value
    console.log("value" + value);
    console.log();
    if (value == Infinity) {
      throw e;
    }
    res.status(200).send({ value: value }); // Send value and success status to 3000
  } catch (e) {
    // let value = "INVALID INPUT";
    // res.statusMessage("invalid");
    if (value == Infinity) {
      res.status(400).send("INFINITY");
    } else {
      console.log("INVALID EXPRESSION");

      res.status(400).send("INVALID EXPRESSION"); // Send "Invalid input" and Bad request error 400 status to 3000
    }
  }
});

app.listen(port, () => {
  console.log(`Express Server is up on port ${port}`);
});
