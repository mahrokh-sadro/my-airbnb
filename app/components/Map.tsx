"use client";

import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/images/marker-icon.png",
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

interface MapProps {
  center: [number, number]; // LatLngTuple
}

const RecenterAndFixTiles = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
    setTimeout(() => {
      map.invalidateSize(); // Fix tile loading
    }, 100);
  }, [center, map]);

  return null;
};

const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      className="h-[35vh] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center as L.LatLngExpression}>
        {/* <Popup>Selected location</Popup> */}
      </Marker>
      <RecenterAndFixTiles center={center} />
    </MapContainer>
  );
};

export default Map;
