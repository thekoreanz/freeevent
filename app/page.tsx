'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, ChevronRight, User, Lock, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'



const events = [
  { id: 1, title: "UFC 308", image: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2024/10/UFC-308-How-to-Watch-Thumb.jpg?w=1000&h=600&crop=1", date: "10 Jun 2024" },
  { id: 2, title: "Barça vs Madrid", image: "https://media.rpctv.com/p/dce0415e608a9f53df2851832d95fcef/adjuntos/314/imagenes/018/733/0018733401/855x0/smart/whatsapp-image-2024-09-24-at-112853-am-1jpeg.jpeg", date: "15 Jul 2024" },
  { id: 3, title: "Topuria vs Holloway", image: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2024/10/UFC-308-How-to-Watch-Thumb.jpg?w=1000&h=600&crop=1" },
  { id: 4, title: "LaLiga Hypermotion", image: "https://image.discovery.indazn.com/eu/v3/eu/none/1f3zmlzr4pamc1jnkm6bjh64of_image-header_pEs_1704473541000/fill/center/top/none/85/448/258/webp/image", date: "5 Sep 2024" },
  { id: 5, title: "UEFA CHAMPIONS LEAGUE", image: "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/styles/imagen_noticia/public/field/image/formato-uefa-champions-league-2024.JPG?itok=xiE6q7dG", date: "18 Oct 2024" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('http://79.152.199.63/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();
    if (result.success) {
        router.push('/live'); // Redirigir al usuario a la página 'live' en caso de login exitoso
    } else {
        // Manejar error de login
        console.error(result.message);
    }
};

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://79.152.199.63/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&email=${email}&password=${password}`,
    });
    const data = await response.json();
    if (data.success) {
      setShowRegister(false);
      setShowLogin(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white bg-black overflow-hidden">
      {/* Fondo con textura */}
      <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10"></div>

      {/* Efecto de líneas diagonales */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05))] bg-[length:10px_10px]"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center text-red-600 uppercase tracking-tighter">
          EVENTOS FOR FREE
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center text-gray-300 max-w-3xl mx-auto font-medium">
          Disfruta de los mejores eventos deportivos en directo desde cualquier lugar. 
          Fútbol, MMA, Boxeo y mucho más, todo en una sola plataforma y GRATIS!!!
        </p>

        {/* Slider de eventos */}
        <div className="relative mb-12 h-[400px] overflow-hidden rounded-lg shadow-2xl">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold mb-2 text-red-500">{event.title}</h3>
                <p className="text-gray-300">{event.date}</p>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600/10 backdrop-blur-sm hover:bg-red-600/20 border-red-600"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length)}
          >
            <ChevronRight className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        {/* Botones de acceso */}
        <div className="text-center space-x-4">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-none uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => setShowLogin(true)}>
            <User className="mr-2 h-5 w-5" /> Iniciar Sesión
          </Button>
          <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-none uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => setShowRegister(true)}>
            <Mail className="mr-2 h-5 w-5" /> Registrarse
          </Button>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-none uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => setShowSteps(true)}>
            <Play className="mr-2 h-5 w-5" /> Acceder Gratis
          </Button>
        </div>

        {/* Pasos para acceder gratis */}
        {showSteps && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Pasos para Acceder Gratis</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Regístrate con un correo electrónico válido</li>
                <li>Inicia sesión en tu cuenta</li>
                <li>Confirma tu usuario</li>
                <li>Selecciona el evento que deseas ver</li>
                <li>¡Disfruta de tu stream gratuito !</li>
              </ol>
              <p className="mt-4 text-sm text-gray-400">Nota: No olvides tus credenciales y porfavor introduzca un email valido.</p>
              <Button onClick={() => setShowSteps(false)} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                Cerrar
              </Button>
            </div>
          </div>
        )}

        {/* Modal de Login */}
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Iniciar Sesión</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                  Iniciar Sesión
                </Button>
              </form>
              <Button onClick={() => setShowLogin(false)} className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
                Cerrar
              </Button>
            </div>
          </div>
        )}

        {/* Modal de Registro */}
        {showRegister && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Registrarse</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label htmlFor="reg-username" className="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
                  <input
                    type="text"
                    id="reg-username"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="reg-password"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                  Registrarse
                </Button>
              </form>
              <Button onClick={() => setShowRegister(false)} className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}