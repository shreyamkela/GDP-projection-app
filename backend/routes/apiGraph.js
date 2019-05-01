// GET request to fetch data from the GDP api
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function(req, res) {
  console.log("GET /api/graph called - fetch GDP data");
  let fetchData = async () => {
    let params = { per_page: 5000, format: "json" };
    try {
      response = await axios.get("http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD", { params: params });
      let results = response.data;
      results[0] = {
        indicator: {
          id: "NY.GDP.MKTP.CD",
          value: "GDP (current US$)"
        },
        country: {
          id: "US",
          value: "United States"
        },
        value: null,
        decimal: "0",
        date: "2018"
      };

      for (const obj of results[1]) {
        delete obj["indicator"];
        delete obj["country"];
      }

      res.status(200).send(results);
    } catch (error) {
      res.status(400).send("Unable to fetch data. Please try again.");
    }
  };
  fetchData();
});

module.exports = router;
