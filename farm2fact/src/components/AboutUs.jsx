import React from 'react';
import { FaLeaf, FaIndustry, FaHandshake, FaSeedling } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-green-800 mb-8">
          About Us - Farmer to Factory
        </h1>

        <div className="mb-16 max-w-3xl mx-auto">
          <p className="text-3xl text-green-700 text-center mb-6 italic">
            Empowering Farmers, Strengthening Industries
          </p>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            At <span className="font-semibold text-green-600">Farmer to Factory</span>, we bridge the gap between farmers and industries, providing a seamless connection to ensure the best quality crops reach factories. Our goal is to empower farmers while offering factories reliable access to fresh agricultural produce at competitive prices.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
            Our mission is to create a sustainable agricultural ecosystem where farmers can thrive, and factories can operate efficiently, benefiting from fresh, quality crops directly from the source. We focus on fair trade, transparency, and improving the supply chain for all stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-green-100 rounded-lg p-8 shadow-md transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <FaSeedling className="mr-2" /> For Farmers
            </h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Marketplace for Crop Listings:</strong> Easily list crops and attract factory buyers.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Fair Pricing:</strong> Get fair compensation by eliminating intermediaries.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Simple Platform:</strong> Easy-to-use platform for farmers to manage their listings.</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-100 rounded-lg p-8 shadow-md transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <FaIndustry className="mr-2" /> For Factory Officials
            </h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Reliable Supply:</strong> Browse and purchase fresh crops with transparent pricing.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Streamlined Orders:</strong> Track orders and manage purchases efficiently.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="mt-1 mr-2 text-green-600" />
                <span><strong>Verified Sellers:</strong> Work with registered and reliable farmers.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            <div className="flex items-start">
              <FaHandshake className="text-4xl mr-4 mt-1" />
              <p><strong>Direct Connection:</strong> Eliminate middlemen and create stronger relationships between farmers and factories.</p>
            </div>
            <div className="flex items-start">
              <FaLeaf className="text-4xl mr-4 mt-1" />
              <p><strong>Reliable Supply:</strong> Ensure a consistent and high-quality supply of crops.</p>
            </div>
            <div className="flex items-start">
              <FaSeedling className="text-4xl mr-4 mt-1" />
              <p><strong>Empowering Farmers:</strong> Support farmers with the tools they need to succeed and thrive.</p>
            </div>
            <div className="flex items-start">
              <FaIndustry className="text-4xl mr-4 mt-1" />
              <p><strong>Industry Growth:</strong> Help factories scale operations with a steady flow of fresh produce.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
            Contact Us
          </h2>
          <div className="text-center text-lg text-gray-700">
            <p className="mb-6">If you have any questions or would like more information, please feel free to reach out.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="font-semibold text-green-700">Office Address:</p>
                <p>123 Greenfield Road, AgriCity, India</p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Customer Support:</p>
                <p>Email: <a href="mailto:support@farmer2factory.com" className="text-green-600 hover:underline">support@farmer2factory.com</a></p>
                <p>Phone: +91 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
