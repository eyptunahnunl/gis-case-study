import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { createContext, useEffect, useState } from "react";

const LayersContext = createContext({});

export const LayersProvider = ({ children }) => {
  const [layersData, setLayersData] = useState([]);
  const [activeLayer, setActiveLayer] = useState([]);
  const [activeFId, setActiveFId] = useState([]);
  const [activeLayerID, setActiveLayerID] = useState();
  const [rasterLayer, setRasterLayer] = useState();
  const [layerID, setLayerID] = useState(0);

  const [clearStyle, setClearStyle] = useState();

  const [wmsLayer, setWmsLayer] = useState([]);

  const addLayer = newLayer => {
    setLayersData(prevLayers => [...prevLayers, newLayer]);
  };

  const addWmsLayer = wms => {
    const isLayerExists = wmsLayer.some(
      layer => layer.name === wms.name
    );

    if (!isLayerExists) {
      setWmsLayer(prevLayers => [...prevLayers, wms]);
    }
  };

  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8085/geoserver",
    });

    // Birden fazla endpoint
    const endpoints = [
      {
        name: "pharmacy",

        url: "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Apharmacy_on_duty&maxFeatures=50&outputFormat=application%2Fjson",
        layerId: 0,
      },
      {
        name: "applicant 1",
        url: "/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Aapplicants&maxFeatures=50&outputFormat=application%2Fjson",
        layerId: 1,
      },

      {
        name: "Endpoint 3",
        url: "/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Aminingarea&maxFeatures=50&outputFormat=application%2Fjson",
        layerId: 2,
      },
      {
        name: "county",
        url: "/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Acounty&maxFeatures=50&outputFormat=application%2Fjson",
        layerId: 3,
      },
    ];

    endpoints.forEach(endpoint => {
      instance
        .get(endpoint.url)
        .then(response => {
          console.log(response);
          const test = {
            features: response.data.features,
            fileName: endpoint.name,
            type: response.data.type,
          };

          test.features.forEach((feature, index) => {
            feature.properties["F_ID"] = index + 1;
            feature.properties["uniqueId"] = uuidv4();

            feature.layerID = endpoint.layerId;
          });
          const geoJsonLayer = {
            name: endpoint.name,
            data: test,
            layerID: endpoint.layerId,
          };

          setActiveLayerID(endpoint.layerId);
          setActiveLayer(endpoint.layerId);
          addLayer(geoJsonLayer);
        })
        .catch(error => {
          console.error(`Error from ${endpoint}:`, error);
        });
    });

    // axios
    //   .get(
    //     `${process.env.REACT_APP_BASE_ENDPOINT}/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Aapplicants&maxFeatures=50&outputFormat=application%2Fjson`
    //   )
    //   .then(response => {
    //     console.log(response);
    //     const test = {
    //       features: response.data.features,
    //       fileName: "data1",
    //       type: response.data.type,
    //     };

    //     test.features.forEach((feature, index) => {
    //       feature.properties["F_ID"] = index + 1;
    //       feature.properties["uniqueId"] = uuidv4();

    //       feature.layerID = layerID;
    //     });

    //     const geoJsonLayer = {
    //       name: "nametest",
    //       data: test,
    //       layerID: layerID,
    //     };
    //     setActiveLayerID(test.features[0].layerID);
    //     setActiveLayer(test);
    //     addLayer(geoJsonLayer);
    //   });
  }, []);

  const data = {
    layersData,
    setLayersData,
    addLayer,
    activeLayer,
    setActiveLayer,
    activeFId,
    setActiveFId,
    clearStyle,
    setClearStyle,
    activeLayerID,
    setActiveLayerID,
    rasterLayer,
    setRasterLayer,
    wmsLayer,
    setWmsLayer,
    addWmsLayer,
    layerID,
    setLayerID,
  };

  return (
    <LayersContext.Provider value={data}>
      {children}
    </LayersContext.Provider>
  );
};

export default LayersContext;
