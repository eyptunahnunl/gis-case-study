import { TileLayer, VectorLayer } from "components/Map";
import { LayersControl } from "react-leaflet";

function LayerTool({ children }) {
  return (
    <>
      <LayersControl>
        <TileLayer />
        <VectorLayer />
      </LayersControl>
    </>
  );
}

export default LayerTool;
