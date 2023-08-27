import LayersContext from "context/LayerContext";
import LocationAnalysisContext from "context/LocationAnalysisContext";
import { useContext } from "react";
import { GeoJSON, LayersControl } from "react-leaflet";
import L from "leaflet";

function VectorLayer({ name, data }) {
  const {
    setActiveFId,
    activeFId,
    setActiveLayerID,
    activeLayerID,
  } = useContext(LayersContext);

  // console.log("activeLayerId", activeLayerID);
  const { apiData, setApiData } = useContext(
    LocationAnalysisContext
  );

  const handleOnClick = event => {
    const activeLayerId = event.layer.feature.layerID;
    console.log("event", event);

    const uniqueId =
      event.layer.feature.properties.uniqueId;
    if (activeFId.includes(uniqueId)) {
      setActiveFId(activeFId.filter(id => id !== uniqueId));
    } else {
      setActiveFId([...activeFId, uniqueId]);
      setActiveLayerID(activeLayerId);
    }
  };

  const featureStyle = feature => {
    return {
      fillColor: activeFId.includes(
        feature.properties.uniqueId
      )
        ? "yellow"
        : "blue",
    };
  };

  function point(feature, latlng) {
    return L.circleMarker(latlng);
  }

  const resetStyledLayer = e => {
    e.target.resetStyle();
  };

  const intersectionDataStyle = feature => {
    if (apiData.includes(feature.properties.uniqueId)) {
      return {
        fillColor: "red",
        color: "red",
      };
    }
    setApiData();
  };

  return (
    <>
      <LayersControl.Overlay name={name} checked>
        <GeoJSON
          data={data}
          eventHandlers={{
            click: handleOnClick,
            dblclick: resetStyledLayer,
          }}
          pointToLayer={(a, b) => {
            return point(a, b);
          }}
          style={
            apiData ? intersectionDataStyle : featureStyle
          }
        ></GeoJSON>
      </LayersControl.Overlay>
    </>
  );
}

export default VectorLayer;
