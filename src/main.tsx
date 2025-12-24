import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AppPage from "@/pages/App"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import { AuthProvider, useAuth } from "@/auth/AuthContext"

import "./index.css"

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
