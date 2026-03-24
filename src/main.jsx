import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { SoundProvider } from './contexts/SoundContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.VITE_BASE || ''}>
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>
              <SoundProvider>
                <App />
              </SoundProvider>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
