"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  clothing_image: string;
  model_image: string;
  description: string;
  sizes: string[];
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get/${id}`, {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        });

        const data = await response.json();
        console.log(data);
        setProduct(data.data || null);
      } catch (error: any) {
        setError(error.message);
        console.error("Error al cargar producto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  // Validar que la imagen de producto sea válida, usando el campo `clothing_image` o `model_image`
  const productImage = product.clothing_image || product.model_image;

  return (
    <div className="container mx-auto my-8 px-4 sm:px-8 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen principal del producto */}
        <div>
          <Image
            src={productImage}
            alt={product.name}
            width={500}
            height={700}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl text-gray-800">S/. {product.price.toFixed(2)}</span>
          </div>
          <div className="mb-6">
            <span className="text-lg font-semibold">Tamaño</span>
            <div className="flex space-x-4 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${selectedSize === size ? 'bg-[#D9CFC3] text-black' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <p className="text-lg text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
