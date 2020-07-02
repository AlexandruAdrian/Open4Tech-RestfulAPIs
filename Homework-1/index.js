const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
const questionRoutes = require("./routes/questionRoutes");
app.use(questionRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
