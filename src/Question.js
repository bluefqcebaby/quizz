import parse from "html-react-parser";

const Question = ({ questions, title, id, handleChange, checkChecked }) => {
  const style = {
    borderBottom: id === 4 ? "none" : "1px solid #d6dbf5",
  };
  return (
    <div className="question">
      <h2 className="question__title">{parse(title)}</h2>
      <ul className="question__answers" style={style}>
        {questions.map((item, index) => {
          const ques = parse(item);
          const name = `question${id}`;
          return (
            <li className="question__answer" key={`list${index}`}>
              <label>
                <input
                  className="question__input"
                  type="radio"
                  name={name}
                  value={ques}
                  onChange={handleChange}
                  checked={checkChecked(name, ques)}
                />
                <p className="question__text">{ques}</p>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Question;
