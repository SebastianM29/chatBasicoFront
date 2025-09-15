import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { socket } from '../../util/socket'
import { useEffect, useState } from 'react'



export const DashBoard = () => {
 const [data, setData] = useState(null)

 const formatTime = (s = 0) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
};
 

 useEffect(() => {
   socket.on('startR', (product) => {
    setData(product)
   
    console.log('productucto recibido en dashboard', product);
   })
   
   socket.emit('currentProduct',(respCb) => {
    if (respCb) {
      setData(respCb)
    }
   })

   socket.on('tick',({time}) => {
     setData(prev => (prev ? { ...prev, time } : prev));
   })
    
   //desconetcar desmontar el socket STARr

 }, [])
 


 

  return (
    <>
    {
      data?.product && (
      <>
      <Box
      
       sx={{
        width: '100%',
    
      }}>
      <Card
        sx={{ maxWidth: 550, mx: "auto", mt: 3, p: 2 }}
      >
       <CardMedia
        component={'img'}
        image={`http://localhost:3000${data.product.imagePath}`}
        
        sx={{
          
          objectFit:'cover',
          objectPosition:'center',
          maxHeight:350,
          width:'90%',
           mx: "auto", 
  
        
         
        }}
        />
      <CardContent>
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Remate en vivo de: {data.product.productName} — Precio inicial: ${data.product.price}
        </Typography>

        <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '40px', fontWeight: 'bold' }}>
          Tiempo restante:{' '}
          <Box component="span" sx={{ color: data.time <= 10 ? 'red' : data.time <= 30 ? 'orange' : 'green' , fontWeight: 'bold' }}>
            {formatTime(data.time)}
          </Box>
        </Typography>

      </CardContent>


      </Card>


      </Box>
      </>
      )
    }
    </>
    
  )
}
