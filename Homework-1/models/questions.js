const fs = require("fs");

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
}

module.exports = Question;
