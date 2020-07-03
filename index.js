const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
const questionRoutes = require("./routes/questionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
app.use(questionRoutes);
app.use(reviewRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
