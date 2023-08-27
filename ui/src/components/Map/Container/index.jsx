import axios from "axios";
import { LoadTIFF } from "components/Tools";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

function Container({ children }) {
  const mapRef = useRef();

  return (
    <>
      <MapContainer
        center={[39.685306, 34.780926]}
        zoom={6}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-vh z-0"
        ref={mapRef}
      >
        <ZoomControl position="topright" />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </>
  );
}

export default Container;
