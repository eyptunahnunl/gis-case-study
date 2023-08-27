import { TileLayer, VectorLayer } from "components/Map";
import LayersContext from "context/LayerContext";
import { useContext } from "react";
import { LayersControl } from "react-leaflet";

function LayerTool({ children }) {
  const { layersData } = useContext(LayersContext);

  console.log(layersData);
  return (
    <>
      <LayersControl>
        <TileLayer />

        {layersData?.map((item, index) => {
          return (
            <VectorLayer
              key={index}
              name={item.name}
              data={item.data}
              // color={featureColors}
            />
          );
        })}
        {/* <VectorLayer /> */}
      </LayersControl>
    </>
  );
}

export default LayerTool;
