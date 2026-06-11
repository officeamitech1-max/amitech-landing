import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import InstagramLanding from './pages/InstagramLanding.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname === '/ig' ? <InstagramLanding /> : <App />}
  </StrictMode>,
)
