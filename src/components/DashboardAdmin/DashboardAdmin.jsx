import { Box, Button, TextField } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"


export const DashboardAdmin = () => {
  const [image,setImage]=useState('')
  const{name,price,description,img,changeValue} = useForm({
    name:'',
    price:'',
    description:'',
    img:''
  })
  
  const sendingProducts = async ( data) => {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: data
    })
    if (!response.ok) {
      const errorData = await response.json();
      
      throw new Error(errorData.message || 'Error en la solicitud');
    }
    
    return response.json() 
  }
  const {mutate,isLoading,isError,isSuccess}=useMutation({
    mutationFn: sendingProducts,
    onSuccess: () => {
      console.log('producto agregado');
      
    },
    onError: (error) => { 
      console.error('error al enviar producto',error);
      
    }
    
  })
  
  const handleImage = (e) => {
    console.log('viendo la direccion',e.target.files[0]);
    setImage(e.target.files[0])
  }
  
  
  const handleProductSubmit = (e) => {
    e.preventDefault()
    
    console.log('vemos si anda',img,price,description,name);
   const data = new FormData()
    
   data.append('name',name)
   data.append('price',price)
   data.append('description',description)
   data.append('img',image)

   mutate(data)
  


  }
      
  return (
    <>
    <Box 
    sx={{
      display:'flex',
      flexFlow:'column'
    }}
    component={'form'}
    onSubmit={handleProductSubmit}
    encType="multipart/form-data"
    >
      <TextField
      type='text'
      label='Nombre del Producto'
      name="name"
      value={name}
      onChange={changeValue}
      />
      
      <TextField
      type='number'
      label='Precio del Producto'
      name="price"
      value={price}
      onChange={changeValue}
      />
      <TextField
      type='text'
      label='Descripcion'
      name="description"
      value={description}
      onChange={changeValue}
      />
      <Button variant="contained" component="label" >
        Subir imagen
        <input type="file" onChange={handleImage} hidden/>
      </Button>

      <Button type="submit"> cargar Producto</Button>
    </Box>
    </>
  )
}
