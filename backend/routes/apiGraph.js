// GET request to fetch data from the GDP api
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  console.log("GET /api/graph called - fetch GDP data");
  res.status(200).send("SUCCESS");
});

module.exports = router;
