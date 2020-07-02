const express = require("express");
const Question = require("../models/questions");

let id = 0;
function questionRoutes() {
  const router = express.Router();

  router.get("/questions", async (req, res) => {
    try {
      const questions = await Question.getQuestions();

      if (questions.length < 1) {
        return res.sendStatus(204);
      }

      res.status(200).json(questions);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/questions", async (req, res) => {
    try {
      const q = new Question(id++, req.body.question, req.body.answer);
      q.saveToFile();

      res.status(201).json(q.getData());
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = questionRoutes();
