import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../../services/editUser'
import { enqueueSnackbar } from 'notistack'

export const EditPerfil = ({open, user, closed}) => {
    

    const{ name, nickname, email, direccion, ciudad, provincia, pais, changeValue } = useForm({
        name: user?.name || '',
        nickname: user?.nickname || '',
        email: user?.email || '',
        direccion: user?.address || '',
        ciudad: user?.city || '',
        provincia: user?.province || '',
        pais: user?.country || '',
   }) 
    const queryClient = useQueryClient()
      const {mutate} = useMutation({
      mutationFn: updateUser,
      onSuccess:(data) => {
        console.log('devolviendo data actualizada',data.data);
        queryClient.invalidateQueries({queryKey:['allUsers']})
        enqueueSnackbar( data.msg || 'usuario actualizado',{variant:'success'})

      },
      onError:(error) => {
        console.error('error al actualizar usuario',error)
        enqueueSnackbar( error.msg || 'Complete los campos requeridos',{variant:'error'})
      }
    })
    const handleEdit = (e) => {
      e.preventDefault();
      const obj = {
        name,
        nickname,
        email,
        address: direccion,
        city: ciudad,
        province:provincia,
        country:pais
      }
    
      const payload = {
        userId: user._id,
        data:obj
      }
      console.log(payload);
      
      mutate(payload)
     
    }
  return (
    <Dialog
    open={open}
    onClose={closed}
    >

    <form onSubmit={handleEdit}>



      <DialogContent>
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

            
       

          </Box>


      </DialogContent>
      <DialogActions>
        <Button onClick={closed} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button type='submit' variant="contained" color="primary">
          Guardar cambios
        </Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}
