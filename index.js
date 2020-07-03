const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

// Connect to db
const url = process.env.DB_URL;
const config = {
  db: "Open4Tech",
};

(async () => {
  try {
    const conn = await mongoose.connect(`${url}${config.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useCreateIndex", true);

    console.log(`Connected to ${config.db} database.`);

    // Middlewares
    app.use(express.json());

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
