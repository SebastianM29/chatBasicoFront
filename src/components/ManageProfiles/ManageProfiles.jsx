import { Box, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { allUSers } from '../../services/allUsers'


export const ManageProfiles = () => {

  
  
  const{data} = useQuery({
    queryKey:['allUsers'],
    queryFn: allUSers,
    onSuccess:(data) => {
      console.log('la respuesta',data);
      
    },
    onError: (error) => {
      console.error('error al cargar productos',error)
    }
  })


  return (
   <>
   <Grid container sx={{ backgroundColor:'rgba(167, 167, 167, 1)', height: '100vh' }}>
    <Grid size={{xs:12,md:6,}}
    sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}
    >
      <Box
      sx={{
        backgroundColor:'rgba(102, 102, 102, 1)',
        height:'90%',
        width:'80%',
        borderRadius:'10px',
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.47)",
      }}
      >
         <nav style={{ display: 'flex', gap: 8 }}>
      
        <NavLink to="monthlyPurchases">Compras por mes</NavLink>
      </nav>
      
      {
        !data ?(
          <>
           <Typography>No hay usuarios registrados</Typography>
          </>
        ):(

          data.map((data) => (
            <Box key={data.id}>
              <Typography>{data}</Typography>

            </Box>      
          ))

        )


      }

      </Box>
    </Grid>


    <Grid size={{xs:12,md:6}}>
      <Outlet/>
    </Grid>


   </Grid>
   
   </>
  )
}
