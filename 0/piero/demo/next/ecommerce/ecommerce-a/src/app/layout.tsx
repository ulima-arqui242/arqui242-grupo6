"use client";

import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import './globals.css';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdminLogged = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminLogged);
  }, []);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-lightGray">
        {!isAuthPage && (
          <header className="bg-whitePink text-black py-6 shadow-md px-4 sm:px-8 lg:px-0">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-3xl sm:text-4xl font-bold tracking-wide cursor-pointer hover:underline" style={{ letterSpacing: '0.05em' }}>
                AtStudio
              </Link>
              <div className="flex items-center space-x-4">
                <nav className="flex space-x-4 text-lg sm:text-xl">
                  <Link href="/products" className="relative group text-gray-800 hover:text-black transition-all duration-300">
                    Productos
                    <span className="block h-0.5 w-full bg-gray-800 absolute bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                  </Link>
                  <Link href="/contact" className="relative group text-gray-800 hover:text-black transition-all duration-300">
                    Contacto
                    <span className="block h-0.5 w-full bg-gray-800 absolute bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                  </Link>
                  {/* Mostrar enlace Admin solo si es admin */}
                  {isAdmin && (
                    <Link href="/admin" className="relative group text-gray-800 hover:text-black transition-all duration-300">
                      Admin
                      <span className="block h-0.5 w-full bg-gray-800 absolute bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                    </Link>
                  )}
                </nav>
                <Link href="/login" className="text-gray-800 hover:text-black transition-all duration-300">
                  <FaUserCircle size={30} />
                </Link>
                <Link href="/cart" className="text-gray-800 hover:text-black transition-all duration-300">
                  <FaShoppingCart size={30} />
                </Link>
              </div>
            </div>
          </header>
        )}
        <main className={`flex-grow ${isAuthPage ? '' : 'container mx-auto my-8 sm:my-12 lg:my-16 px-4 sm:px-8 lg:px-0'}`}>
          {children}
        </main>
        {!isAuthPage && (
          <footer className="bg-whitePink text-black py-12 mt-auto">
            <div className="container mx-auto text-center">
              <p className="text-xl">© 2024 Ardillas por el mundo</p>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
