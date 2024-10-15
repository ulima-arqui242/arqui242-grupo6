// src/Content.js
import React, { useState, useEffect } from 'react';

const Content = () => {
  const [image, setImage] = useState('');

  const fetchRandomImage = async () => {
    const res = await fetch('https://source.unsplash.com/random');
    setImage(res.url);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Random Image</h2>
      <img src={image} alt="Random" style={{ width: '80%', maxWidth: '600px', height: 'auto' }} />
      <br />
      <button onClick={fetchRandomImage}>Get Another Image</button>
    </div>
  );
};

export default Content;
