import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Bedroom',
    image: 'https://i.pinimg.com/736x/67/01/6a/67016a346050ce6bf8e872b098a280ff.jpg',
    description: 'Explore our wide range of bedroom furniture for comfort and style.',
    path: '/bedroom'
  },
  {
    title: 'Living Room',
    image: 'https://i.pinimg.com/736x/be/a4/00/bea4000d4f20821d5b8f4a29a8d8ec43.jpg',
    description: 'Find the perfect pieces to create your cozy living space.',
    path: '/Livingroom'
  },
  {
    title: 'Dining',
    image: 'https://i.pinimg.com/736x/31/70/7d/31707dd0590c95b26c201ec3fe347279.jpg',
    description: 'Elegant dining furniture to enhance your meal experience.',
    path: '/dining'
  },
  {
    title: 'Decor',
    image: 'https://i.pinimg.com/736x/fa/52/da/fa52da24f7f5b7ecb47ef057f3c76700.jpg',
    description: 'Stylish decor items to add a unique touch to any room.',
    path: '/decor'
  },
];

function ProductCategory() {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-gray-100 py-8" data-aos="fade-up">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12" id='neww'>Our Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto px-6">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="flex items-center bg-gray-50 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <img 
              src={category.image} 
              alt={category.title} 
              className="w-1/3 h-full object-cover"
            />
            <div className="p-6 flex flex-col justify-between w-2/3">
              <h3 className="text-xl font-bold text-gray-700">{category.title}</h3>
              <p className="text-gray-600 mt-2">{category.description}</p>
              <button 
                onClick={() => navigate(category.path)}
                className="self-start mt-4 text-gray px-4 py-2 hover:text-blue-600 transition-colors duration-200"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCategory;
