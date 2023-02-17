const { Select, prompt } = require('enquirer');
class View {
  constructor() {}

  async greetings() {
    await prompt({
      type: 'input',
      name: 'name',
      message:
        'Привет, маленький любитель поиграть в консоли и сходить в бар пятничным вечером. \n Перед тобой кино-quiz, твоя задача отгадать название фильма, зашифрованного c помощью эмодзи. \n P.S: Возможно, ты найдешь вариант фильма на вечер',
    });
  }

  async userName() {
    const username = await prompt({
      type: 'input',
      name: 'name',
      message: 'Кто будет играть?',
    });
    return username;
  }

  async chooseTopics(topic) {
    const topics = new Select({
      name: 'topic',
      message: 'Choose your level, unknown user:',
      choices: topic,
    });
    const userDecision = await topics.run();
    return userDecision;
  }

  async topicQuestion(question1) {
    const question = await prompt({
      type: 'input',
      name: 'user answer',
      message: question1,
      initial: '',
    });
    return question;
  }
}

module.exports = View;
