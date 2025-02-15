
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold text-mint-600">CleanCo</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-mint-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-mint-600 transition-colors">Services</a>
              <a href="#why-us" className="text-gray-600 hover:text-mint-600 transition-colors">Why Us</a>
              <a href="#contact" className="text-gray-600 hover:text-mint-600 transition-colors">Contact</a>
              <button className="bg-mint-500 text-white px-6 py-2 rounded-md hover:bg-mint-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100">
            <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-mint-600 transition-colors">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-mint-600 transition-colors">Services</a>
            <a href="#why-us" className="block px-3 py-2 text-gray-600 hover:text-mint-600 transition-colors">Why Us</a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-mint-600 transition-colors">Contact</a>
            <button className="w-full mt-2 bg-mint-500 text-white px-6 py-2 rounded-md hover:bg-mint-600 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
