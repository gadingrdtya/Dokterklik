import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import UserContextProvider from './context/UserContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import ChatContextProvider from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserContextProvider>
        <DoctorContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </DoctorContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)
