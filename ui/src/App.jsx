import { LayersProvider } from "context/LayerContext";
import "./App.css";
import { Main } from "view";

function App() {
  return (
    <>
      <LayersProvider>
        <Main />
      </LayersProvider>
    </>
  );
}

export default App;
