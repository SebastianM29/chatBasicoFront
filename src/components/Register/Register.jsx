import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../services/registerUSer'
import { enqueueSnackbar } from 'notistack'
import { Grid, Card } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LocationPicker } from '../LocationPicker/LocationPicker'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  
  const{name,nickname,email,pass,direccion,ciudad,provincia,pais,imagePath,location,changeValue,resetForm} = useForm({
    name:'',
    nickname:'',
    email: '',
    pass:'',
    imagePath:'',
    direccion:'',
    ciudad:'',
    provincia:'',
    pais:'',
    location:{lat:-34.6,lng:-58.38}
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
    console.log('location',location);

    const geoLocation = {
      type:'Point',
      coordinates:[location.lng, location.lat]
    }
    
    const formData = new FormData()

    formData.append('name',name)
    formData.append('nickname',nickname)
    formData.append('email',email)
    formData.append('pass',pass)
    formData.append('imagePath',imagePath)
    formData.append('direccion',direccion)
    formData.append('ciudad',ciudad)
    formData.append('provincia',provincia)
    formData.append('pais',pais)
    formData.append('location', JSON.stringify(geoLocation));

    mutate(formData)
    resetForm()
    
  }

  return (
    <>
    <Grid container spacing={1} sx={{ width: '100%', justifyContent: 'space-between' }}>
    {/* Form column */}
    <Grid size={{ xs:12,md:6}}>
      <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            width: '100%',
            
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
            <TextField
              type="text"
              label="Direccion"
              name="direccion"
              value={direccion}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="direccion"
            />
            <TextField
              type="text"
              label="Ingrese su Ciudad"
              name="ciudad"
              value={ciudad}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="ciudad"
            />
            <TextField
              type="text"
              label="Ingrese su Provincia"
              name="provincia"
              value={provincia}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="provincia"
            />
            <TextField
              type="text"
              label="Ingrese su Pais"
              name="pais"
              value={pais}
              onChange={changeValue}
              fullWidth
              size="medium"
              autoComplete="pais"
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
         </Grid>

    {/* Map column */}
    <Grid size={{ xs:12,md:6}}>
      <Card sx={{ height: { xs: 300, md: '100%' }, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ height: '100%' }}>
          <Typography variant="h5" sx={{ textAlign: 'center', mt: 1 }}>
            Seleccione su ubicación para envío
          </Typography>
          <MapContainer
            center={[-34.6, -58.38]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker changeValue={changeValue} />
          </MapContainer>
        </Box>
      </Card>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Arrastra el marcador y haz click para fijar tu ubicación.
      </Typography>
    </Grid>
  </Grid>
    </>
  )
}
