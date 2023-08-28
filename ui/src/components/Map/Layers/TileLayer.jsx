import LayersContext from "context/LayerContext";
import { useContext } from "react";
import {
  LayerGroup,
  LayersControl,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";

function TileLayers() {
  const { wmsLayer } = useContext(LayersContext);

  return (
    <>
      <LayerGroup attribution="name">
        <LayersControl.BaseLayer
          checked
          name="Open Street Map (OSM)"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OSM (Black)">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="wms">
          <WMSTileLayer
            layers={"ne:county"}
            url={`${process.env.REACT_APP_BASE_ENDPOINT}/ne/wms`}
            params={{
              format: "image/png",
              transparent: true,
            }}
            // params={layerParams}
          />
        </LayersControl.BaseLayer>

        {wmsLayer?.map((item, index) => {
          return (
            <LayersControl.BaseLayer
              checked
              name={item.name}
              key={index}
            >
              <WMSTileLayer
                params={{
                  transparent: true,
                  layers: item.layer,
                  format: "image/png",

                  // request: "test",
                }}
                url={item.url}
              />
            </LayersControl.BaseLayer>
          );
        })}
      </LayerGroup>
    </>
  );
}

export default TileLayers;
