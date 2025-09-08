import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { useState } from "react"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { sendingProducts } from "../../services/apiMutationsProducts"
import { ProductList } from "../productList/ProductList"

export const DashboardAdmin = () => {
  const [image,setImage]=useState('')
  const queryClient = useQueryClient()
  const{name,price,description,img,changeValue} = useForm({
    name:'',
    price:'',
    description:'',
    img:''
  })
  

  const {mutate,isLoading,isError,isSuccess}=useMutation({
    mutationFn: sendingProducts,
    onSuccess: (data) => {
      console.log('producto agregado',data);
      queryClient.invalidateQueries({queryKey:['products']})
      
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
    
   data.append('productName',name)
   data.append('price',price)
   data.append('description',description)
   data.append('imagePath',image)
    console.log('data que se envia',data);
   mutate(data)
  


  }
      
  return (
    <>
   
    <Grid container sx={{ minHeight: '100vh' }}>

      <Grid size={{ xs:12,md:5}}
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      >

        <Grid container
        sx={{
         width:'100%',
          height:'100vh',
        }}
        >

          <Grid sx={{
            height:'50%'
          }
          } size={{ xs:12,md:12}}>
    <Box
    sx={{
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'yellow'
    }}
    >

    <Box 
    sx={{
      
    display:'flex',
    flexFlow:'column',
    width:'70%',
    marginTop:'35px',
    height:'350px',
    padding:'50px',
    gap:'3px'
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
      />
      
      <TextField
      variant='outlined' 
      type='number'
      label='Precio del Producto'
      name="price"
      value={price}
      onChange={changeValue}
      />
      <TextField
      variant='outlined' 
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

      <Button  type="submit" variant="contained" color="primary"> cargar Producto</Button>
    </Box>
    </Box>
            
          </Grid>
          <Grid size={{ xs:12,md:5}}>

          </Grid>




        </Grid>

      </Grid>
      <Grid size={{xs:12,md:7}} 
      sx={{
        display:'flex',
        height: '50vh',
        flexDirection:'column',
        alignItems:'end',
        padding:'20px'
        
     
       
      }}
      >
        <ProductList/>
      </Grid>
    </Grid>

   

    </>
  )
}
