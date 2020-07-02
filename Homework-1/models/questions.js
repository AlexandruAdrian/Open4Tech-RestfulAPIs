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

  saveToFile() {
    Question.questions.push({
      id: this.getId(),
      question: this.getQuestion(),
      answer: this.getAnswer(),
    });

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
    Question.questions = JSON.parse(data);

    return Question.questions;
  }
}

module.exports = Question;
