const fs = require("fs");
const util = require("util");

class Question {
  static questions = [];
  static QUESTIONS_FILE = "../questions.json";
  #id;
  #question;
  #answer;

  constructor(id, question, answer) {
    this.#id = id;
    this.#question = question;
    this.#answer = answer;
  }

  setId(id) {
    this.#id = id;
  }

  setQuestion(question) {
    this.#question = question;
  }

  setAnswer(answer) {
    this.#answer = answer;
  }

  getId() {
    return this.#id;
  }

  getQuestion() {
    return this.#question;
  }

  getAnswer() {
    return this.#answer;
  }

  getData() {
    return {
      id: this.getId(),
      question: this.getQuestion(),
      answer: this.getAnswer(),
    };
  }

  static async generateId() {
    // Make sure we have all the questions in the memory
    await Question.getQuestions();
    // Take the last entry and increment the id
    if (Question.questions.length > 0) {
      const lastId = Question.questions[Question.questions.length - 1].id;
      return lastId + 1;
    }

    return 0;
  }

  saveToFile() {
    // Get data from the file into the memory
    Question.getQuestions();
    // Push data into the memory
    Question.questions.push({
      id: this.getId(),
      question: this.getQuestion(),
      answer: this.getAnswer(),
    });
    // Then save the memory to the file
    fs.writeFile(
      Question.QUESTIONS_FILE,
      JSON.stringify(Question.questions),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    // Refresh the memory with the newly updated file
    Question.getQuestions();
  }

  static async getQuestions() {
    try {
      const checkFile = util.promisify(fs.access);
      await checkFile(Question.QUESTIONS_FILE);
    } catch (err) {
      Question.questions = [];
      return Question.questions;
    }
    const readFile = util.promisify(fs.readFile);

    const data = await readFile(Question.QUESTIONS_FILE, "utf8");
    if (data) {
      Question.questions = JSON.parse(data);
    } else {
      Question.questions = [];
    }

    return Question.questions;
  }
}

module.exports = Question;
