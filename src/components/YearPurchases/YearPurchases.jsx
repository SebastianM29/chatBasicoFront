import { Box, Typography } from '@mui/material'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Outlet } from 'react-router-dom'
import { Location } from '../Location/Location'

export const YearPurchases = () => {
  return (
    <>
    <Box 
    sx={{
        height:'100%',
        width:'95%',
    
        display:'flex',
        flexFlow:'column',
       
       
        padding:'20px'
        
    }}
    >
    <Box
     sx={{
        height:'45%',
        width:'95%',
        
    }}>
     
    <Typography>Ubicacion</Typography>
      <MapContainer
        center={[-34.6, -58.38]}
        zoom={7}
        style={{ height: '400px', width: '100%' }}
      > 
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <Location />
      </MapContainer>
    </Box>
    <Box
     sx={{
        height:'45%',
        width:'95%',
        // backgroundColor:'beige'
    }}>
     
    <Outlet/>
    </Box>

    </Box>
    </>
  )
}
