import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CartDropdown from '../components/CartDropdown';

// API endpoints
const API_BOOKINGS = "https://backend-kzpz.onrender.com/api/paypal/bookings/";
const API_CREATE_ORDER = "https://backend-kzpz.onrender.com/api/paypal/create-order/";
const API_CAPTURE_PAYMENT = "https://backend-kzpz.onrender.com/api/paypal/capture-payment/";
const API_EMAIL_VERIFICATION = "https://backend-kzpz.onrender.com/api/email/verification/";
const API_BOOKING_REMINDER = "https://backend-kzpz.onrender.com/api/email/reminder/";
const API_SERVICES = "https://backend-kzpz.onrender.com/api/services/";

// Static list of services (frontend only, PKs must match your backend!)
const DEFAULT_SERVICES = [
  { id: 1, code: 'mot', name: 'MOT Test', price: 54.85, description: 'Official MOT testing for Class 4, 5 & 7 vehicles' },
  { id: 2, code: 'service', name: 'Full Service', price: 89.00, description: 'Complete vehicle health check and maintenance' },
  { id: 3, code: 'repair', name: 'Vehicle Repair', price: 0, description: 'Custom repair based on your vehicle needs' },
  { id: 4, code: 'brakes', name: 'Brake Service', price: 120.00, description: 'Brake inspection and replacement' },
  { id: 5, code: 'battery', name: 'Battery Service', price: 80.00, description: 'Battery testing and replacement' },
  { id: 6, code: 'clutch', name: 'Clutch Repair', price: 0, description: 'Clutch repair and replacement' },
  { id: 7, code: 'exhaust', name: 'Exhaust Service', price: 150.00, description: 'Exhaust system inspection and repair' },
  { id: 8, code: 'diagnostics', name: 'Vehicle Diagnostics', price: 45.00, description: 'Comprehensive diagnostic scan' }
];

