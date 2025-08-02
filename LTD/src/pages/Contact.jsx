import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  // Contact information sections for better organization
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Our Garage',
      content: (
        <p>
          123 Main Street<br />
          London, UK<br />
          SW1A 1AA
        </p>
      )
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: (
        <>
          <p>
            <a href="tel:01782405229" className="hover:text-blue-600 transition-colors duration-300">
              01782 405229
            </a>
          </p>
          <p className="text-sm">Available during business hours</p>
        </>
      )
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: (
        <>
          <p>
            <a href="mailto:info@accessautoservices.co.uk" className="hover:text-blue-600 transition-colors duration-300">
              info@accessautoservices.co.uk
            </a>
          </p>
          <p className="text-sm">We'll respond within 24 hours</p>
        </>
      )
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Opening Hours',
      content: (
        <div className="space-y-1">
          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
          <p>Saturday: 8:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      )
    }
  ];

  // Form fields configuration for looping
  const formFields = [
    {
      id: 'name',
      label: 'Full Name *',
      type: 'text',
      required: true,
      placeholder: 'Your full name',
      colSpan: 1
    },
    {
      id: 'email',
      label: 'Email Address *',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com',
      colSpan: 1
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: false,
      placeholder: 'Your phone number',
      colSpan: 1
    },
    {
      id: 'subject',
      label: 'Subject *',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select a subject' },
        { value: 'mot', label: 'MOT Booking' },
        { value: 'service', label: 'General Service' },
        { value: 'repair', label: 'Vehicle Repair' },
        { value: 'quote', label: 'Request Quote' },
        { value: 'other', label: 'Other Inquiry' }
      ],
      colSpan: 1
    },
    {
      id: 'message',
      label: 'Message *',
      type: 'textarea',
      required: true,
      placeholder: 'Please provide details about your inquiry...',
      rows: 6,
      colSpan: 2
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Get in touch with Access Auto Services. We're here to help with all your vehicle service needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
              background: 'white', 
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--card-border)'
            }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Send us a Message</h2>
              
              {isSubmitted && (
                <div className="border px-4 py-3 rounded-lg mb-6 flex items-center" style={{ 
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderColor: 'rgba(16, 185, 129, 0.5)',
                  color: '#047857',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field, index) => (
                    field.type !== 'textarea' && field.type !== 'select' && (
                      <div key={index} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                        <label htmlFor={field.id} className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required={field.required}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300"
                          placeholder={field.placeholder}
                          style={{ 
                            borderColor: 'var(--card-border)', 
                            borderRadius: 'var(--radius-md)'
                          }}
                        />
                      </div>
                    )
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field, index) => (
                    field.type === 'select' && (
                      <div key={index} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                        <label htmlFor={field.id} className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                          {field.label}
                        </label>
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required={field.required}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300 appearance-none bg-white"
                          style={{ 
                            borderColor: 'var(--card-border)', 
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  ))}
                </div>
                
                {formFields.map((field, index) => (
                  field.type === 'textarea' && (
                    <div key={index} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                      <label htmlFor={field.id} className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                        {field.label}
                      </label>
                      <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        required={field.required}
                        rows={field.rows}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300 resize-none"
                        placeholder={field.placeholder}
                        style={{ 
                          borderColor: 'var(--card-border)', 
                          borderRadius: 'var(--radius-md)'
                        }}
                      />
                    </div>
                  )
                ))}
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg hover-scale flex items-center justify-center font-semibold text-white"
                  style={{ 
                    background: 'var(--bg-gradient-card)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'var(--transition-normal)'
                  }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                background: 'white', 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Get in Touch</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg" style={{ 
                        background: 'var(--primary-blue-lighter)',
                        color: 'var(--primary-blue)'
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-dark)' }}>{info.title}</h3>
                        <div style={{ color: 'var(--text-muted)' }}>
                          {info.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="glass-effect rounded-lg p-6" style={{ 
                background: 'rgba(239, 68, 68, 0.05)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <h3 className="text-xl font-bold mb-3 text-red-800">Emergency Breakdown?</h3>
                <p className="text-red-700 mb-4">
                  If you're experiencing a vehicle breakdown or emergency, please call our emergency line:
                </p>
                <a
                  href="tel:07700900123"
                  className="inline-block text-white px-6 py-3 rounded-lg hover-scale font-semibold"
                  style={{ 
                    background: 'linear-gradient(to right, #ef4444, #dc2626)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'var(--transition-normal)'
                  }}
                >
                  Emergency: 07700 900 123
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Find Us</h2>
            <p className="text-xl" style={{ color: 'var(--text-muted)' }}>
              Located in the heart of London, easily accessible by car or public transport
            </p>
          </div>
          
          <div className="rounded-lg h-96 flex flex-col items-center justify-center" style={{ 
            background: 'var(--primary-blue-lighter)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--primary-blue)' }} />
              <p className="text-lg" style={{ color: 'var(--text-dark)' }}>Interactive map would be embedded here</p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>123 Main Street, London, UK</p>
              <a 
                href="https://maps.google.com/?q=123+Main+Street+London+UK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg border hover-scale"
                style={{ 
                  borderColor: 'var(--primary-blue)',
                  color: 'var(--primary-blue)',
                  transition: 'var(--transition-normal)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <ExternalLink size={16} className="mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20" style={{ background: 'var(--bg-gradient-secondary)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Need Quick Answers?</h2>
          <p className="text-xl mb-8" style={{ color: 'var(--text-muted)' }}>
            Check out our frequently asked questions for immediate answers to common queries
          </p>
          <a
            href="/faq"
            className="inline-block text-white px-8 py-4 rounded-lg text-lg font-semibold hover-scale"
            style={{ 
              background: 'var(--bg-gradient-card)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-normal)'
            }}
          >
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;