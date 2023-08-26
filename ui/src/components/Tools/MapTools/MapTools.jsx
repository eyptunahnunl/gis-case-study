import React from "react";
import GeoSearch from "./GeoSearch";
import DrawingTool from "./DrawingTool";
import Measurment from "./Measurment";
import LayerTool from "./LayerTool";

function MapTools() {
  return (
    <>
      <GeoSearch />
      <LayerTool />
      <DrawingTool />
      <Measurment />
    </>
  );
}

export default MapTools;
