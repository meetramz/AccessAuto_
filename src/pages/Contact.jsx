import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Send, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import CartDropdown from '../components/CartDropdown';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
   useEffect(() => {
    if (window.location.hash === '#garage-map') {
      const el = document.getElementById('garage-map');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    emailjs.send(
      'service_oiajj6l',      // Your Service ID
      'service_oiajj6l',     // Your Template ID
      formData,               // Data object matching your template variables
      '0IEdHQs1NcrJgl-Cy'    // Your Public Key (User ID)
    )
    .then(() => {
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch(() => {
      setStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again.' });
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      title: 'Visit Our Garage',
      content: (
        <>
          <p>Longton, Stoke-on-Trent</p>
          <p>ST3 1PT, UK</p>
          <a
            href="https://maps.app.goo.gl/dKcKVbrEf2JxkG597"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-1 text-indigo-600 hover:underline"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View on Google Maps
          </a>
        </>
      ),
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-600" />,
      title: 'Call Us',
      content: (
        <p>
          <a href="tel:01782405229" className="hover:text-indigo-800 transition-colors duration-300">
            01782 405229
          </a>
        </p>
      ),
    },
    {
      icon: <Mail className="w-6 h-6 text-indigo-600" />,
      title: 'Email Us',
      content: (
        <div>
          <p>
            <a href="mailto:info@accessautoservices.co.uk" className="hover:text-indigo-800 transition-colors duration-300">
              info@accessautoservices.co.uk
            </a>
          </p>
          <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
        </div>
      ),
    },
    {
      icon: <Send className="w-6 h-6 text-red-600" />,
      title: 'Emergency Contact',
      content: (
        <p>
          <a
            href="tel:01782405229"
            className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-300"
          >
            Emergency: 01782 405229
          </a>
        </p>
      ),
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: 'Opening Hours',
      content: (
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Monday - Friday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Saturday:</span>
            <span>10:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Sunday:</span>
            <span className="text-red-600 font-medium">Closed</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              Please call ahead to confirm availability for same-day appointments.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4">
      <CartDropdown />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Contact Us</h2>

          {status.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md border border-green-300 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Your message has been sent successfully!</span>
            </div>
          )}

          {status.error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md border border-red-300">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-semibold mb-1 text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-semibold mb-1 text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                status.submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {status.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <div className="rounded-xl overflow-hidden shadow-lg mt-8" id="garage-map">
            <iframe
              title="Access Auto Services Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.2089517997617!2d-2.173854384216092!3d52.987564679732596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a698217704cdf%3A0x1c48f36ab0f13e25!2sLongton%2C%20Stoke-on-Trent%20ST3%201PT%2C%20UK!5e0!3m2!1sen!2suk!4v1690472203261!5m2!1sen!2suk"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://maps.app.goo.gl/dKcKVbrEf2JxkG597"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Contact Info Panel */}
        <div className="space-y-10">
          {/* Contact Info Cards */}
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 bg-white rounded-xl shadow-md p-6"
            >
              <div className="p-3 rounded-lg bg-indigo-100 flex items-center justify-center">
                {info.icon}
              </div>
              <div>
                <h3 className="font-semibold text-indigo-700 mb-1">{info.title}</h3>
                <div className="text-gray-700">{info.content}</div>
              </div>
            </div>
          ))}

          {/* Embedded Google Map */}
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
