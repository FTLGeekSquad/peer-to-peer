import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SavedListingsProvider } from './contexts/SavedListingsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SavedListingsProvider>
    <App />
    </SavedListingsProvider>
  </React.StrictMode>,
)
