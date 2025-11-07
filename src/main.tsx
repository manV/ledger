import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LedgerApp } from './LedgerApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LedgerApp />
  </StrictMode>,
)
