import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import L from "leaflet";
import { Marker, Popup } from 'react-leaflet';
import { userAuthStore } from '../../store/userAuthStore';



// Icono del marcador
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});


export const Location = () => {
  const { userLocation } = userAuthStore();

  if (!userLocation?.location || !userLocation?.location.coordinates ||  userLocation?.location.coordinates < 2) {
    return null; // O algún otro manejo de error
    
  }

  const lng = userLocation.location.coordinates[0];
  const lat = userLocation.location.coordinates[1] || -34.6;

  const leafletLocation = [lat, lng];
  
  

   return (
     <>
       <Marker position={leafletLocation} icon={markerIcon} >

       <Popup>
          <Box>
            <Typography variant="body2">Ubicación del Usuario:</Typography>
            <Typography variant="body2">{userLocation.name}</Typography>
            {/* 1. Dirección */}
                <Typography 
                    variant="body2" 
                    color="text.secondary" // Un color más gris/sutil
                    sx={{ lineHeight: 1.2 }}
                >
                  {userLocation.address}
                </Typography>
          </Box>
       </Popup>

       </Marker>
     </>
   );
}
