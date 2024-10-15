"use client";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-lightGray mt-24"> {/* Aumenté mt-24 para bajar más */}
      {/* Título "Sobre Nosotros" */}
      <h1 className="text-4xl font-bold text-black mb-6">Sobre Nosotros</h1>
      
      {/* Texto de "Sobre Nosotros" */}
      <p className="text-center text-lg max-w-2xl mb-12 text-black">
        En AtStudio, nos especializamos en diseñar ropa moderna y elegante para cada ocasión. 
        Nuestro equipo está dedicado a brindar la mejor calidad y estilo a nuestros clientes. 
        Estamos siempre disponibles para ayudarte en lo que necesites a través de nuestras redes sociales.
      </p>

      {/* Iconos de Redes Sociales con tamaño aumentado y color original (rosa suave) */}
      <div className="flex space-x-12"> {/* Aumentamos el espacio entre los íconos */}
        {/* Icono de Facebook */}
        <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <FaFacebook className="text-softPink text-8xl hover:text-black transition-colors duration-300" />
        </Link>
        
        {/* Icono de Instagram */}
        <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram className="text-softPink text-8xl hover:text-black transition-colors duration-300" />
        </Link>

        {/* Icono de Twitter */}
        <Link href="https://www.twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter className="text-softPink text-8xl hover:text-black transition-colors duration-300" />
        </Link>

        {/* Icono de WhatsApp */}
        <Link href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp">
          <FaWhatsapp className="text-softPink text-8xl hover:text-black transition-colors duration-300" />
        </Link>
      </div>
    </div>
  );
}
