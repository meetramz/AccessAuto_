import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield, Wrench, Settings, Car, Battery,
  Zap, Wind, Search, Filter, CheckCircle
} from 'lucide-react';

import brakesImg from '../assets/brake.jpg';
import batteryImg from '../assets/battery.jpg';
import motImg from '../assets/MOT.jpg';
import clutchImg from '../assets/clutch.jpg';
import repairsImg from '../assets/regular_services.jpg';
import bbbbImg from '../assets/bbbb.jpg';
import nnnnImg from '../assets/vehicle_repairs.jpg';
import sssImg from '../assets/www.jpg';

import CheckerForm from '../components/CheckerForm';

const services = [
  {
    id: 'mot',
    name: 'MOT Test',
    icon: <Shield className="w-16 h-16" />,
    description: 'Official MOT testing for Class 4, 5 & 7 vehicles. We are an approved MOT testing station providing comprehensive vehicle safety checks.',
    price: 40.0,
    features: ['Class 4 - £40.00', 'Class 5 - £59.00', 'Class 7 - £60.00', 'MOT Base - £30.00', 'FREE Re-Test - £0.00'],
    image: motImg,
  },
  {
    id: 'service',
    name: 'Full Service',
    icon: <Settings className="w-16 h-16" />,
    description: 'Complete vehicle servicing to keep your car running smoothly and efficiently. Regular maintenance prevents costly repairs.',
    price: 89.0,
    features: ['Oil & Filter Change', 'Brake Inspection', 'Tire Check', 'Fluid Top-ups', 'Multi-point Inspection'],
    image: bbbbImg,
  },
  {
    id: 'repairs',
    name: 'Vehicle Repairs',
    icon: <Wrench className="w-16 h-16" />,
    description: 'Comprehensive mechanical repairs across all vehicle makes and models. Our experienced technicians handle everything from minor fixes to major overhauls.',
    price: 0,
    features: ['Engine Repairs', 'Transmission Work', 'Electrical Systems', 'Diagnostic Services'],
    image: repairsImg,
  },
  {
    id: 'brakes',
    name: 'Brake Services',
    icon: <Car className="w-16 h-16" />,
    description: 'Professional brake inspection, repair and replacement services. Your safety is our priority with comprehensive brake system care.',
    price: 120.0,
    features: ['Brake Pad Replacement', 'Disc Replacement', 'Brake Fluid Change', 'Brake System Inspection', 'Emergency Brake Repair'],
    image: brakesImg,
  },
  {
    id: 'batteries',
    name: 'Battery Services',
    icon: <Battery className="w-16 h-16" />,
    description: 'Battery testing, replacement and charging system diagnostics. Keep your vehicle starting reliably in all conditions.',
    price: 80.0,
    features: ['Battery Testing', 'Battery Replacement', 'Charging System Check', 'Alternator Testing', 'Jump Start Service'],
    image: batteryImg,
  },
  {
    id: 'clutches',
    name: 'Clutch Repairs',
    icon: <Zap className="w-16 h-16" />,
    description: 'Expert clutch repair and replacement for all vehicle types. Smooth gear changes and reliable performance guaranteed.',
    price: 0,
    features: ['Clutch Replacement', 'Clutch Adjustment', 'Flywheel Services', 'Hydraulic System Repair', 'Performance Upgrades'],
    image: clutchImg,
  },
  {
    id: 'exhaust',
    name: 'Exhaust Systems',
    icon: <Wind className="w-16 h-16" />,
    description: 'Complete exhaust system services including repairs, replacements and performance upgrades for optimal vehicle performance.',
    price: 150.0,
    features: ['Exhaust Repair', 'System Replacement', 'Catalytic Converter', 'Silencer Replacement', 'Performance Exhausts'],
    image: nnnnImg,
  },
  {
    id: 'diagnostics',
    name: 'Vehicle Diagnostics',
    icon: <Search className="w-16 h-16" />,
    description: 'Advanced diagnostic services using the latest equipment to identify and resolve vehicle issues quickly and accurately.',
    price: 45.0,
    features: ['Engine Diagnostics', 'Electronic Systems', 'Fault Code Reading', 'Performance Analysis', 'Pre-MOT Checks'],
    image: bbbbImg,
  },
  {
    id: 'dpf',
    name: 'DPF Cleaning',
    icon: <Filter className="w-16 h-16" />,
    description: "Professional DPF (Diesel Particulate Filter) cleaning and regeneration services to restore your diesel vehicle's performance.",
    price: 200.0,
    features: ['DPF Cleaning', 'Filter Regeneration', 'System Testing', 'Replacement Service', 'Performance Restoration'],
    image: sssImg,
  },
];

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-white py-16 bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-2xl mx-auto text-blue-200">
            Comprehensive automotive services for all makes and models. Quality service and customer care you can trust.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 text-white">{service.icon}</div>
                </div>
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                      <span className="text-base font-semibold text-blue-600">
                        {service.price === 0 ? 'Quote on Request' : `£${service.price.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <h4 className="font-semibold text-gray-700 mb-2">What's Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/booking"
                    className="mt-auto py-2.5 px-4 text-center rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checker Form */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Check Your Vehicle</h2>
          <CheckerForm />
        </div>
      </section>
    </div>
  );
};

export default Services;
