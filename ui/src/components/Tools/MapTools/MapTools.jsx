import React from "react";
import GeoSearch from "./GeoSearch";
import DrawingTool from "./DrawingTool";
import Measurment from "./Measurment";
import LayerTool from "./LayerTool";

import GeotiffLayer from "./GeotiffLayer";

function MapTools() {
  return (
    <>
      <GeoSearch />
      <LayerTool />
      <DrawingTool />
      <Measurment />
      <GeotiffLayer />
    </>
  );
}

export default MapTools;
