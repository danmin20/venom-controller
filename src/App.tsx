import "./App.scss";
import Blob from "./components/Blob";
import Controller from "./components/Controller";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <div className="app">
        <Blob />
        <Controller />
      </div>
    </ChakraProvider>
  );
};

export default App;
