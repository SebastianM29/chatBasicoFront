import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getRouter } from './router/router'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
const router = getRouter


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline/>
      <RouterProvider router = {router} />
    
  </StrictMode>,
)
