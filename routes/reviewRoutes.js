const express = require("express");
const Review = require("../models/reviews");

function reviewRoutes() {
  const router = express.Router();

  router.get("/reviews", async (req, res) => {
    try {
      const reviews = await Review.getReviews();

      if (reviews.length < 1) {
        return res.sendStatus(204);
      }

      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.get("/reviews/:id", async (req, res) => {
    try {
      const review = await Review.getReviewById(req.params.id);
      if (review) {
        return res.status(200).json(review);
      }

      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/reviews", async (req, res) => {
    try {
      if (!req.body.subject || !req.body.review) {
        return res.sendStatus(400);
      }

      if (
        req.body.subject.trim().length === 0 ||
        req.body.review.trim().length === 0
      ) {
        return res.sendStatus(400);
      }

      const generatedId = await Review.generateId();
      const review = new Review(generatedId, req.body.subject, req.body.review);
      review.saveToFile();

      res.status(201).json(review.getData());
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.delete("/reviews/:id", async (req, res) => {
    try {
      await Review.deleteReview(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.put("/reviews/:id", async (req, res) => {
    try {
      if (!req.body.subject || !req.body.review) {
        return res.sendStatus(400);
      }

      if (
        req.body.subject.trim().length === 0 ||
        req.body.review.trim().length === 0
      ) {
        return res.sendStatus(400);
      }

      const updatedReview = await Review.updateReview(req.params.id, req.body);

      res.status(200).json(updatedReview);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = reviewRoutes();
