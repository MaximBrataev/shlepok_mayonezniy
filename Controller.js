class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.score = 0;
  }

  async run() {
    this.model.readTopics();
    const rightAnswers = [
      'Еще один шаг - и ты Чак Норис',
      'Поздравляю, ты - Чак Норис',
      'Ты участвовал в битве экстрасенсов?',
      'Антон Долин, остановись!',
      'Признайся, ты стоял у нас за спиной при написании этого квиза',
    ];
    const wrongAnswers = [
      'У тебя еще есть шанс',
      'Папа тобой не доволен',
      'Поздравляю, ты больше не сын папы',
      'Ты уже понял, что кино - это не твое?',
      'Это 29 из 30',
    ];
    const greetings = await this.view.greetings();
    const whoYou = await this.view.userName();
    this.topics = await this.model.readTopics();
    const elTopic = await this.view.chooseTopics(this.topics);
    const quesObj = await this.model.readQuestions(elTopic);
    let indexTrue = -1;
    let indexFalse = -1;
    for (let i = 0; i < quesObj.length; i += 1) {
      const answers = await this.view.topicQuestion(quesObj[i].question);
      if (
        Object.values(answers).toString().toLowerCase() ==
        quesObj[i].answer.toString().toLowerCase()
      ) {
        indexTrue += 1;
        console.log(`\n${rightAnswers[indexTrue]}\n`);

        // console.log(rightAnswers[Math.floor(Math.random() * 5)]);
        this.score += 1;
      } else {
        // console.log(wrongAnswers[Math.floor(Math.random() * 5)]);

        indexFalse += 1;
        console.log(
          `\n${wrongAnswers[indexFalse]}. Правильный ответ: ${quesObj[i].answer
            .toString()
            .toLowerCase()}\n`
        );
      }
      if (i === quesObj.length - 1) {
        // console.log(`Твой счёт ${this.score} из ${quesObj.length}`);
        console.log(
          `Unknown user, твой результат ${Math.floor(
            (this.score / quesObj.length) * 100
          )} `
        );
      }
    }
  }
}

module.exports = Controller;
