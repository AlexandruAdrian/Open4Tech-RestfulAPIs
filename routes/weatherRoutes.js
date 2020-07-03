const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const WEATHER_API = "http://api.openweathermap.org/data/2.5/weather";
const cache = {};

function weatherRoutes() {
  const router = express.Router();

  router.get("/weather", async (req, res) => {
    const { city } = req.query;

    if (!city) {
      return res.sendStatus(400);
    }

    let body = {};
    const url = `${WEATHER_API}?q=${city}&appid=${API_KEY}`;
    const apiCache = cache[url];
    let now = new Date().getTime();
    const HOUR = 60 * 60 * 1000;

    if (apiCache && now - apiCache.time < HOUR) {
      body = apiCache.data;
    } else {
      const response = await fetch(url);

      if (response.status === 200) {
        body = await response.json();
        cache[url] = {
          time: now,
          data: body,
        };
        return res.status(response.status).json(body);
      } else {
        return res.sendStatus(response.status);
      }
    }

    res.status(200).json(body);
  });

  return router;
}

module.exports = weatherRoutes();
