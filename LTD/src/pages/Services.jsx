import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Wrench, 
  Settings, 
  Car, 
  Battery, 
  Zap, 
  Wind, 
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'mot',
      icon: <Shield className="w-16 h-16" />,
      title: "MOT Testing",
      description: "Official MOT testing for Class 4, 5 & 7 vehicles. We are an approved MOT testing station providing comprehensive vehicle safety checks.",
      features: ["Class 4 (Cars)", "Class 5 (Private Passenger Vehicles)", "Class 7 (Commercial Vehicles)", "Immediate Results", "Re-test Available"],
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £54.85"
    },
    {
      id: 'repairs',
      icon: <Wrench className="w-16 h-16" />,
      title: "Vehicle Repairs",
      description: "Comprehensive mechanical repairs across all vehicle makes and models. Our experienced technicians handle everything from minor fixes to major overhauls.",
      features: ["All Makes & Models", "Engine Repairs", "Transmission Work", "Electrical Systems", "Diagnostic Services"],
      image: "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "Quote on Request"
    },
    {
      id: 'servicing',
      icon: <Settings className="w-16 h-16" />,
      title: "Regular Servicing",
      description: "Complete vehicle servicing to keep your car running smoothly and efficiently. Regular maintenance prevents costly repairs.",
      features: ["Oil & Filter Change", "Brake Inspection", "Tire Check", "Fluid Top-ups", "Multi-point Inspection"],
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £89"
    },
    {
      id: 'brakes',
      icon: <Car className="w-16 h-16" />,
      title: "Brake Services",
      description: "Professional brake inspection, repair and replacement services. Your safety is our priority with comprehensive brake system care.",
      features: ["Brake Pad Replacement", "Disc Replacement", "Brake Fluid Change", "Brake System Inspection", "Emergency Brake Repair"],
      image: "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £120"
    },
    {
      id: 'batteries',
      icon: <Battery className="w-16 h-16" />,
      title: "Battery Services",
      description: "Battery testing, replacement and charging system diagnostics. Keep your vehicle starting reliably in all conditions.",
      features: ["Battery Testing", "Battery Replacement", "Charging System Check", "Alternator Testing", "Jump Start Service"],
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £80"
    },
    {
      id: 'clutches',
      icon: <Zap className="w-16 h-16" />,
      title: "Clutch Repairs",
      description: "Expert clutch repair and replacement for all vehicle types. Smooth gear changes and reliable performance guaranteed.",
      features: ["Clutch Replacement", "Clutch Adjustment", "Flywheel Services", "Hydraulic System Repair", "Performance Upgrades"],
      image: "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £450"
    },
    {
      id: 'exhaust',
      icon: <Wind className="w-16 h-16" />,
      title: "Exhaust Systems",
      description: "Complete exhaust system services including repairs, replacements and performance upgrades for optimal vehicle performance.",
      features: ["Exhaust Repair", "System Replacement", "Catalytic Converter", "Silencer Replacement", "Performance Exhausts"],
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £150"
    },
    {
      id: 'diagnostics',
      icon: <Search className="w-16 h-16" />,
      title: "Vehicle Diagnostics",
      description: "Advanced diagnostic services using the latest equipment to identify and resolve vehicle issues quickly and accurately.",
      features: ["Engine Diagnostics", "Electronic Systems", "Fault Code Reading", "Performance Analysis", "Pre-MOT Checks"],
      image: "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £45"
    },
    {
      id: 'dpf',
      icon: <Filter className="w-16 h-16" />,
      title: "DPF Cleaning",
      description: "Professional DPF (Diesel Particulate Filter) cleaning and regeneration services to restore your diesel vehicle's performance.",
      features: ["DPF Cleaning", "Filter Regeneration", "System Testing", "Replacement Service", "Performance Restoration"],
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "From £200"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "MOT Approved",
      description: "Official testing station with certified technicians"
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Expert Technicians",
      description: "Qualified professionals with years of experience"
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Quality Guaranteed",
      description: "All work comes with comprehensive warranty"
    },
    {
      icon: <Settings className="w-10 h-10" />,
      title: "Modern Equipment",
      description: "Latest diagnostic tools and equipment"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Comprehensive automotive services for all makes and models. 
            Professional care with exceptional customer service and integrity.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="glass-effect rounded-lg overflow-hidden hover-scale transition-all duration-300"
                style={{ 
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: 'rgba(30, 64, 175, 0.2)' }}></div>
                  <div className="absolute top-4 left-4 text-white">
                    {service.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>{service.title}</h3>
                    <span className="text-lg font-semibold" style={{ color: 'var(--primary-blue)' }}>{service.price}</span>
                  </div>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/booking"
                    className="w-full py-3 px-6 rounded-lg text-center block font-semibold text-white hover-scale"
                    style={{ 
                      background: 'var(--bg-gradient-card)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Why Choose Our Services?</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              We combine expertise, quality parts, and exceptional service to keep your vehicle running at its best
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center hover-scale transition-all duration-300">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                     style={{ 
                       background: 'var(--primary-blue-lighter)',
                       color: 'var(--primary-blue)'
                     }}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>{benefit.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Service Quote?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Contact us today for a personalized quote on any of our services. 
            We're here to help keep your vehicle running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 hover-scale"
              style={{ 
                color: 'var(--primary-blue-dark)',
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-normal)'
              }}
            >
              Book Service
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover-scale"
              style={{ 
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-normal)'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-blue-dark)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;