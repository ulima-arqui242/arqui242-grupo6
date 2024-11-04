"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    nombreCuenta: '',
    correo: '',
    confirmarCorreo: '',
    celular: ''
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { correo, confirmarCorreo } = formData;

    if (correo !== confirmarCorreo) {
      alert('Los correos electrónicos no coinciden');
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.correo,
        password: 'password123', // Esto debería estar en el formulario
        name: formData.nombres,
        phone: formData.celular,
        address: 'Tu dirección', // Completa los campos requeridos
      }),
    });

    if (response.ok) {
      alert('Registro exitoso');
      router.push('/login');
    } else {
      alert('Error al registrar');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightGray overflow-hidden">
      <Link href="/">
        <h1 className="text-5xl font-bold mb-8 text-black cursor-pointer hover:text-softPink transition-colors duration-300">
          AtStudio
        </h1>
      </Link>

      <div className="bg-[#f0ebe3] p-12 rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.webp" alt="AtStudio Logo" width={80} height={80} />
        </div>

        <h1 className="text-center text-3xl font-semibold mb-8 text-black">Crear nueva cuenta</h1>

        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-8 space-y-6 sm:space-y-0">
          <div className="relative">
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleInputChange}
              placeholder="Nombres"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              placeholder="Apellidos"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="nombreCuenta"
              value={formData.nombreCuenta}
              onChange={handleInputChange}
              placeholder="Nombre de cuenta"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder="Celular"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="confirmarCorreo"
              value={formData.confirmarCorreo}
              onChange={handleInputChange}
              placeholder="Confirmar correo electrónico"
              className="w-full p-6 text-xl border border-softPink rounded-full focus:outline-none focus:ring-2 focus:ring-softPink"
              required
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full py-4 px-8 text-lg font-medium text-white bg-softPink rounded-full hover:bg-black transition duration-300 ease-in-out"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
