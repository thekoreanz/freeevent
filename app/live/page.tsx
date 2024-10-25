'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LivePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Realizar la autenticación después de un breve tiempo de carga
    const timer = setTimeout(() => {
      const user = prompt("Por favor, ingresa tu usuario:")
      const pass = prompt("Por favor, ingresa tu contraseña:")
      if (user && pass) {
        login(user, pass)
      } else {
        router.push('/')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const login = async (user: string, pass: string) => {
    setIsLoading(true)
    try {
      const formData = new URLSearchParams()
      formData.append('action', 'login')
      formData.append('username', user)
      formData.append('password', pass)

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })

      const data = await response.json()
      if (data.success) {
        setIsAuthenticated(true)
      } else {
        alert(data.message || "Credenciales incorrectas.")
        router.push('/')
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error)
      alert("Error al iniciar sesión. Por favor, intente de nuevo.")
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-700">Verificando...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <>
          <h1 className="mb-6 text-3xl font-bold text-gray-800">Bienvenido a LIVESPORTS!</h1>
          <iframe
            src="https://v4-crackstreams.pages.dev/"
            className="w-full max-w-4xl h-[80vh] border-none shadow-lg rounded-lg"
            title="LIVESPORTS Stream"
          />
        </>
      ) : (
        <div className="text-2xl font-bold text-red-600">Acceso denegado. Por favor, inicie sesión.</div>
      )}
    </div>
  )
}
