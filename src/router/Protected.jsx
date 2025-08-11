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
                 sx={{
                 height: { md:"100vh", xs:'50vh'},
                 }}
                
                 >
                 <Chat/>
                 </Box>
           </Grid>
           <Grid size={{xs:12,md:7}}>
              <Box
            sx={{
           
            height:  { md:"100vh", xs:'50vh'},
            backgroundColor:'blue',
            border: "1px solid black"
            }}
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
