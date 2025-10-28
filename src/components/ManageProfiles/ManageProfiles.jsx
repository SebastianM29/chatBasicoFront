import { Box, Button, Grid, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { allUSers } from '../../services/allUsers'
import { userAuthStore } from '../../store/userAuthStore'
import { EditPerfil } from '../EditPerfil/EditPerfil'
import { deleteUser } from '../../services/deleteUser'
import { enqueueSnackbar } from 'notistack'


export const ManageProfiles = () => {
const [selectYear, setSelectYear] = useState({})
const [editPerfil, setEditPerfil] = useState(null)
const{giveMeLocation} = userAuthStore()

const queryClient =  useQueryClient()
  
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

  const {mutate} = useMutation({
    mutationFn: deleteUser,
    onSuccess:(data) => {
      console.log('usuario eliminado',data);
      queryClient.invalidateQueries({queryKey:['allUsers']})
      enqueueSnackbar('Usuario eliminado con exito',{variant:'success'})
      
    },
    onError:(error) => {
      console.error('error al eliminar usuario',error)
      enqueueSnackbar('Error al eliminar usuario',{variant:'error'})
    }
    
  })


 
  const handleOpenDialog = (user) => {
    // Lógica para abrir el diálogo
    setEditPerfil(user)
  }

  const handleCloseDialog = () => {
    // Lógica para cerrar el diálogo
    setEditPerfil(null)
  }
  const sendMeUser = (user) => {
    console.log('click en el usuario',user);
    giveMeLocation(user);
  }

  const handleDelete = (id) => {
    console.log('borrando',id);
    mutate(id);
  }


  return (
   <>
   <Grid container sx={{ backgroundColor:'linear-gradient(135deg, #f0f2f5, #d9d9d9)', height: '100vh' }}>
    <Grid size={{xs:12,md:6,}}
    sx={{
      display:'flex',
      
      alignItems:'center',
      justifyContent:'center'
    }}
    >
      <Box
      sx={{
        backgroundColor:'rgba(255,255,255,0.9)',
        height:'800px',
        width:'90%',
        borderRadius:'16px',
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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
             sx={{display: 'flex',
                  backgroundColor:'rgba(218, 218, 218, 0)',
                  flexFlow:'column',
                  width:'95%',
                  height:'20%',              
                  padding:'15px',
                  margin:'20px',
                  gap:4,
                  alignItems:'flex-start',
                  justifyContent:'center',
                  borderRadius:'10px'
                }}
                  
                  >
               <Box  > 
              
              <Typography component={Button} onClick={() => sendMeUser(data)} variant="h6" sx={{color:'red',fontWeight:500}} >Nombre: {data.name}</Typography>
              <Typography variant="body2" color="text.secondary">{data.email}</Typography>
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
                 <option value='2024'>2024</option>
                 <option value='2025'>2025</option>
                 <option value='2026'>2026</option>
               </select>
              <Button 
               component={NavLink}
               to={`monthlyPurchases/${data._id}/${thisYear}/${data.name}`} 
               variant='contained'
               color='warning' 


               sx={{
                 fontSize: '12px',
                 textTransform: 'none',
                 borderRadius: '12px',
                }}
               
               >
               Ver Compras
              </Button>
              <Button 
               
               variant='contained'
               color='warning' 
               onClick={() => handleOpenDialog(data)}


               sx={{
                 fontSize: '12px',
                 textTransform: 'none',
                 borderRadius: '12px',
                }}
               
               >
               Editar perfil
              </Button>
                  <Button  
                   variant="contained"
                   color="error"
                    sx={{
                    fontSize: '12px',
                    textTransform: 'none',
                    borderRadius: '12px',
                   }}
                   onClick={() => handleDelete(data._id)}
                   >
                    Eliminar Usuario
                  </Button>

              
              </Box>  

            </Box>  )    
      })

        )


      }

      </Box>
      <EditPerfil
       open= {Boolean(editPerfil)}
       user={editPerfil}
       closed={handleCloseDialog}
       key={editPerfil?._id || 'closed'} />
    </Grid>


    <Grid size={{xs:12,md:6}}>
      <Outlet/>
    </Grid>


   </Grid>
   
   </>
  )
}