const classOptions = [
  { label: 'MOT', price: 30 },
  { label: 'MOT IV', price: 45 },
  { label: 'MOT V', price: 49 },
  { label: 'MOT VII', price: 60 }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

function Booking() {
  useEffect(() => {
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const location = useLocation();
  const fromCart = location.state?.fromCart || false;

  // Now use fromCart in useState
  const [step, setStep] = useState(fromCart ? 2 : 1);
  const [paypalOrderId, setPaypalOrderId] = useState(null);
  const [bookingIds, setBookingIds] = useState([]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get cart from localStorage (not from state!)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Services state: start with defaults, then replace with backend data
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function fetchServices() {
      try {
        setServicesLoading(true);
        setServicesError('');
        const res = await fetch(API_SERVICES);
        if (!res.ok) {
          throw new Error(`Failed to load services (${res.status})`);
        }
        const data = await res.json();
        const incoming = Array.isArray(data?.results) ? data.results : [];
        // Only update if we have something and the component is still mounted
        if (isMounted && incoming.length > 0) {
          setServices(incoming);
        }
      } catch (err) {
        if (isMounted) {
          setServicesError(err.message || 'Failed to load services');
          // Keep DEFAULT_SERVICES as fallback
        }
      } finally {
        if (isMounted) setServicesLoading(false);
      }
    }
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);
  
  const [bookingData, setBookingData] = useState({
    service: '',
    motClass: '',
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
      method: 'paypal', // Changed default to PayPal
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');

  // Get JWT token from localStorage (optional - for authenticated users)
  const token = localStorage.getItem("access_token");

  // Auto-populate PayPal email with customer email when available
  useEffect(() => {
    if (bookingData.customer.email && !paypalEmail) {
      setPaypalEmail(bookingData.customer.email);
    }
  }, [bookingData.customer.email, paypalEmail]);

  // Utility for POST requests (with optional authentication)
  async function postWithAuth(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
  }

  // Utility for GET requests (with optional authentication)
  async function getWithAuth(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        ...(token && { "Authorization": `Bearer ${token}` })
      }
    });
  }

  const handleInputChange = (section, field, value) => {
    if (section) {
      setBookingData(prev => {
        const sectionData = { ...prev[section] };
        sectionData[field] = value;
        return {
          ...prev,
          [section]: sectionData
        };
      });
    } else {
      setBookingData(prev => {
        const newData = {
          ...prev,
          [field]: value
        };
        
        // If date is being changed, check if current time is still valid
        if (field === 'date' && value) {
          const selectedDate = new Date(value);
          const dayOfWeek = selectedDate.getDay();
          
          // Clear time if Sunday (closed) or if current time is not available for the new date
          if (dayOfWeek === 0) {
            newData.time = '';
          } else {
            const availableSlots = timeSlots.filter(time => {
              const hour = parseInt(time.split(':')[0]);
              if (dayOfWeek === 6) { // Saturday
                return hour >= 10 && hour < 17;
              } else { // Monday to Friday
                return hour >= 9 && hour < 18;
              }
            });
            
            // Clear time if current selection is not available for the new date
            if (prev.time && !availableSlots.includes(prev.time)) {
              newData.time = '';
            }
          }
        }
        
        return newData;
      });
    }
  };

  const nextStep = () => {
    setStep(prev => {
      const next = Math.min(prev + 1, 5);
      // Scroll to top when moving from step 1 to 2
      if (prev === 1 && next === 2) {
        scrollToTop();
      }
      return next;
    });
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Helper function to send email verification
  const sendEmailVerification = async (email, bookingDetails) => {
    try {
      const verificationPayload = {
        email: email,
        booking_details: bookingDetails,
        booking_url: window.location.origin + '/booking'
      };
      const response = await postWithAuth(API_EMAIL_VERIFICATION, verificationPayload);
      if (response.ok) {
        console.log('Email verification sent successfully');
      } else {
        console.warn('Email verification failed:', await response.text());
      }
    } catch (error) {
      console.warn('Email verification failed:', error);
    }
  };

  // Helper function to schedule 24h reminder
  const scheduleBookingReminder = async (email, bookingDetails, appointmentDateTime) => {
    try {
      const reminderPayload = {
        email: email,
        booking_details: bookingDetails,
        appointment_datetime: appointmentDateTime,
        booking_url: window.location.origin + '/booking'
      };
      const response = await postWithAuth(API_BOOKING_REMINDER, reminderPayload);
      if (response.ok) {
        console.log('Booking reminder scheduled successfully');
      } else {
        console.warn('Booking reminder scheduling failed:', await response.text());
      }
    } catch (error) {
      console.warn('Booking reminder scheduling failed:', error);
    }
  };

  // Create PayPal order with booking_id and customer_email
  const createPayPalOrder = async (booking_id, customer_email) => {
    try {
      const response = await postWithAuth(API_CREATE_ORDER, { 
        booking_id: booking_id,
        customer_email: customer_email
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create PayPal order');
      }
    } catch (error) {
      console.error('PayPal order creation failed:', error);
      throw error;
    }
  };

  // Capture PayPal payment
  const capturePayPalPayment = async (bookingId, paypalOrderId) => {
    try {
      const response = await postWithAuth(API_CAPTURE_PAYMENT, {
        booking_id: bookingId,
        paypal_order_id: paypalOrderId
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment capture failed');
      }
    } catch (error) {
      console.error('PayPal payment capture failed:', error);
      throw error;
    }
  };

  // Handle PayPal payment separately
  const handlePayPalPayment = async () => {
    if (!paypalEmail) {
      setBookingError('Please enter your email for PayPal payment');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      let bookingDetails = [];
      let createdBookingIds = [];
      
      // First, create the booking(s)
      if (fromCart && cart.length > 0) {
        // Submit each cart item as a separate booking
        for (let item of cart) {
          const matchedService = services.find(s => s.code === item.service_id || s.id === item.service_id);
          const pk = matchedService ? matchedService.id : null;
          const payload = {
            ...bookingData,
            service_id: pk,
            quantity: item.qty,
            price: item.price,
          };
          const bookingRes = await postWithAuth(API_BOOKINGS, payload);
          if (!bookingRes.ok) {
            throw new Error(await bookingRes.text());
          }
          
          const bookingData_response = await bookingRes.json();
          createdBookingIds.push(bookingData_response.id);
          
          // Add to booking details for email
          bookingDetails.push({
            service_name: item.name,
            price: item.price,
            quantity: item.qty,
            date: bookingData.date,
            time: bookingData.time,
            vehicle_registration: bookingData.vehicle.registration
          });
        }
      } else {
        // Single service flow
        const payload = {
          ...bookingData,
          service_id: bookingData.service,
          quantity: 1,
          price: selectedService?.code === 'mot' && bookingData.motClass ? motPrice : selectedService?.price,
        };
        const bookingRes = await postWithAuth(API_BOOKINGS, payload);
        if (!bookingRes.ok) {
          throw new Error(await bookingRes.text());
        }
        
        const bookingData_response = await bookingRes.json();
        createdBookingIds.push(bookingData_response.id);
        
        // Add to booking details for email
        bookingDetails.push({
          service_name: selectedService?.name,
          mot_class: selectedService?.code === 'mot' ? bookingData.motClass : null,
          price: selectedService?.code === 'mot' && bookingData.motClass ? motPrice : selectedService?.price,
          quantity: 1,
          date: bookingData.date,
          time: bookingData.time,
          vehicle_registration: bookingData.vehicle.registration
        });
      }

      // Store booking IDs for future use
      setBookingIds(createdBookingIds);

      // Send email verification
      await sendEmailVerification(bookingData.customer.email, bookingDetails);

      // Schedule 24-hour reminder
      const appointmentDateTime = `${bookingData.date}T${bookingData.time}:00`;
      await scheduleBookingReminder(bookingData.customer.email, bookingDetails, appointmentDateTime);

      // Now create PayPal order with booking_id and customer_email
      const orderData = await createPayPalOrder(createdBookingIds[0], paypalEmail);
      
      if (orderData && orderData.approval_url) {
        // Store PayPal order ID for later use
        setPaypalOrderId(orderData.order_id || orderData.id);
        
        // Redirect to PayPal for payment approval
        window.location.href = orderData.approval_url;
      } else {
        throw new Error('No approval URL received from PayPal');
      }
    } catch (error) {
      setBookingError('PayPal payment initiation failed: ' + error.message);
      setBookingLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');

    try {
      let bookingDetails = [];
      let createdBookingIds = [];
      
      if (fromCart && cart.length > 0) {
        // Submit each cart item as a separate booking
        for (let item of cart) {
          const matchedService = services.find(s => s.code === item.service_id || s.id === item.service_id);
          const pk = matchedService ? matchedService.id : null;
          const payload = {
            ...bookingData,
            service_id: pk,
            quantity: item.qty,
            price: item.price,
          };
          const bookingRes = await postWithAuth(API_BOOKINGS, payload);
          if (!bookingRes.ok) {
            throw new Error(await bookingRes.text());
          }
          
          const bookingData_response = await bookingRes.json();
          createdBookingIds.push(bookingData_response.id);
          
          // Add to booking details for email
          bookingDetails.push({
            service_name: item.name,
            price: item.price,
            quantity: item.qty,
            date: bookingData.date,
            time: bookingData.time,
            vehicle_registration: bookingData.vehicle.registration
          });
        }
      } else {
        // Single service flow
        const payload = {
          ...bookingData,
          service_id: bookingData.service,
          quantity: 1,
          price: selectedService?.code === 'mot' && bookingData.motClass ? motPrice : selectedService?.price,
        };
        const bookingRes = await postWithAuth(API_BOOKINGS, payload);
        if (!bookingRes.ok) {
          throw new Error(await bookingRes.text());
        }
        
        const bookingData_response = await bookingRes.json();
        createdBookingIds.push(bookingData_response.id);
        
        // Add to booking details for email
        bookingDetails.push({
          service_name: selectedService?.name,
          mot_class: selectedService?.code === 'mot' ? bookingData.motClass : null,
          price: selectedService?.code === 'mot' && bookingData.motClass ? motPrice : selectedService?.price,
          quantity: 1,
          date: bookingData.date,
          time: bookingData.time,
          vehicle_registration: bookingData.vehicle.registration
        });
      }

      // Store booking IDs for payment processing
      setBookingIds(createdBookingIds);

      // Send email verification (this is now handled automatically by the backend)
      await sendEmailVerification(bookingData.customer.email, bookingDetails);

      // Schedule 24-hour reminder (this is now handled automatically by the backend)
      const appointmentDateTime = `${bookingData.date}T${bookingData.time}:00`;
      await scheduleBookingReminder(bookingData.customer.email, bookingDetails, appointmentDateTime);

      // For PayPal payment, create PayPal order for the first booking
      if (bookingData.payment.method === 'paypal' && createdBookingIds.length > 0) {
        try {
          const orderId = await createPayPalOrder(createdBookingIds[0], bookingData.customer.email);
          setPaypalOrderId(orderId);
          
          // Here you would typically redirect to PayPal or show  buttons
          // For now, we'll simulate successful payment
          console.log('PayPal Order Created:', orderId);
          
          // Simulate payment completion (in real implementation, this would be handled by PayPal)
          setTimeout(async () => {
            try {
              setPaymentProcessing(true);
              await capturePayPalPayment(createdBookingIds[0], orderId);
              
              // Clear cart if booking from cart
              if (fromCart && cart.length > 0) {
                localStorage.removeItem('cart');
                setCart([]);
              }

              setBookingLoading(false);
              setPaymentProcessing(false);
              setStep(5);
              setBookingSuccess(true);
            } catch (paymentError) {
              setPaymentProcessing(false);
              setBookingError("Payment processing failed: " + paymentError.message);
              setBookingLoading(false);
            }
          }, 2000); // Simulate 2 second payment processing
          
        } catch (paypalError) {
          setBookingError("PayPal order creation failed: " + paypalError.message);
          setBookingLoading(false);
          return;
        }
      } else {
        // For cash payment, complete immediately
        if (fromCart && cart.length > 0) {
          localStorage.removeItem('cart');
          setCart([]);
        }

        setBookingLoading(false);
        setStep(5);
        setBookingSuccess(true);
      }

    } catch (err) {
      setBookingError("Booking creation failed: " + err.message);
      setBookingLoading(false);
    }
  };

  const isStepValid = () => {
    const selectedServiceObj = services.find(s => s.id === bookingData.service);
    return (
      (step === 1 && !!bookingData.service && (selectedServiceObj?.code !== 'mot' || !!bookingData.motClass)) ||
      (step === 2 && !!bookingData.date && !!bookingData.time) ||
      (step === 3 && !!bookingData.vehicle.make && !!bookingData.vehicle.model &&
        !!bookingData.vehicle.registration && !!bookingData.customer.firstName &&
        !!bookingData.customer.email && !!bookingData.customer.phone) ||
      (step === 4 && (bookingData.payment.method === 'cash' || 
        (bookingData.payment.method === 'paypal' && !!paypalEmail) ||
        (bookingData.payment.method === 'card' && !!bookingData.payment.cardNumber && 
          !!bookingData.payment.expiryDate && !!bookingData.payment.cvv && !!bookingData.payment.nameOnCard)))
    );
  };

  const selectedService = services.find(s => s.id === bookingData.service);
  const motClassOption = classOptions.find(opt => opt.label === bookingData.motClass);
  const motPrice = motClassOption ? motClassOption.price : selectedService?.price;

  // Filter time slots based on selected date
  const getAvailableTimeSlots = () => {
    if (!bookingData.date) return timeSlots;
    
    const selectedDate = new Date(bookingData.date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Sunday - closed
    if (dayOfWeek === 0) {
      return [];
    }
    
    // Saturday - 10:00 AM to 5:00 PM
    if (dayOfWeek === 6) {
      return timeSlots.filter(time => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 10 && hour < 17;
      });
    }
    
    // Monday to Friday - 9:00 AM to 6:00 PM
    return timeSlots.filter(time => {
      const hour = parseInt(time.split(':')[0]);
      return hour >= 9 && hour < 18;
    });
  };

  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div className="min-h-screen bg-gray-50">
      <CartDropdown />
      {/* Stepper UI */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Service</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Schedule your vehicle service appointment online. Quick, easy, and secure booking process.
          </p>
        </div>
      </section>
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-600">
              Step {step} of 4: {
                step === 1 ? 'Select Service' :
                  step === 2 ? 'Choose Date & Time' :
                    step === 3 ? 'Vehicle & Contact Details' :
                      'Payment Information'
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Form Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {bookingError && (
              <div className="mb-6 bg-red-100 text-red-700 rounded-lg px-4 py-3 font-semibold">
                {bookingError}
              </div>
            )}
            
            {paymentProcessing && (
              <div className="mb-6 bg-blue-100 text-blue-700 rounded-lg px-4 py-3 font-semibold">
                Processing payment... Please wait.
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  Select Your Service
                </h2>
                {servicesLoading && (
                  <div className="mb-4 bg-blue-50 text-blue-700 rounded-lg px-4 py-3 font-semibold">
                    Loading services...
                  </div>
                )}
                {servicesError && (
                  <div className="mb-4 bg-yellow-50 text-yellow-700 rounded-lg px-4 py-3">
                    Unable to load latest services. Showing defaults.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div
                      key={service.id}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        bookingData.service === service.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => {
                        setBookingData(prev => ({
                          ...prev,
                          service: service.id, // PK (number)
                          motClass: service.code === 'mot' ? prev.motClass : ''
                        }));
                      }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-sm mb-3">{service.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-blue-600">{service.price > 0 ? `£${service.price.toFixed(2)}` : 'Quote on request'}</span>
                      </div>
                      {service.code === 'mot' && bookingData.service === service.id && (
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select MOT Class</label>
                          <select
                            value={bookingData.motClass}
                            onClick={e => e.stopPropagation()}
                            onChange={e => handleInputChange(null, 'motClass', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select MOT Class</option>
                            {classOptions.map(option => (
                              <option key={option.label} value={option.label}>
                                {option.label} - £{option.price}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Choose Date & Time</h2>
                
                {/* Business Hours Information */}
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Our Opening Hours
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Monday:</span>
                        <span className="text-blue-700">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Tuesday:</span>
                        <span className="text-blue-700">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Wednesday:</span>
                        <span className="text-blue-700">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Thursday:</span>
                        <span className="text-blue-700">9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Friday:</span>
                        <span className="text-blue-700">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Saturday:</span>
                        <span className="text-blue-700">10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Sunday:</span>
                        <span className="text-red-600 font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Please select your preferred appointment time within our operating hours. 
                      We'll confirm availability and contact you if any adjustments are needed.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={e => handleInputChange(null, 'date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    {availableTimeSlots.length === 0 && bookingData.date ? (
                      <div className="w-full p-3 border border-red-300 rounded-lg bg-red-50 text-red-700 text-center">
                        We are closed on the selected date. Please choose a different day.
                      </div>
                    ) : (
                      <select
                        value={bookingData.time}
                        onChange={e => handleInputChange(null, 'time', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={availableTimeSlots.length === 0}
                      >
                        <option value="">
                          {bookingData.date ? 'Select Time' : 'Please select a date first'}
                        </option>
                        {availableTimeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Vehicle & Contact Details</h2>
                <div className="space-y-8">
                  {/* Vehicle Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                        <input
                          type="text"
                          value={bookingData.vehicle.make}
                          onChange={e => handleInputChange('vehicle', 'make', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Toyota"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        <input
                          type="text"
                          value={bookingData.vehicle.model}
                          onChange={e => handleInputChange('vehicle', 'model', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Corolla"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <input
                          type="number"
                          value={bookingData.vehicle.year}
                          onChange={e => handleInputChange('vehicle', 'year', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 2020"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration</label>
                        <input
                          type="text"
                          value={bookingData.vehicle.registration}
                          onChange={e => handleInputChange('vehicle', 'registration', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., AB12 CDE"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                        <input
                          type="number"
                          value={bookingData.vehicle.mileage}
                          onChange={e => handleInputChange('vehicle', 'mileage', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 50000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={bookingData.customer.firstName}
                          onChange={e => handleInputChange('customer', 'firstName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={bookingData.customer.lastName}
                          onChange={e => handleInputChange('customer', 'lastName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={bookingData.customer.email}
                          onChange={e => handleInputChange('customer', 'email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={bookingData.customer.phone}
                          onChange={e => handleInputChange('customer', 'phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                          value={bookingData.customer.address}
                          onChange={e => handleInputChange('customer', 'address', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Payment Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          bookingData.payment.method === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => handleInputChange('payment', 'method', 'paypal')}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">💳</div>
                          <div className="font-semibold">PayPal</div>
                          <div className="text-sm text-gray-600">Secure online payment</div>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          bookingData.payment.method === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => handleInputChange('payment', 'method', 'card')}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">💳</div>
                          <div className="font-semibold">Credit Card</div>
                          <div className="text-sm text-gray-600">Visa, MasterCard, etc.</div>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          bookingData.payment.method === 'cash' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => handleInputChange('payment', 'method', 'cash')}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">💷</div>
                          <div className="font-semibold">Cash</div>
                          <div className="text-sm text-gray-600">Pay on arrival</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {bookingData.payment.method === 'paypal' && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">PayPal Payment</h3>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Email for PayPal Payment
                          {bookingData.customer.email && (
                            <span className="text-xs text-blue-600 font-normal ml-2">(auto-filled from contact details)</span>
                          )}
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={e => setPaypalEmail(e.target.value)}
                          className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      <p className="text-blue-700 mb-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                      <button
                        onClick={handlePayPalPayment}
                        disabled={!paypalEmail || bookingLoading || paymentProcessing}
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                          paypalEmail && !bookingLoading && !paymentProcessing
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {bookingLoading || paymentProcessing ? 'Processing...' : 'Confirm and Pay with PayPal'}
                      </button>
                    </div>
                  )}

                  {bookingData.payment.method === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={bookingData.payment.cardNumber}
                          onChange={e => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={bookingData.payment.expiryDate}
                          onChange={e => handleInputChange('payment', 'expiryDate', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={bookingData.payment.cvv}
                          onChange={e => handleInputChange('payment', 'cvv', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={bookingData.payment.nameOnCard}
                          onChange={e => handleInputChange('payment', 'nameOnCard', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  {bookingData.payment.method === 'cash' && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Cash Payment</h3>
                      <p className="text-green-700">
                        You can pay in cash when you arrive for your appointment. Please bring the exact amount if possible.
                      </p>
                    </div>
                  )}
                </div>

                {/* Booking Summary */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                  {fromCart && cart.length > 0 ? (
                    <div className="space-y-2">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.name} x{item.qty}</span>
                          <span>£{(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-semibold">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span>£{cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{selectedService?.name}</span>
                        <span>£{(selectedService?.code === 'mot' && bookingData.motClass ? motPrice : selectedService?.price)?.toFixed(2)}</span>
                      </div>
                      {selectedService?.code === 'mot' && bookingData.motClass && (
                        <div className="text-sm text-gray-600">
                          MOT Class: {bookingData.motClass}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-4 text-sm text-gray-600">
                    <div>Date: {bookingData.date}</div>
                    <div>Time: {bookingData.time}</div>
                    <div>Vehicle: {bookingData.vehicle.make} {bookingData.vehicle.model} ({bookingData.vehicle.registration})</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 - Success */}
            {step === 5 && bookingSuccess && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl text-green-500 mb-6">✅</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Your booking has been successfully created and confirmation emails have been sent.
                </p>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">What happens next?</h3>
                  <ul className="text-green-700 text-left space-y-2">
                    <li>• You'll receive a booking confirmation email immediately</li>
                 
                    <li>• You'll receive a reminder email 24 hours before your appointment</li>
                    {bookingData.payment.method === 'paypal' && (
                      <li>• Your payment has been processed securely through PayPal</li>
                    )}
                    {bookingData.payment.method === 'cash' && (
                      <li>• Please bring cash payment on the day of your appointment</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Return to Home
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        setStep(1);
                        setBookingSuccess(false);
                        setBookingData({
                          service: '',
                          motClass: '',
                          date: '',
                          time: '',
                          vehicle: { make: '', model: '', year: '', registration: '', mileage: '' },
                          customer: { firstName: '', lastName: '', email: '', phone: '', address: '' },
                          payment: { method: 'paypal', cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' }
                        });
                      }}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    step === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      isStepValid()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  // Only show Confirm Booking button for non-PayPal payments
                  bookingData.payment.method !== 'paypal' && (
                    <button
                      onClick={handleSubmit}
                      disabled={!isStepValid() || bookingLoading || paymentProcessing}
                      className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                        isStepValid() && !bookingLoading && !paymentProcessing
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {bookingLoading || paymentProcessing ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
