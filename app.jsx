import useCatFact from "./hooks/useCatFact";
import useCatImage from "./hooks/useCatImage";

const App = () => {
  const { fact, generateFact } = useCatFact();

  const handleClick = () => {
    generateFact();
  };

  const catImg = useCatImage({ fact });

  return (
    <div className="gridContainer">
      {fact && <h1>{fact}</h1>}
      {catImg && <img src={catImg} />}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default App;
