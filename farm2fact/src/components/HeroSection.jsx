// src/components/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-green-600 text-white py-24 px-6">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/path/to/your-background-image.jpg)' }}></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Empowering Farmers, Strengthening Industries
        </h1>
        <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
          At Farmer2Factory, we connect farmers directly with factory officials, bridging the gap between agriculture and industry. Our platform ensures fresh, high-quality crops are made available to factories, while providing farmers with fair prices and easy access to the marketplace.
        </p>
        <a
          href="aboutus"
          className="inline-block py-3 px-8 bg-white text-green-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-green-700 hover:text-white transition ease-in-out duration-300 animate__animated animate__fadeIn animate__delay-3s"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
