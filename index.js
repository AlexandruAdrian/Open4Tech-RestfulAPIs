const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
const questionRoutes = require("./routes/questionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
app.use(questionRoutes);
app.use(reviewRoutes);
app.use(weatherRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
