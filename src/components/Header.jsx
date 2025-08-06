import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, MapPin, Phone, User, ChevronDown,
  Calendar, ShieldCheck, Mail, Clock
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYelp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleBookNow = () => {
    navigate('/booking');
  };

  const services = [
    { name: "All Services", path: "/services" },
    { name: "MOT Testing", path: "/services#mot" },
    { name: "Repairs", path: "/services#repairs" },
    { name: "Servicing", path: "/services#servicing" },
    { name: "Brakes", path: "/services#brakes" },
    { name: "Batteries", path: "/services#batteries" },
    { name: "Clutches", path: "/services#clutches" },
    { name: "Exhaust", path: "/services#exhaust" },
    { name: "Diagnostics", path: "/services#diagnostics" },
    { name: "DPF Cleaning", path: "/services#dpf" }
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "MOT", path: "/mot" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleAccountClick = (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      navigate('/my-account');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Contact Bar */}
      <div style={{ background: 'var(--primary-blue-dark)' }} className="text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="https://maps.app.goo.gl/dKcKVbrEf2JxkG597" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-200 transition-all duration-300">
                <MapPin size={16} />
                <span className="hidden md:inline">Address: Longton, Stoke-on-Trent ST3 1PT, UK</span>
                <span className="md:hidden">Our Location</span>
              </a>
              <a href="tel:01782405229" className="flex items-center gap-2 hover:text-blue-200 transition-all duration-300">
                <Phone size={16} />
                <span>01782 405229</span>
              </a>
              <a href="mailto:info@access-auto-services.co.uk" className="flex items-center gap-2 hover:text-blue-200 transition-all duration-300">
                <Mail size={16} />
                <span className="hidden md:inline">info@access-auto-services.co.uk</span>
                <span className="md:hidden">Email Us</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/my-account"
                onClick={handleAccountClick}
                className="flex items-center gap-1 hover:text-blue-200 transition-all duration-300"
                style={{ cursor: 'pointer' }}
              >
                <User size={16} />
                <span className="hidden sm:inline">My Account</span>
              </a>
              <div className="hidden md:flex items-center gap-2 py-1 px-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <ShieldCheck size={14} />
                <span className="text-xs font-medium">MOT</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="https://www.facebook.com/accessautoservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200 transition-all duration-300 p-1"
                  title="Follow us on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/accessautoservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-200 transition-all duration-300 p-1"
                  title="Follow us on Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                </a>
                <a
                  href="https://www.yell.com/biz/access-auto-services-stoke-on-trent-10712583/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-200 transition-all duration-300 p-1"
                  title="Find us on Yell"
                >
                  <FontAwesomeIcon icon={faYelp} className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white" style={{ borderBottom: isScrolled ? '1px solid var(--card-border)' : 'none' }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative">
                <img src={logo} alt="Access Auto Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                <div className="absolute inset-0 rounded-full bg-blue-500 blur-lg opacity-10 -z-10"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--primary-blue)' }}>Access Auto Services</h1>
                <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>Professional Vehicle Care</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => {
                if (index === 2) {
                  return (
                    <React.Fragment key="services-fragment">
                      {/* MOT */}
                      <Link
                        to={navLinks[2].path}
                        className={`relative px-4 py-2 font-bold text-sm rounded-lg transition-all duration-300 ${isActive(navLinks[2].path) ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'}`}
                      >
                        {navLinks[2].name}
                        {isActive(navLinks[2].path) && (
                          <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 rounded-full" style={{ background: 'var(--primary-blue)' }}></span>
                        )}
                      </Link>

                      {/* Services Dropdown */}
                      <div
                        className="relative group"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <button
                          className={`flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${isActive('/services') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                          Services
                          <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div className="absolute h-2 w-full left-0 bottom-0 translate-y-full"></div>
                        <div
                          className={`absolute top-full left-0 w-64 rounded-xl overflow-hidden border glass-effect transition-opacity duration-300 ${isServicesOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                          style={{
                            boxShadow: 'var(--shadow-lg)',
                            borderColor: 'var(--card-border)',
                            marginTop: '0.5rem'
                          }}
                        >
                          <div className="py-2">
                            {services.map((service, index) => (
                              <Link
                                key={index}
                                to={service.path}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }

                // Render normal nav items
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 font-bold text-sm rounded-lg transition-all duration-300 ${isActive(link.path) ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 rounded-full" style={{ background: 'var(--primary-blue)' }}></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Book Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleBookNow}
                className="hidden lg:flex items-center gap-1 px-5 py-2.5 rounded-lg text-sm font-medium hover-scale shadow-md"
                style={{ background: 'var(--bg-gradient-card)', color: 'white' }}
              >
                <Calendar size={16} />
                <span>Book Now</span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                style={{ border: isMenuOpen ? '1px solid var(--primary-blue-light)' : '1px solid transparent' }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ top: '120px' }}>
        <div className="container mx-auto px-4 py-6 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 px-4 text-lg font-bold rounded-lg ${isActive(link.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Mobile Section */}
            <div className="py-3 px-4">
              <p className="text-lg font-bold text-gray-700 mb-2">Services</p>
              <div className="ml-2 space-y-0.5">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="block py-2 px-3 text-sm font-medium text-gray-600 hover:text-blue-700"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Contact in Mobile */}
          <div className="mt-8 px-4">
            <button
              onClick={handleBookNow}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium shadow-md"
            >
              <Calendar size={18} />
              Book Your Appointment
            </button>

            <div className="mt-8 border-t pt-6">
              <div className="flex flex-col gap-4">
                <a href="tel:01782405229" className="flex items-center gap-3 text-gray-600 hover:text-blue-700">
                  <Phone size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-base">01782 405229</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Opening Hours</p>
                    <p className="text-sm">Mon-Fri: 9:00 AM–6:00 PM</p>
                    <p className="text-sm">Sat: 10:00 AM–5:00 PM</p>
                    <p className="text-sm">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
