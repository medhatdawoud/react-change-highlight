import React from "react";
import HighlightChange from "react-change-highlight";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef();
  return (
    <div className="App">
      <button onClick={() => setCount(c => c + 1)}>counter</button>
      <HighlightChange>
        <h2 ref={countRef}>{count}</h2>
      </HighlightChange>
    </div>
  );
}

export default App;
