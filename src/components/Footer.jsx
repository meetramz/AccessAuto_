import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYelp } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.png';

const Footer = () => {
  const location = useLocation();
  const isOnServicesPage = location.pathname === '/services';
  const serviceLink = (id) => isOnServicesPage ? `#${id}` : `/services#${id}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Access Auto Services" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="text-xl font-bold">Access Auto Services</h3>
                <p className="text-gray-400 text-sm">Professional Vehicle Care</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are an MOT approved garage offering comprehensive vehicle services.
              Our mission is to deliver high-quality, reliable auto care with exceptional
              customer service and integrity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/accessautoservices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/accessautoservices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                title="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.yell.com/biz/access-auto-services-stoke-on-trent-10712583/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                title="Find us on Yell"
              >
                <FontAwesomeIcon icon={faYelp} className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/accessautoserv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                title="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Our Services</h4>
            <ul className="space-y-2">
              {[
                ['mot', 'MOT Test'],
                ['service', 'Full Service'],
                ['repairs', 'Vehicle Repairs'],
                ['brakes', 'Brake Services'],
                ['batteries', 'Battery Services'],
                ['clutches', 'Clutch Repairs'],
                ['exhaust', 'Exhaust Systems'],
                ['diagnostics', 'Vehicle Diagnostics'],
                ['dpf', 'DPF Cleaning']
              ].map(([id, label]) => (
                <li key={id}>
                  <Link to={serviceLink(id)} className="text-gray-300 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/booking', 'Book Appointment'],
                ['/contact', 'Contact Us'],
                ['/faq', 'FAQ'],
                ['/my-account', 'My Account']
              ].map(([path, label]) => (
                <li key={path}>
                  <Link to={path} className="text-gray-300 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>9 Chelson St, Longton,</p>
                  <p>Stoke-on-Trent ST3 1PT</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">01782 405229</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">info@accessautoservices.co.uk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Access Auto Services. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition">Cookies Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
