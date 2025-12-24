import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SettingsProvider } from './context/SettingsContext'
import { QuranProvider } from './context/QuranContext'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <QuranProvider>
          <App />
        </QuranProvider>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
