"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario es administrador
    const isAdminLogged = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdminLogged) {
      // Si no es administrador, redirigir al login
      router.push('/login');
    } else {
      setIsAdmin(true); // Permitir el acceso
    }
  }, [router]);

  if (!isAdmin) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras se verifica la autenticación
  }

  return (
    <div className="container mx-auto my-8 px-4 sm:px-8 lg:px-0">
      <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>
      {/* Aquí va el contenido del panel de administración */}
    </div>
  );
}
