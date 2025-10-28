import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { MonthlyPurchasesUser } from '../../services/monthSalesUser'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const MonthlyPurchases = () => {
  const{userId} = useParams()
  const{year} = useParams()
  const{name} = useParams()
  //TODO peticion y utilizacion de chart
  
  
  
  const {data} = useQuery({
    queryKey:['monthlyPurchases',userId,year],
    queryFn: () =>  MonthlyPurchasesUser(userId,year),
    enabled: Boolean(userId && year), // 👈 no corre hasta que haya id y year
    onSuccess:(respData) => {
      console.log('deberia entrar si es exitoso',respData);
      
      // console.log(data.labels);
      
    },
    onError: (error) => {
      console.error('error al cargar productos',error)
    }
    
  })
  
  const options = {
    responsive : true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      
      title: {
        display: true,
        text:  `Ventas Mensuales del Usuario ${name} en ${year}`,
      },
    }
  } 
    const EMERALD_GREEN_BG = 'rgba(243, 146, 0, 0.93)'; // Fondo opaco
const EMERALD_GREEN_BORDER = 'rgba(255, 102, 0, 1)'; // Borde sólido

     const chartData = {
        labels: data?.labels || [],
        datasets:data?.datasets.map(dataset => ({
        ...dataset, // Mantiene label, data, etc.
        
        // 🚨 PROPIEDADES DE COLOR AÑADIDAS 🚨
        backgroundColor: EMERALD_GREEN_BG,
        borderColor: EMERALD_GREEN_BORDER,
        borderWidth: 1,
    })) || [],
    }; 

  return (
    
    <Box sx={{
      // backgroundColor:'rgba(214, 209, 203, 1)',
      height:'100%',

      }}>
    
   <Bar  options={options} data={chartData} />
    </Box>
  )
}
