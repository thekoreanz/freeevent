"use client"; // Asegúrate de que el componente se renderice del lado del cliente

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LivePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      showLoginPrompt();
    }, 2000); // Espera 2 segundos antes de mostrar el prompt

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, []);

  const showLoginPrompt = () => {
    const user = prompt("Por favor, ingresa tu usuario:");
    const pass = prompt("Por favor, ingresa tu contraseña:");

    if (user && pass) {
      login(user, pass);
    } else {
      router.push('/'); // Redirigir al inicio si no se ingresan datos
    }
  };

  const login = async (user: string, pass: string) => {
    const formData = new URLSearchParams();
    formData.append('username', user);
    formData.append('password', pass);

    const response = await fetch('http://localhost:8080/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true); // Actualiza el estado a autenticado
    } else {
      alert(data.message || "Credenciales incorrectas."); // Mensaje de error
      router.push('/'); // Redirigir al inicio si las credenciales son incorrectas
    }
  };

  return (
    <div style={styles.container}>
      {isAuthenticated ? (
        <>
          <h1 style={styles.title}>Bienvenido a LIVESPORTS!</h1>
          <iframe
            src="https://v4-crackstreams.pages.dev/"
            frameBorder="0"
            width="1000"
            height="1000"
            style={styles.iframe}
          />
        </>
      ) : (
        <h1 style={styles.title}>Verificando...</h1>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Ocupa toda la altura de la ventana
    backgroundColor: '#f0f0f0', // Color de fondo claro
    textAlign: 'center', // Centrar texto
  },
  title: {
    marginBottom: '20px', // Espacio debajo del título
    color: '#333', // Color del texto
  },
  iframe: {
    border: 'none', // Sin borde
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra para el iframe
  },
};

export default LivePage;
