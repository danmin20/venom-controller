import "./App.scss";
import Blob from "./components/Blob";
import Controller from "./components/Controller";

const App = () => {
  return (
    <div className="app">
      <Blob />
      <Controller />
    </div>
  );
};

export default App;
