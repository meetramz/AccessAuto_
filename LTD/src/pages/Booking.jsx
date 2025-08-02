import React, { useState } from 'react';
import { Calendar, Clock, Car, User, CreditCard, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    vehicle: {
      make: '',
      model: '',
      year: '',
      registration: '',
      mileage: ''
    },
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  // Services data with pricing details
  const services = [
    { id: 'mot', name: 'MOT Test', price: 54.85, duration: '1 hour', description: 'Official MOT testing for Class 4, 5 & 7 vehicles' },
    { id: 'service', name: 'Full Service', price: 89.00, duration: '2 hours', description: 'Complete vehicle health check and maintenance' },
    { id: 'repair', name: 'Vehicle Repair', price: 0, duration: 'TBD', description: 'Custom repair based on your vehicle needs' },
    { id: 'brakes', name: 'Brake Service', price: 120.00, duration: '1.5 hours', description: 'Brake inspection and replacement' },
    { id: 'battery', name: 'Battery Service', price: 80.00, duration: '30 minutes', description: 'Battery testing and replacement' },
    { id: 'clutch', name: 'Clutch Repair', price: 450.00, duration: '4 hours', description: 'Clutch repair and replacement' },
    { id: 'exhaust', name: 'Exhaust Service', price: 150.00, duration: '1 hour', description: 'Exhaust system inspection and repair' },
    { id: 'diagnostics', name: 'Vehicle Diagnostics', price: 45.00, duration: '45 minutes', description: 'Comprehensive diagnostic scan' }
  ];

  // Time slots array
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Form field configurations for vehicle and customer sections
  const formFields = {
    vehicle: [
      { name: 'make', label: 'Vehicle Make *', type: 'text', placeholder: 'e.g., Ford, BMW, Toyota', colSpan: 1 },
      { name: 'model', label: 'Vehicle Model *', type: 'text', placeholder: 'e.g., Focus, 3 Series, Corolla', colSpan: 1 },
      { name: 'year', label: 'Year *', type: 'number', placeholder: '2020', colSpan: 1 },
      { name: 'registration', label: 'Registration Number *', type: 'text', placeholder: 'AB12 CDE', colSpan: 1, transform: (value) => value.toUpperCase() },
      { name: 'mileage', label: 'Current Mileage', type: 'number', placeholder: '50000', colSpan: 2 }
    ],
    customer: [
      { name: 'firstName', label: 'First Name *', type: 'text', colSpan: 1 },
      { name: 'lastName', label: 'Last Name *', type: 'text', colSpan: 1 },
      { name: 'email', label: 'Email Address *', type: 'email', colSpan: 1 },
      { name: 'phone', label: 'Phone Number *', type: 'tel', colSpan: 1 },
      { name: 'address', label: 'Address', type: 'textarea', rows: 3, colSpan: 2 }
    ]
  };

  const paymentFields = [
    { name: 'cardNumber', label: 'Card Number *', type: 'text', placeholder: '1234 5678 9012 3456', colSpan: 2 },
    { name: 'expiryDate', label: 'Expiry Date *', type: 'text', placeholder: 'MM/YY', colSpan: 1 },
    { name: 'cvv', label: 'CVV *', type: 'text', placeholder: '123', colSpan: 1 },
    { name: 'nameOnCard', label: 'Name on Card *', type: 'text', placeholder: 'John Smith', colSpan: 2 }
  ];

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-6 h-6 mr-3" /> },
    { id: 'cash', label: 'Pay at Garage', icon: <span className="w-6 h-6 mr-3 text-2xl">💷</span> }
  ];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setBookingData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: typeof formFields[section]?.find(f => f.name === field)?.transform === 'function' 
            ? formFields[section].find(f => f.name === field).transform(value) 
            : value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    setStep(5); // Success step
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.date && !!bookingData.time;
      case 3:
        return !!bookingData.vehicle.make && !!bookingData.vehicle.model && 
               !!bookingData.vehicle.registration && !!bookingData.customer.firstName && 
               !!bookingData.customer.email && !!bookingData.customer.phone;
      case 4:
        return bookingData.payment.method === 'cash' || 
              (!!bookingData.payment.cardNumber && !!bookingData.payment.expiryDate && 
               !!bookingData.payment.cvv && !!bookingData.payment.nameOnCard);
      default:
        return true;
    }
  };

  const selectedService = services.find(s => s.id === bookingData.service);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Service</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Schedule your vehicle service appointment online. Quick, easy, and secure booking process.
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNumber 
                      ? 'text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`} style={{ 
                    background: step >= stepNumber ? 'var(--primary-blue)' : undefined 
                  }}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} style={{ 
                      background: step > stepNumber ? 'var(--primary-blue)' : undefined 
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p style={{ color: 'var(--text-muted)' }}>
                Step {step} of 4: {
                  step === 1 ? 'Select Service' :
                  step === 2 ? 'Choose Date & Time' :
                  step === 3 ? 'Vehicle & Contact Details' :
                  'Payment Information'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8 glass-effect" style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <h2 className="text-3xl font-bold mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <Car className="w-8 h-8 mr-3" style={{ color: 'var(--primary-blue)' }} />
                  Select Your Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleInputChange(null, 'service', service.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        bookingData.service === service.id
                          ? 'bg-blue-50'
                          : 'hover:border-blue-300'
                      }`}
                      style={{ 
                        borderColor: bookingData.service === service.id ? 'var(--primary-blue)' : 'var(--card-border)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                        {service.name}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center" style={{ color: 'var(--text-muted)' }}>
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--primary-blue)' }}>
                          {service.price > 0 ? `£${service.price.toFixed(2)}` : 'Quote on request'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-3 rounded-lg hover-scale disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    style={{ 
                      background: 'var(--bg-gradient-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8 glass-effect" style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <h2 className="text-3xl font-bold mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <Calendar className="w-8 h-8 mr-3" style={{ color: 'var(--primary-blue)' }} />
                  Choose Date & Time
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange(null, 'date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300"
                      style={{ 
                        borderColor: 'var(--card-border)', 
                        borderRadius: 'var(--radius-md)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleInputChange(null, 'time', time)}
                          className={`p-2 text-sm rounded-lg border transition-all duration-300 ${
                            bookingData.time === time
                              ? 'text-white'
                              : 'text-gray-700 hover:border-blue-300'
                          }`}
                          style={{ 
                            background: bookingData.time === time ? 'var(--primary-blue)' : 'white',
                            borderColor: bookingData.time === time ? 'var(--primary-blue)' : 'var(--card-border)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedService && (
                  <div className="mt-6 p-4 rounded-lg" style={{ 
                    background: 'var(--primary-blue-lighter)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Selected Service:</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      {selectedService.name} - {selectedService.duration}
                    </p>
                    <p className="font-semibold" style={{ color: 'var(--primary-blue)' }}>
                      {selectedService.price > 0 ? `£${selectedService.price.toFixed(2)}` : 'Quote on request'}
                    </p>
                  </div>
                )}
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 hover-scale"
                    style={{ 
                      borderRadius: 'var(--radius-md)', 
                      transition: 'var(--transition-normal)' 
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-3 rounded-lg hover-scale disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    style={{ 
                      background: 'var(--bg-gradient-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8 glass-effect" style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <h2 className="text-3xl font-bold mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <User className="w-8 h-8 mr-3" style={{ color: 'var(--primary-blue)' }} />
                  Vehicle & Contact Details
                </h2>
                <div className="space-y-8">
                  {/* Vehicle Information - Using Form Fields Loop */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
                      Vehicle Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formFields.vehicle.map((field) => (
                        <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            value={bookingData.vehicle[field.name]}
                            onChange={(e) => handleInputChange('vehicle', field.name, e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300"
                            placeholder={field.placeholder || ''}
                            style={{ 
                              borderColor: 'var(--card-border)', 
                              borderRadius: 'var(--radius-md)'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Information - Using Form Fields Loop */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formFields.customer.map((field) => (
                        <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              value={bookingData.customer[field.name]}
                              onChange={(e) => handleInputChange('customer', field.name, e.target.value)}
                              rows={field.rows || 3}
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300 resize-none"
                              style={{ 
                                borderColor: 'var(--card-border)', 
                                borderRadius: 'var(--radius-md)'
                              }}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={bookingData.customer[field.name]}
                              onChange={(e) => handleInputChange('customer', field.name, e.target.value)}
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300"
                              placeholder={field.placeholder || ''}
                              style={{ 
                                borderColor: 'var(--card-border)', 
                                borderRadius: 'var(--radius-md)'
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 hover-scale"
                    style={{ 
                      borderRadius: 'var(--radius-md)', 
                      transition: 'var(--transition-normal)' 
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-3 rounded-lg hover-scale disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    style={{ 
                      background: 'var(--bg-gradient-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8 glass-effect" style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <h2 className="text-3xl font-bold mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <CreditCard className="w-8 h-8 mr-3" style={{ color: 'var(--primary-blue)' }} />
                  Payment Information
                </h2>
                
                {/* Booking Summary */}
                <div className="rounded-lg p-6 mb-8" style={{ 
                  background: 'var(--bg-gradient-secondary)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
                    Booking Summary
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Service', value: selectedService?.name },
                      { label: 'Date', value: bookingData.date },
                      { label: 'Time', value: bookingData.time },
                      { label: 'Vehicle', value: `${bookingData.vehicle.make} ${bookingData.vehicle.model}` }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>{item.label}:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{item.value}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span style={{ color: 'var(--text-dark)' }}>Total:</span>
                        <span style={{ color: 'var(--primary-blue)' }}>
                          {selectedService?.price > 0 ? `£${selectedService.price.toFixed(2)}` : 'Quote on request'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map(method => (
                        <div
                          key={method.id}
                          onClick={() => handleInputChange('payment', 'method', method.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            bookingData.payment.method === method.id
                              ? 'bg-blue-50'
                              : 'hover:border-blue-300'
                          }`}
                          style={{ 
                            borderColor: bookingData.payment.method === method.id ? 'var(--primary-blue)' : 'var(--card-border)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          <div className="flex items-center">
                            <div style={{ color: 'var(--primary-blue)' }}>{method.icon}</div>
                            <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{method.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Form Fields Loop */}
                  {bookingData.payment.method === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paymentFields.map(field => (
                        <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            value={bookingData.payment[field.name]}
                            onChange={(e) => handleInputChange('payment', field.name, e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-300"
                            placeholder={field.placeholder || ''}
                            style={{ 
                              borderColor: 'var(--card-border)', 
                              borderRadius: 'var(--radius-md)'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 hover-scale"
                    style={{ 
                      borderRadius: 'var(--radius-md)', 
                      transition: 'var(--transition-normal)' 
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-lg hover-scale text-white"
                    style={{ 
                      background: 'linear-gradient(to right, #10b981, #059669)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center glass-effect" style={{ 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" 
                     style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <CheckCircle className="w-12 h-12" style={{ color: '#10b981' }} />
                </div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Booking Confirmed!</h2>
                <p className="text-xl mb-8" style={{ color: 'var(--text-muted)' }}>
                  Your appointment has been successfully booked. We'll send you a confirmation email shortly.
                </p>
                <div className="rounded-lg p-6 mb-8" style={{ 
                  background: 'var(--bg-gradient-secondary)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
                    Appointment Details
                  </h3>
                  <div className="space-y-2 text-left">
                    {[
                      { label: 'Service', value: selectedService?.name },
                      { label: 'Date', value: bookingData.date },
                      { label: 'Time', value: bookingData.time },
                      { label: 'Vehicle', value: bookingData.vehicle.registration }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>{item.label}:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="px-8 py-3 rounded-lg hover-scale text-white"
                    style={{ 
                      background: 'var(--bg-gradient-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Return Home
                  </a>
                  <a
                    href="/my-account"
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 hover-scale"
                    style={{ 
                      borderRadius: 'var(--radius-md)', 
                      transition: 'var(--transition-normal)' 
                    }}
                  >
                    View My Bookings
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;