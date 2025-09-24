import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { userAuthStore } from "../store/userAuthStore"
import { Chat } from "../components/Chat/Chat"
import { Box, Button, Container, Grid } from "@mui/material"

export const Protected = () => {

    const{userAuth}=userAuthStore()

  if (!userAuth._id) {
    return <Navigate to={'/'} />
  }


  return (
    <>
    {
        userAuth._id && (
            <>
            
            <Navbar/>
            <Grid container spacing={1}>

           <Grid size={{xs:12,md:5}}>
             <Box
                sx={{ height: "100%", display: "flex",justifyContent:'center',gap:'30px' }}
                
                 >
                 <Chat/>
                 </Box>
           </Grid>
           <Grid size={{xs:12,md:7}}>
              <Box
           sx={{ height: "100%", display: "flex",justifyContent:'center' }}
            >

                <Outlet/>
                
            </Box>  


           </Grid>
          </Grid>

      
                
            </>
        )

      

      }
    </>
  )
}
