import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks/useForm'
import { socket } from '../../util/socket'
import { useEffect, useState } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { useNavigate } from 'react-router-dom'


export const Login = () => {
  const{email,password,changeValue}=useForm({
    email:'',
    password:''
  })

  const[msgAlert,setMsgAlert]=useState(null)
  const{checkingAuth}=userAuthStore()
  const navigate = useNavigate()


   
  useEffect(() => {
   socket.on('validateUser',(data) => {
    console.log('respuesta del servidor',data);
    if (data?._id) {
      console.log('existe una session',data._id);
      
    
      checkingAuth(data)
      navigate('userAuth/dashboard')
    }else{
      setMsgAlert(data)
    }

   })
    return () => {
      socket.off('validateUser')
    }
  },[])


  
  
  

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('haciendo click en login',email,password);
    socket.emit('sendUser',{email,password})


    
  }

  return (
    <>
    <Typography>Desde login</Typography>
    <Box
    component={'form'}
    sx={{
        display:'flex',
        flexFlow:'column',
        width:"250px",
        height:"350px",
        padding:"25px",
        backgroundColor:'red',
        gap:'50px'
    }}
    
    onSubmit={handleLogin}

    >
        <TextField
        type='email'
        label='Ingrese su Email'
        name='email'
        value={email}
        onChange={changeValue}
        />
        <TextField
        type='password'
        label='Ingrese password'
        name='password'
        value={password}
        onChange={changeValue}
        />

        <Button type='submit' variant='contained'>Ingresar</Button>

    </Box>
    </>
  )
}
