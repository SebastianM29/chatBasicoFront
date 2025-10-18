import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Icono del marcador
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export const LocationPicker = ({ changeValue }) => {
  const [position, setPosition] = useState([-34.6, -58.38]); // coordenadas iniciales

  // Hook para detectar clicks en el mapa
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng; //objeto que Leaflet entrega en el evento click
      setPosition([lat, lng]);
      changeValue({ lat, lng }, "location"); // aquí actualizas el hook
      console.log('nueva ubicacion seleccionada',position);
      
    },
  });

  return <Marker position={position} icon={markerIcon} draggable
    eventHandlers={{
      dragend: (e) => {
        const marker = e.target;
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]);
        changeValue({ lat, lng }, "location"); // actualiza hook al arrastrar
      },
    }}
  />;
};
