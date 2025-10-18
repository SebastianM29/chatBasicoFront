import { Box, Button, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { allUSers } from '../../services/allUsers'
import { userAuthStore } from '../../store/userAuthStore'


export const ManageProfiles = () => {
const [selectYear, setSelectYear] = useState({})
const{giveMeLocation} = userAuthStore()
  
  
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

  const sendMeUser = (user) => {
    console.log('click en el usuario',user);
    giveMeLocation(user);
  }


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
        height:'800px',
        width:'80%',
        borderRadius:'10px',
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.47)",
          overflow:'auto', 
                  "&::-webkit-scrollbar": { width: 8 },
                  "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 8 }
        
      }}
      >
     
      
      {
        !data ?(
          <>
           <Typography>No hay usuarios registrados</Typography>
          </>
        ):(

          data.map((data,key) => {
            const thisYear = selectYear[data._id] ;
            return (
            <Box key={key}
             sx={{display:'flex',
                  backgroundColor:'rgba(173, 173, 173, 1)',
                  minHeight:'80px',
                  padding:'3px',
                  margin:'20px',
                  gap:4,
                  alignItems:'center',
                  justifyContent:'space-between',
                  borderRadius:'10px'

                
                  }}>
               <Box>
              <Typography component={Button} onClick={() => sendMeUser(data)} ><strong>Nombre:</strong> {data.name}</Typography>
              <Typography><strong>Email:</strong> {data.email}</Typography>
                </Box>    
              <Box
              sx={{
                display:'flex',
                alignItems:'center',
                gap:'10px'

              }}
              >
               <select
               value={selectYear[data._id] || '2022'}
               onChange={e => setSelectYear( prevYears => ({
                 ... prevYears,
                  [data._id]: e.target.value 
                }))}
               >
                 <option value='2022'>2022</option>
                 <option value='2023'>2023</option>
                 <option value='2024'>2024</option>
                 <option value='2025'>2025</option>
                 <option value='2026'>2026</option>
               </select>
              <Button 
               component={NavLink}
               to={`monthlyPurchases/${data._id}/${thisYear}`} 
               variant='contained'
               color='warning' 
               sx={{
               fontSize:'10px',
               marginRight:'10px'
               }}
               
               >
               Ver Compras
              </Button>
              <Button variant='contained' color='error' sx={{
                fontSize:'10px',
                marginRight:'10px'
              }} >Eliminar Usuario
              </Button>

              
              </Box>  

            </Box>  )    
      })

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
