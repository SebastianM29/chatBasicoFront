import { Box } from "@mui/system"
import { userAuthStore } from "../../store/userAuthStore"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { socket } from "../../util/socket";


export const Chat = () => {
  const[connected,setConnected] = useState()
  const {allConnected} = userAuthStore()
  const {msg,changeValue}=useForm({
    nickname:'',
    msg:''
  })


  useEffect(() => {
    console.log('aca deberia entrar? usuarios conectados', allConnected);
    
    setConnected(allConnected)
  }, [allConnected]);

  const handleMsg = (e) => {
  e.preventDefault()
  console.log('haciendo click',msg);
  socket.emit('creatingMsg',msg)
  
  }
  
  
  return (
    <>
    <Grid container >
    <Grid size={{xs:3,md:2}}>
      <Box
      sx={{
        // backgroundColor:'black',
        width:'100%',
        height:'99vh',
        padding:'5px',
        display:'flex',
        flexFlow:'column',
        gap:'5px'
        
        
      }}
      >
          <Typography     sx={{
      fontSize:'11px',
      textAlign: 'center',
      backgroundColor: '#1976d2',  // Azul Material UI
      color: '#fff',
      padding: '8px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      letterSpacing: '1px'
    }} >Usuarios Conectados</Typography>
          
          {
          
          connected && connected.length > 0 ? (
            connected.map((user) => (
              <Typography 
                sx={{
        display: 'inline-block',
        backgroundColor: '#e3f2fd',       // Azul claro
        color: '#1976d2',                  // Azul Material UI
        fontSize: '13px',
        fontWeight: 500,
        padding: '4px 8px',
        borderRadius: '12px',
        margin: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: '#bbdefb',
        }
      }}
               variant="body1" key={user._id}>
                {user.nickname}
              </Typography>
            ))
          ):(
            <Typography>No hay usuarios conectados</Typography>
          )
          
        }

      </Box>
    </Grid>
    <Grid size={{xs:9,md:10}}>
      <Box
        
         sx={{
      //  backgroundColor:'orange',
        width:'100%',
        height:'99vh',
        padding:'20px'
      }}
      >
        <Box
        sx={{
          height:{xs:'30%',md:'85%'},
          backgroundColor:'#d1e0eaff',
          borderRadius:'20px'

        }}
        >
          
        </Box>
        <Box
        component='form'
        onSubmit={handleMsg}
        sx={{
          height:{xs:'20%',md:'15%'},
          // backgroundColor:'coral'

        }}
        >

        <Grid  container sx={{
          display:"flex",
          justifyContent:"space-between",
          
          padding:"5px",
       
          
        }}> 



          <Grid item size={{ xs: 12, md: 9 }}>

           <TextField
           fullWidth
           sx={{
            
            // backgroundColor:'black',
            width:{xs:'100%',md:'95%'},
            marginTop:'25px',
            
          
          
          }}
           type="text"
           label="escriba su mensaje"
           name="msg"
           value={msg}
           onChange={changeValue}
           autoComplete="off"
           />

          </Grid>



          <Grid item size={{ xs: 12, md:3 }} 
          sx={{
            display:"flex",
            backgroundColor:'brown',
           
          
            marginTop:'25px'
          }}
           >


            <Button
            sx={{
              width:'100%'
            }}
            fullWidth
            variant="contained"
            type="submit" >
                  Enviar
            </Button>

          </Grid>
        </Grid>
        </Box>





      </Box>

    </Grid>



    </Grid>
        

    </>
  )
}
