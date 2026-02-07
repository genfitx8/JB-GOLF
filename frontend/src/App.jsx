import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import CustomerApp from './components/customer/CustomerApp'
import ProApp from './components/pro/ProApp'
import StoreApp from './components/store/StoreApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/common/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/customer/*"
              element={
                <ProtectedRoute role="customer">
                  <CustomerApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pro/*"
              element={
                <ProtectedRoute role="pro">
                  <ProApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store/*"
              element={
                <ProtectedRoute role="store">
                  <StoreApp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
