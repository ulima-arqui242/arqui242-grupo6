"use client";

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  clothing_image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/all`, {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        });
        

        const data = await response.json();
        console.log("Datos del backend:", data);

        // Ajustamos la respuesta a la estructura esperada
        setProducts(data.data || []); 
      } catch (error: any) {
        setError(error.message);
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Productos | AtStudio</title>
        <meta name="description" content="Catálogo de productos de AtStudio" />
      </Head>

      <section className="my-8 px-4 sm:px-8 lg:px-0">
        <div className="container mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Shop</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} className="block">
                <div
                  className="border rounded-lg shadow-lg overflow-hidden bg-whitePink transform hover:scale-105 transition-transform duration-300"
                  style={{ width: '100%', maxWidth: '320px', height: '550px' }}
                >
                  <div className="h-3/4">
                    <Image
                      src={product.clothing_image}
                      alt={product.name}
                      width={320}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center h-1/4 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg sm:text-xl">S/. {product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
