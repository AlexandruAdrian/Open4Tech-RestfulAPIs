const express = require("express");
const Question = require("../models/questions");

let id = 0;
function questionRoutes() {
  const router = express.Router();

  router.post("/questions", async (req, res) => {
    try {
      const q = new Question(id++, req.body.question, req.body.answer);
      q.saveToFile();
      res.status(201).json(q.getData());
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  });

  return router;
}

module.exports = questionRoutes();
