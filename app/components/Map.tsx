"use client";

import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/images/marker-icon-2x.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
});

interface MapProps {
  center: [number, number];
}

const RecenterAndFixTiles = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
    setTimeout(() => {
      map.invalidateSize();
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
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center as L.LatLngExpression}></Marker>
      <RecenterAndFixTiles center={center} />
    </MapContainer>
  );
};

export default Map;
