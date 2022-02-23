import { useState, useEffect, useRef } from "react";
import Question from "./Question";
import blob1 from "./img/blob1.png";
import blob2 from "./img/blob2.png";
import parse from "html-react-parser";

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
  const [answer, setAnswer] = useState(false);
  const [count, setCount] = useState(0);
  const formRef = useRef(null);
  const clickHandler = () => {
    setIsStart((prev) => !prev);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("letsgo");
    setCount(0);
    let can = true;
    for (let i = 0; i < questions.length; i++) {
      if (formData[`question${i}`] === "") {
        can = false;
        break;
      }
    }
    if (can) {
      for (let i = 0; i < questions.length; i++) {
        const answer = formData[`question${i}`];
        const correctAnswer = parse(apiData[i].correct_answer);
        console.log(answer + "/" + correctAnswer);
        if (answer === correctAnswer) {
          setCount((prev) => prev + 1);
        }
      }
      setAnswer(true);
    } else {
      alert("Reply to all questions");
    }
  };
  useEffect(() => {
    const getApi = async () => {
      if (formRef.current) {
        formRef.current.classList.add("loading");
      }
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      if (response.ok) {
        const result = await response.json();
        setApiData(result.results);
        if (formRef.current) {
          formRef.current.classList.remove("loading");
        }
      }
    };
    getApi();
    setAnswer(false);
  }, [isStart]);
  useEffect(() => {
    setQuestions(
      apiData.map((item) =>
        shuffle([item.correct_answer, ...item.incorrect_answers])
      )
    );
  }, [apiData]);
  return (
    <>
      <img className="blob1" src={blob1} alt="blob1" />
      <img className="blob2" src={blob2} alt="blob2" />
      <main className="main">
        {isStart ? (
          <form className="questions" onSubmit={handleSubmit} ref={formRef}>
            {apiData.map((item, index) => {
              return (
                <Question
                  questions={questions[index]}
                  correctAnswer={parse(item.correct_answer)}
                  key={index}
                  title={item.question}
                  id={index}
                  handleChange={handleChange}
                  checkChecked={checkChecked}
                  submitClicked={answer}
                />
              );
            })}
            {answer ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  You scored {count}/5 correct answers
                </p>
                <button
                  className="box__btn"
                  type="button"
                  onClick={clickHandler}
                >
                  Play Again
                </button>
              </>
            ) : (
              <button className="questions__btn" type="submit">
                Check answers
              </button>
            )}
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
