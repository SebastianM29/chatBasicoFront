import { Alert, AppBar, Box, Button, Snackbar, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../store/userAuthStore';
import { useEffect, useState } from 'react';



export const Navbar = () => {
   
   const{userAuth,actualUserNickname,socket}=userAuthStore()
   const [alert,setAlert] = useState(false)

   const handleClose = () => {
    console.log('socket.id',socket.id);
    
    socket.emit('logout',socket.id)
   }

  
   useEffect(() => {
    setAlert(true)
    console.log('actualUserNickname', actualUserNickname);
    }, [socket])      
  
  

  return (
   <>
   <Box sx={{
    flexGrow:1
   }}>
    <AppBar 
    position='static'
    >
      <Toolbar>
        <Box sx={{flexGrow:1}}>
          <MenuIcon/>

        </Box>
        <Box>
        {
          userAuth.role === 'admin' && (
            <Button component={Link} to={'/admin/dashboardAdmin'} sx={{color:'red'}}>Admin</Button>
          )
          
        }
        <Button component={Link} to={'/userAuth/perfil'} sx={{color:'red'}}>Perfil</Button>
        <Button component={Link} to={'/userAuth/calendario'} sx={{color:'red'}}>Calendario</Button>
        <Button sx={{color:'red'}} onClick={handleClose}>Cerrar sesion</Button>

        </Box>
      </Toolbar>
    </AppBar>

    
    <Snackbar
      open={alert}
      autoHideDuration={4000}
      onClose={() => setAlert(false)}
    >
      <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: '100%' }}>
        Usuario Conectado {actualUserNickname}
      </Alert>

    </Snackbar>

   </Box>
   </>
  )
}
