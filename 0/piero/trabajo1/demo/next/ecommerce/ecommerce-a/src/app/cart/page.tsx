"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  clothing_image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]); // Inicializado como array vacío

  // Fetch cart items from backend or localStorage on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCartItems(data.products || []); // Asegúrate de que siempre sea un array
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]); // En caso de error, mantenemos el array vacío
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-xl">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center">
                <Image src={item.clothing_image} alt={item.name} width={80} height={80} className="mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">S/. {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-2 border rounded"
                  min={1}
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold">Total: S/. {totalPrice.toFixed(2)}</h3>
            <button className="mt-4 bg-softPink text-white px-4 py-2 rounded hover:bg-gray-800 transition-all">
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
