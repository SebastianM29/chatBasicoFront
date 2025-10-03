import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { useState } from "react"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { sendingProducts } from "../../services/apiMutationsProducts"
import { ProductList } from "../productList/ProductList"
import { enqueueSnackbar } from "notistack"

export const DashboardAdmin = () => {
  
  const queryClient = useQueryClient()
  const{name,price,description,img,changeValue,resetForm} = useForm({
    name:'',
    price:'',
    description:'',
    img:''
  })
  

  const disabledSubmit = !name || !price || !description || !img
  // const disabled = Object.values({name,price,description,img}).some((v) => !v)

  const {mutate,isLoading,isError,isSuccess}=useMutation({
    mutationFn: sendingProducts,
    onSuccess: (data) => {
      console.log('producto agregado',data);
      queryClient.invalidateQueries({queryKey:['products']})
      enqueueSnackbar('Argegado exitosamente',{variant:'success'})
    },
    onError: (error) => { 
      console.error('error al enviar producto',error);
      enqueueSnackbar( error?.message || "Error desconocido", { variant: 'error' });
    }
    
  })
  

  
  const handleProductSubmit = (e) => {
   e.preventDefault()
    
   console.log('vemos si anda',img,price,description,name);
   const data = new FormData()
    
   data.append('productName',name)
   data.append('price',price)
   data.append('description',description)
   data.append('imagePath',img)
    console.log('data que se envia',data);
   mutate(data)
   resetForm()
  


  }

  
      
  return (
    <>
   
    <Grid container sx={{ backgroundColor:'rgba(49, 54, 51, 1)', height: '100vh' }} >

      <Grid size={{ xs:12,md:5}}
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor:'rgba(106, 107, 106, 0.6)'
        
      }}
      >

     

       
    <Box
    sx={{
      width:'50%',
      height:'36%',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'rgba(71, 76, 73, 0.77)',
      borderRadius: 6
    }}
    >

    <Box 
    sx={{
      
    display:'flex',
    flexFlow:'column',
    width:'85%',
    marginTop:'35px',
    padding:'2px',
    gap:'9px',
    }}
    component={'form'}
    onSubmit={handleProductSubmit}
    encType="multipart/form-data"
    >
      <TextField
     
      variant='outlined' 
      type='text'
      label='Nombre del Producto'
      name="name"
      value={name}
      onChange={changeValue}
        slotProps={{
       htmlInput: {
         style: { color: "white" }   // estilo al <input> nativo
        },
        inputLabel: {
         style: { color: "rgba(236, 134, 0, 0.93)" }   // estilo al label
       }
  }}
      />
      
      <TextField
      variant='outlined' 
      type='number'
      label='Precio del Producto'
      name="price"
      value={price}
      onChange={changeValue}
        slotProps={{
       htmlInput: {
         style: { color: "white" }   // estilo al <input> nativo
        },
        inputLabel: {
         style: { color: "rgba(236, 134, 0, 0.93)" }   // estilo al label
       }
      }}
      />
      <TextField
      variant='outlined' 
      type='text'
      label='Descripcion'
      name="description"
      value={description}
      onChange={changeValue}
          slotProps={{
       htmlInput: {
         style: { color: "white" }   // estilo al <input> nativo
        },
        inputLabel: {
         style: { color: "rgba(236, 134, 0, 0.93)" }   // estilo al label
       }
      }}
      />
      <Button variant="contained" color="warning" component="label" >
        Subir imagen
        <input
         name="img"
         type="file" 
         onChange={changeValue} 
         hidden/>
      </Button>

      <Button disabled = {disabledSubmit} type="submit" variant="contained" color="warning" > cargar Producto</Button>
    </Box>
    </Box>
        
       




      </Grid>
      <Grid size={{xs:12,md:7}} 
      sx={{
        display:'flex',
        height: '100%',
        flexDirection:'column',
        alignItems:'end',
        pr:'50px',
        
        overflowY: 'auto',      // habilita scroll vertical
           "&::-webkit-scrollbar": { width: 8 },
           "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 8 }
        
     
       
      }}
      >
        <ProductList/>
      </Grid>
    </Grid>

   

    </>
  )
}
