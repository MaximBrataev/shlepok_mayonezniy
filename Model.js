const fs = require('fs/promises');

class Model {
  constructor() {}

  async readTopics() {
    const topics = [];
    const topicsList = await fs.readdir('./topics');
    for (let i = 0; i < topicsList.length; i++) {
      const regex = /^[A-Za-z]*/g;
      topics.push(topicsList[i].toString().match(regex).join(''));
    }
    return topics;
  }

  async readQuestions(topic) {
    const questionsList = await fs.readFile(`./topics/${topic}.txt`, 'utf-8');
    const questions = questionsList.split('\n\n').map((el) => ({
      question: el.split('\n')[0],
      answer: el.split('\n')[1],
    }));
    return questions;
  }
}

module.exports = Model;
