const express = require("express");
const Question = require("../models/questions"); // deals with saving into a file
const QuestionModel = require("../models/questionSchema"); // deals with saving into db

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

  router.get("/questions/:id", async (req, res) => {
    try {
      const question = await Question.getQuestionById(req.params.id);
      if (question) {
        return res.status(200).json(question);
      }

      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/questions", async (req, res) => {
    try {
      if (!req.body.question || !req.body.answer) {
        return res.sendStatus(400);
      }

      if (
        req.body.question.trim().length === 0 ||
        req.body.answer.trim().length === 0
      ) {
        return res.sendStatus(400);
      }

      const generatedId = await Question.generateId();
      const q = new Question(generatedId, req.body.question, req.body.answer);
      q.saveToFile();

      res.status(201).json(q.getData());
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.delete("/questions/:id", async (req, res) => {
    try {
      await Question.deleteQuestion(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.put("/questions/:id", async (req, res) => {
    try {
      if (!req.body.question || !req.body.answer) {
        return res.sendStatus(400);
      }

      if (
        req.body.question.trim().length === 0 ||
        req.body.answer.trim().length === 0
      ) {
        return res.sendStatus(400);
      }

      const updatedQuestion = await Question.updateQuestion(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedQuestion);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/questions/save-to-db", async (req, res) => {
    try {
      const memoryQuestions = await Question.getQuestions();

      if (memoryQuestions.length > 0) {
        await QuestionModel.insertMany(memoryQuestions);
        return res.sendStatus(200);
      }

      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = questionRoutes();
