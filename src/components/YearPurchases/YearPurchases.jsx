import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const YearPurchases = () => {
  return (
    <>
    <Box 
    sx={{
        height:'90%',
        width:'95%',
        backgroundColor:'white'
    }}
    >
    <Box
     sx={{
        height:'40%',
        width:'95%',
        backgroundColor:'beige'
    }}>
     
    </Box>
    <Outlet/>

    </Box>
    </>
  )
}
