
import Navigation from '../components/Navigation';
import { Check, MapPin, Mail, Phone } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block animate-fade-down px-4 py-1 mb-6 bg-mint-100 text-mint-600 rounded-full text-sm font-medium">
            Professional Cleaning Services
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
            Making Your Space <br className="hidden md:block" />
            <span className="text-mint-500">Spotless & Fresh</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up">
            Professional cleaning services for homes and offices. We bring the shine to your space with eco-friendly solutions.
          </p>
          <button className="animate-fade-up bg-mint-500 text-white px-8 py-4 rounded-md hover:bg-mint-600 transition-all hover:scale-105 transform">
            Get Free Quote
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of cleaning services to meet all your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Cleaning",
                description: "Complete cleaning solutions for your home, from regular maintenance to deep cleaning.",
              },
              {
                title: "Office Cleaning",
                description: "Professional cleaning services for offices and commercial spaces.",
              },
              {
                title: "Deep Cleaning",
                description: "Thorough deep cleaning service for those special occasions or seasonal cleaning needs.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our professional cleaning services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Experienced Team", description: "Professional and trained cleaning experts" },
              { title: "Eco-Friendly", description: "We use environmentally safe cleaning products" },
              { title: "Satisfaction Guaranteed", description: "Your satisfaction is our top priority" },
              { title: "Flexible Scheduling", description: "Convenient scheduling that works for you" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-mint-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for a free quote or any questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Phone, text: "(555) 123-4567", label: "Call us" },
              { icon: Mail, text: "info@cleanco.com", label: "Email us" },
              { icon: MapPin, text: "123 Cleaning St, City", label: "Visit us" },
            ].map((contact, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <contact.icon className="w-6 h-6 text-mint-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.label}</h3>
                <p className="text-gray-600">{contact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
