import { LayersProvider } from "context/LayerContext";
import "./App.css";
import { Main } from "view";
import { UIControlProvider } from "context/UIControlContext";

function App() {
  return (
    <>
      <UIControlProvider>
        <LayersProvider>
          <Main />
        </LayersProvider>
      </UIControlProvider>
    </>
  );
}

export default App;
