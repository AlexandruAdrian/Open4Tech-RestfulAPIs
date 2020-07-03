const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();

// Connect to db
const url = process.env.MONGODB_URI || "mongodb://192.168.1.4:27017";

(async () => {
  try {
    const conn = await mongoose.connect(`${url}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useCreateIndex", true);

    console.log(`Connected to ${config.db} database.`);

    // Middlewares
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));

    // Routes
    const questionRoutes = require("./routes/questionRoutes");
    const reviewRoutes = require("./routes/reviewRoutes");
    const weatherRoutes = require("./routes/weatherRoutes");
    app.use(questionRoutes);
    app.use(reviewRoutes);
    app.use(weatherRoutes);

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  } catch (err) {
    console.error(err);
  }
})();
