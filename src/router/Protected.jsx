import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { userAuthStore } from "../store/userAuthStore"
import { Chat } from "../components/Chat/Chat"
import { Box, Button, Container, Grid } from "@mui/material"

export const Protected = () => {

    const{userAuth}=userAuthStore()


  return (
    <>
    {
        userAuth._id && (
            <>
            
            <Navbar/>
            <Grid container spacing={2}>

           <Grid size={{xs:12,md:4}}>
             <Box
                 sx={{
                 
                 height: { md:"calc(100vh - 64px)", xs:'400px'},
                 backgroundColor:'red',
               
                 border: "1px solid black",
                 
                 }}
                 
                 >
                 <Chat/>
                 </Box>
           </Grid>
           <Grid size={{xs:12,md:8}}>
              <Box
            sx={{
           
            height: "calc(100vh - 64px)",
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
