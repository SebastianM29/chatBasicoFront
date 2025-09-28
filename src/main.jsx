import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getRouter } from './router/router'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from 'notistack'
const router = getRouter
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider >
    <CssBaseline/>
    <QueryClientProvider client = {queryClient}>
      <RouterProvider router = {router} />

    </QueryClientProvider>

    </SnackbarProvider>
    
  </StrictMode>,
)
