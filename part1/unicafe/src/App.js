import { useState } from "react";

const Statistics = ({ good, neutral, bad, allClicks, total }) => {
  if (allClicks === 0) {
    return "No feedback given";
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={allClicks} />
          <Statistic text="average" value={total / allClicks} />
          <Statistic text="positive" value={(good / allClicks) * 100 + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setAllClicks(allClicks + 1);
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutral = () => {
    setAllClicks(allClicks + 1);
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAllClicks(allClicks + 1);
    setBad(bad + 1);
    setTotal(total - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics
        total={total}
        allClicks={allClicks}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
