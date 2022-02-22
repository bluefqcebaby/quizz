import { useState, useEffect } from "react";
import Question from "./Question";
import blob1 from "./img/blob1.png";
import blob2 from "./img/blob2.png";

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question0: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });
  const clickHandler = () => {
    setIsStart(true);
  };
  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const checkChecked = (name, str) => formData[name] === str;
  useEffect(() => {
    const getApi = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      const result = await response.json();
      setApiData(result.results);
    };
    getApi();
  }, []);
  useEffect(() => {
    setQuestions(
      apiData.map((item) =>
        shuffle([item.correct_answer, ...item.incorrect_answers])
      )
    );
  }, [apiData]);
  console.log(apiData);
  return (
    <>
      <img className="blob1" src={blob1} alt="blob1" />
      <img className="blob2" src={blob2} alt="blob2" />
      <main className="main">
        {isStart ? (
          <form className="questions">
            {apiData.map((item, index) => {
              return (
                <Question
                  questions={questions[index]}
                  correctAnswer={item.correct_answer}
                  key={index}
                  title={item.question}
                  id={index}
                  handleChange={handleChange}
                  checkChecked={checkChecked}
                />
              );
            })}
            <button className="questions__btn">Check answers</button>
          </form>
        ) : (
          <div className="box">
            <h1 className="box__title">Quizz</h1>
            <button className="box__btn" onClick={clickHandler}>
              Start
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
