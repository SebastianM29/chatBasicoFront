import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getAllProducts } from '../../services/getAllProducts'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { deleProduct } from '../../services/deleteProduct'
import { useState } from 'react'
import { EditProducts } from '../EditProducts/EditProducts'
import { socket } from '../../util/socket'

export const ProductList = () => {
   const queryClient = useQueryClient()
   const [productSelect , setProductSelect] = useState()
   const [modal,setModal] = useState(false)
  

  const {data:prod,isLoading} = useQuery({
    queryKey:['products'],
    queryFn: getAllProducts,
    onSuccess:(data) => {
      console.log(data);
  
    },
    onError: (error) => {
      console.error('error al cargar productos',error)
    }

  })
   


  const{mutate} = useMutation({
    mutationFn: deleProduct,
    onSuccess:() => {
     queryClient.invalidateQueries({queryKey:['products']})
    },
    onError:(deleteErr) => {
     console.error('error al cargar productos',deleteErr)
    }


  })


  const deleteID = (id) => {

    console.log('eliminando',id);
    mutate(id) 
    
    
  }

  const handleEdit = (prod) => {
    setProductSelect(prod)
    setModal(true)

  }
  const start =(product) => {
    console.log('comenzando remate',product);
    socket.emit('start',product)
  }
  if (isLoading) {
    <Typography>Cargando productos...</Typography>
  }
 // 👇 Añade esta validación para el caso de que no haya productos
    if (!Array.isArray(prod) || prod.length === 0) {
        return <Typography>No hay productos para mostrar.</Typography>;
    }

  return (
    <>


    {
     prod.map((product) => (
  
        <Box key={product._id}
        sx={{
         
          marginTop:'25px',
          width:'60%',
         
        }}
        >
    
       <Card
       sx={{
        backgroundColor:'rgba(255, 255, 255, 0.83)',
        borderRadius:'10px'
       }}
       
       >
        <CardMedia
        component={'img'}
        image={`http://localhost:3000${product.imagePath}`}
        
        sx={{
          objectFit:'cover',
          objectPosition:'center',
          maxHeight:350,
          width:'100%'
         
        }}
        />
        <CardContent>
        <Typography> <strong>Nombre:</strong>  {product.productName}</Typography>
        <Typography > <strong>Precio:</strong>  {product.price}</Typography>
        <Typography > <strong>Descripcion:</strong>  {product.description}</Typography>

        </CardContent>
        <CardActions>
         <Button  variant='outlined' onClick={() => handleEdit(product)} color='warning'>Editar</Button>
         <Button onClick={ () => deleteID(product._id)} variant='outlined' color='error'>Eliminar</Button>
         <Button onClick={() => start(product)} variant='outlined' >Comenzar Remate</Button>
        </CardActions>
       </Card>
        


        </Box>











))
}
 { modal && productSelect && (
  <>
    
    <EditProducts
    product={productSelect}
    close= {() => setModal(false)}
    />
  
  </>
   )
  }
    </>
  )
}
