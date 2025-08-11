import { useEffect } from "react";
import { socket } from "../../util/socket"
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";



export const AppContainer = () => {

  const {allUsersConnected,allConnected} = userAuthStore()

useEffect(() => {
    console.log('fuera del socket');
    
    socket.on("connect", () => {
      console.log("conectado al servidor",socket.id);
      
    })

    socket.on("actualUser", (user) => {
      console.log("deberia ver el id",user);
      
    })
  
  
  }, [])


  return (
    <>
    <Box
    sx={
      {
        display:'flex',
        flexFlow:'column',
        width:"100%",
        height:'100vh',
        backgroundColor:'blue',
        alignItems:'center',
        gap:'100px'
        

      }
    }
    >
    <Typography variant="h4" component={'h1'} sx={{marginTop:'200px'}} >Bienvenido al chat</Typography>
    <Box>
    <Outlet/>

    </Box>


    </Box>


    </>
  )
}


