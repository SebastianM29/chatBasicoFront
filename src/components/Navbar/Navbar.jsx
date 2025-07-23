import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../store/userAuthStore';



export const Navbar = () => {
   
   const{userAuth}=userAuthStore()
  
  

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
        <Button sx={{color:'red'}}>Cerrar sesion</Button>

        </Box>
      </Toolbar>
    </AppBar>

   </Box>
   </>
  )
}
