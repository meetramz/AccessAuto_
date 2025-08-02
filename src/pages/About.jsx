import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Award,
  Clock,
  CheckCircle,
  Star,
} from 'lucide-react';

import eee from '../assets/eee.jpg';
import nnn from '../assets/nnnn.jpg';
import bbb from '../assets/bbbb.jpg';
import CartDropdown from '../components/CartDropdown';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Vehicles Serviced' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Emergency Support' },
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Integrity',
      description:
        'We believe in honest, transparent service with no hidden costs or unnecessary work.',
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'Quality',
      description:
        'We use only the best parts and equipment to ensure lasting repairs and service.',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Customer Focus',
      description:
        'Your satisfaction is our priority. We listen, understand, and deliver exceptional service.',
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Reliability',
      description: 'Dependable service you can count on, delivered on time, every time.',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Master Technician & Owner',
      experience: '20+ years',
      image:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['MOT Testing', 'Engine Diagnostics', 'Electrical Systems'],
    },
    {
      name: 'Mike Johnson',
      role: 'Senior Mechanic',
      experience: '15+ years',
      image:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Brake Systems', 'Suspension', 'Transmission'],
    },
    {
      name: 'Sarah Williams',
      role: 'Service Advisor',
      experience: '8+ years',
      image:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Customer Service', 'Parts Ordering', 'Scheduling'],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      <CartDropdown />
      {/* Hero Section */}
      <section style={{ background: 'var(--bg-gradient-main)' }} className="text-white py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">About Access Auto Services</h1>
            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: 'var(--primary-blue-lighter)' }}
            >
              We are an MOT approved garage committed to delivering high-quality, reliable auto care
              with exceptional customer service and integrity. Our mission is to keep your vehicle
              running safely and efficiently.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              style={{ color: 'var(--primary-blue-dark)' }}
            >
              Get in Touch
            </Link>
          </div>
          <div className="relative">
            <img
              src={eee}
              alt="Garage facility"
              className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="transform hover:scale-105 transition duration-300">
              <div className="text-4xl font-bold" style={{ color: 'var(--primary-blue)' }}>
                {stat.number}
              </div>
              <div className="font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20" style={{ background: 'var(--bg-gradient-secondary)' }}>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Access Auto Services was founded with a simple mission: to provide honest,
                reliable automotive services that customers can trust. As an MOT approved garage,
                we specialize in MOT testing for Class 4, 5, and 7 vehicles.
              </p>
              <p>
                Over the years, we've built our reputation on quality workmanship, fair pricing,
                and exceptional customer service. Our team of experienced technicians is dedicated
                to keeping your vehicle safe, reliable, and running at its best.
              </p>
              <p>
                We offer comprehensive mechanical repairs across all vehicle makes and models,
                from routine servicing to complex diagnostic work. Every job, big or small,
                receives the same attention to detail and commitment to excellence.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={nnn}
              alt="Mechanic working"
              className="rounded-lg shadow-xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition"
              >
                <div className="mb-4 text-blue-500 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 text-white relative" style={{ background: 'var(--bg-gradient-main)' }}>
        <img src={bbb} alt="cert-bg" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Certifications & Approvals</h2>
          <p className="text-xl text-blue-200 mb-16">We maintain high standards through certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur text-white hover:scale-105 transition">
              <Shield className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">MOT Approved</h3>
              <p>Testing station for Class 4, 5 & 7 vehicles</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur text-white hover:scale-105 transition">
              <Award className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Certified</h3>
              <p>All technicians hold industry-recognized qualifications</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur text-white hover:scale-105 transition">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p>We follow strict quality control procedures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Experience the Difference</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Access Auto Services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Book Service
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
