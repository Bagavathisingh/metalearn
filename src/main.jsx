import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './components/Notification.jsx'
import { ModalProvider } from './components/ConfirmModal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </NotificationProvider>
  </StrictMode>,
)

