import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <div className="fixed top-10 right-10 bg-white border-2 border-green-200 text-black px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
      <FaShoppingCart className="text-green-500 animate-bounce" size={24} />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Popup;
