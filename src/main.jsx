import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SortProvider } from './context/SortContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SortProvider>
      <App />
    </SortProvider>
  </StrictMode>,
)
