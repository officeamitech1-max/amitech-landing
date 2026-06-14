import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import InstagramLanding from './pages/InstagramLanding.tsx'
import LeadsLanding from './pages/LeadsLanding.tsx'

const path = window.location.pathname
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/ig' ? <InstagramLanding /> : path === '/leads' ? <LeadsLanding /> : <App />}
  </StrictMode>,
)
