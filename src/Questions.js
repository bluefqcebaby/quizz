import Question from "./Question";

const Questions = ({ data }) => {
  const quizz = data.map((item, index) => {
    const answers = [item.correct_answer, ...item.incorrect_answers];
    return (
      <Question
        key={index}
        correct={item.correct_answer}
        answers={answers}
        question={item.question}
      />
    );
  });
  return (
    <form className="ques__box">
      <Question />
    </form>
  );
};
export default Questions;
