const fs = require("fs");
const util = require("util");

class Review {
  static reviews = [];
  static REVIEWS_FILE = "reviews.json";
  #id;
  #subject;
  #review;

  constructor(id, subject, review) {
    this.#id = id;
    this.#subject = subject;
    this.#review = review;
  }

  setId(id) {
    this.#id = id;
  }

  setSublject(subject) {
    this.#subject = subject;
  }

  setReview(review) {
    this.#review = review;
  }

  getId() {
    return this.#id;
  }

  getSubject() {
    return this.#subject;
  }

  getReview() {
    return this.#review;
  }

  getData() {
    return {
      id: this.getId(),
      subject: this.getSubject(),
      review: this.getReview(),
    };
  }

  static async generateId() {
    // Make sure we have all the reviews in the memory
    await Review.getReviews();
    // Take the last entry and increment the id
    if (Review.reviews.length > 0) {
      const lastId = Review.reviews[Review.reviews.length - 1].id;
      return lastId + 1;
    }

    return 0;
  }

  static updateFile() {
    fs.writeFile(Review.REVIEWS_FILE, JSON.stringify(Review.reviews), (err) => {
      if (err) {
        throw err;
      }
    });
  }

  static async findReviewPos(id) {
    // Make sure we have the latest version of the file into the memory
    await Review.getReviews();
    const pos = Review.reviews.findIndex((rev) => rev.id === parseInt(id));

    return pos;
  }

  saveToFile() {
    // Get data from the file into the memory
    Review.getReviews();
    // Push data into the memory
    Review.reviews.push({
      id: this.getId(),
      subject: this.getSubject(),
      review: this.getReview(),
    });

    Review.updateFile();
    // Refresh the memory with the newly updated file
    Review.getReviews();
  }

  static async getReviewById(id) {
    const reviewPos = await Review.findReviewPos(id);

    return Review.reviews[reviewPos];
  }

  static async getReviews() {
    try {
      const checkFile = util.promisify(fs.access);
      await checkFile(Review.REVIEWS_FILE);
    } catch (err) {
      Review.reviews = [];
      return Review.reviews;
    }
    const readFile = util.promisify(fs.readFile);

    const data = await readFile(Review.REVIEWS_FILE, "utf8");
    if (data) {
      Review.reviews = JSON.parse(data);
    } else {
      Review.reviews = [];
    }

    return Review.reviews;
  }

  static async deleteReview(id) {
    const reviewPos = await Review.findReviewPos(id);
    // Remove review from the array
    Review.reviews.splice(reviewPos, 1);
    Review.updateFile();
    // Refresh the memory with the newly updated file
    Review.getReviews();
  }

  static async updateReview(id, body) {
    const reviewPos = await this.findReviewPos(id);

    Review.reviews[reviewPos].subject = body.subject;
    Review.reviews[reviewPos].review = body.review;
    Review.updateFile();
    return Review.reviews[reviewPos];
  }
}

module.exports = Review;
