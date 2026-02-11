import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <ToastContainer position='top-center'/>
    <ChatProvider>
        <AppRoutes />
    </ChatProvider>
    
    </BrowserRouter>
    
  
)
