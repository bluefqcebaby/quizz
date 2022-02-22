import { useState, useEffect, useRef } from "react";
import Questions from "./Questions";
const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [apiQuestions, setApiQuestions] = useState({});
  const clickHandler = () => {
    setIsStart(true);
  };
  useEffect(() => {
    const getApi = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      const result = await response.json();
      setApiQuestions(result.results);
    };
    getApi();
  }, []);
  console.log(apiQuestions);
  return (
    <main className="main">
      {isStart ? (
        <Questions data={apiQuestions} />
      ) : (
        <div className="box">
          <h1 className="box__title">Quizz</h1>
          <button className="box__btn" onClick={clickHandler}>
            Start
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
