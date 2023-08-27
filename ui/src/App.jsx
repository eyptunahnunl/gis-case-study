import { LayersProvider } from "context/LayerContext";
import "./App.css";
import { Main } from "view";
import { UIControlProvider } from "context/UIControlContext";
import { LocationAnalysisProvider } from "context/LocationAnalysisContext";

function App() {
  return (
    <>
      <UIControlProvider>
        <LocationAnalysisProvider>
          <LayersProvider>
            <Main />
          </LayersProvider>
        </LocationAnalysisProvider>
      </UIControlProvider>
    </>
  );
}

export default App;
