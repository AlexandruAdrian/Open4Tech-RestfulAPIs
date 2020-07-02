const fs = require("fs");
const util = require("util");
const { parse } = require("path");

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

  static updateFile() {
    fs.writeFile(
      Question.QUESTIONS_FILE,
      JSON.stringify(Question.questions),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  static async findQuestionPos(id) {
    // Make sure we have the latest version of the file
    await Question.getQuestions();
    const pos = Question.questions.findIndex((q) => q.id === parseInt(id));

    return pos;
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

    Question.updateFile();
    // Refresh the memory with the newly updated file
    Question.getQuestions();
  }

  static async getQuestionById(id) {
    const questionPos = await Question.findQuestionPos(id);

    return Question.questions[questionPos];
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

  static async deleteQuestion(id) {
    const questionPos = await Question.findQuestionPos(id);
    // Remove question from the array
    Question.questions.splice(questionPos, 1);

    Question.updateFile();
    // Refresh the memory with the newly updated file
    Question.getQuestions();
  }
}

module.exports = Question;
