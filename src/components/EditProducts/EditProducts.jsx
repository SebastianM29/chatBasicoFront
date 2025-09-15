import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { updateProducts } from '../../services/updateProducts'

export const EditProducts = ({close,product}) => {

    const queryClient = useQueryClient()
    const[formState,setFormState]=useState({
        productName : product.productName,
        price: product.price,
        description: product.description

    })

    const {mutate}=useMutation({
        mutationFn: updateProducts,
        onSuccess:(data) => {
            console.log('producto actualizado',data.data);
            
            queryClient.invalidateQueries({queryKey:['products']})
            close()
        },
        onError:(updateErr) => {
            console.error('error al actualizar producto',updateErr)
        }
    })


   const handleSubmit = (e) => {
  e.preventDefault()
  console.log('haciendo click en submit');
  mutate({id:product._id,productUpd:formState})

  
   }

   const handleChange = (e) => {
    setFormState({
        ...formState,
        [e.target.name] : e.target.value
    })
   }


  return (
    
      <Modal
      
      open={true}
      onClose={close}
       sx={{
                display: 'flex',         
                alignItems: 'center',    
                justifyContent: 'center' 
            }}
      >
        <Box
        component="form"
        onSubmit={handleSubmit}
      sx={{         
                    display: 'flex',
                    flexFlow: 'column',
                    width:'300px',
                    bgcolor: 'background.paper',
                    boxShadow: 5,
                    p: 4,
                    alignItems:'center',
                    gap:2
                    
                }}
        >
            <Typography>Editar Producto</Typography>
             <TextField
             label="nombre"
             name='productName'
             value={formState.productName}
             onChange={handleChange}
             />
             <TextField
             label="precio"
             name='price'
             value={formState.price}
             onChange={handleChange}
             />
             <TextField
             label="nombre"
             name='description'
             value={formState.description}
             onChange={handleChange}
             />
            <Box>

            <Button type='submit'   >   Editar Producto</Button>
            </Box>


        </Box>

      </Modal>

    
      
  )
}
