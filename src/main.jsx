import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/i18n' // Initialize i18n before app starts
import App from './App.jsx'
import { preloadDemoUsers } from './data/preloadDemoUsers'

preloadDemoUsers();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
