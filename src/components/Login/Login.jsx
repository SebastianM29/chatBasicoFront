import { Alert, Box, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material'
import { useForm } from '../../hooks/useForm'
import { socket } from '../../util/socket'
import { useEffect, useState } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../services/loginUser'

export const Login = () => {
  const { email, password, changeValue } = useForm({
    email: '',
    password: ''
  })

  // const [msgAlert, setMsgAlert] = useState(null)
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 

  const { checkingAuth, allUsersConnected, getActualUserNickName } = userAuthStore()
  const navigate = useNavigate()

  const{mutate} = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
       
        
        checkingAuth(user)
        socket.emit('sendUser', user )
        navigate('/userAuth/dashboard')
    },
    onError: (data) => {
        enqueueSnackbar(data,{variant:'error'})
        setOpen(true)
    }

  })



  useEffect(() => {


    const onAllUsers = (users) => {
      allUsersConnected(users)
    }

    const onUserConnected = (user) => {
      console.log('user conectado', user);
      
      getActualUserNickName(user)
    }

    
    socket.on('allUsers', onAllUsers)
    socket.on('userConnected', onUserConnected)

    return () => {
      // socket.off('allUsers', onAllUsers)
      // socket.off('userConnected', onUserConnected)
    }
  }, [checkingAuth, allUsersConnected, getActualUserNickName, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    mutate({email,password})
    
  }

  const disabledSubmit = !email || !password

  return (
    <>
   
        {/* Tarjeta de login */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: '50%',

            
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
              Iniciar sesión
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Accedé para continuar al panel de remates
            </Typography>
          </Box>

          {/* Campos */}
          <Box sx={{ display: 'grid', gap: 2.5, mt: 2 }}>
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
              label="Ingrese password"
              name="password"
              value={password}
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
              disabled={disabledSubmit}
              startIcon={<LoginIcon />}
              sx={{
                mt: 0.5,
                py: 1.2,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 2
              }}
              fullWidth
            >
              Ingresar
            </Button>
          </Box>

          {/* Pie con nota pequeña */}
          <Typography
            component={Link}
            to={'/register'}
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            Registrarse
          </Typography>
        
          <Typography
            
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            ¿Olvidaste tu contraseña? Contactá al administrador.
          </Typography>
        </Box>
      

  
      {/* <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false)
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setOpen(false)
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          {msgAlert}
        </Alert>
      </Snackbar> */}
    </>
  )
}