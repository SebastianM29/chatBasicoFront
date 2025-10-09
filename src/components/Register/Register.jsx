import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../services/registerUSer'
import { enqueueSnackbar } from 'notistack'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState(null)
  
  const{name,nickname,email,pass,imagePath,changeValue,resetForm} = useForm({
    name:'',
    nickname:'',
    email: '',
    pass:'',
    imagePath:'',
  })
  const disabledRegister = Object.values({name,nickname,email,pass}).some((v) => !v)

  //TODO .... revisar los msg que vienen en el error
  const{mutate}=useMutation({
    mutationFn:registerUser,
    onSuccess:(data)   => {
      console.log('usuario registrado con exito',data);  
      enqueueSnackbar('Usuario registrado con exito',{variant:'success'})
    },
    onError: (error) => {
      console.log('este es el error',error);
      enqueueSnackbar('Error al Registrar usuario',{variant:'error'})
    }
  })



  const handleRegister = (e) => {
    e.preventDefault()
    // Lógica de registro aquí
    console.log('quiero ver la imagen',imagePath);
    
    const formData = new FormData()

    formData.append('name',name)
    formData.append('nickname',nickname)
    formData.append('email',email)
    formData.append('pass',pass)
    formData.append('imagePath',imagePath)
    mutate(formData)
    resetForm()
    
  }

  return (
    <>
      <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            width: '60%',
            
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 8,
            p: { xs: 3, sm: 4 },
            backdropFilter: 'blur(6px)'
          }}
        >
          {/* Encabezado */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
              Registrarse
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
             Complete los campos
            </Typography>
          </Box>

          {/* Campos */}
          <Box sx={{ display: 'grid', gap: 2.5, mt: 2 }}>
            <TextField
              type="text"
              label="Ingrese su nombre"
              name="name"
              value={name}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="email"
            />
            <TextField
              type="text"
              label="Ingrese su nickname"
              name="nickname"
              value={nickname}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="email"
            />
            <TextField
              type="email"
              label="Ingrese su Email"
              name="email"
              value={email}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="email"
            />

            
            <Button variant='outlined' component="label">
              Subir Imagen
              <input
               type='file'
               name='imagePath'
               accept='image/*'
               onChange={changeValue} hidden />

            </Button>

            <TextField
              label="Ingrese password"
              name="pass"
              value={pass}
              onChange={changeValue}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              size="medium"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />


            <Button
              type="submit"
              variant="contained"
              disabled={disabledRegister}
              // startIcon={<LoginIcon />}
              sx={{
                mt: 0.5,
                py: 1.2,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 2
              }}
              fullWidth
            >
              Registrarse
            </Button>
          </Box>

          {/* Pie con nota pequeña */}
          <Typography
            component={Link}
            to={'/login'}
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
           Inicie sesion
          </Typography>
        
        
        </Box>
      
    </>
  )
}
