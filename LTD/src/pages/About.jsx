import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Star,
  Car,
  Wrench,
  Heart
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "5000+", label: "Vehicles Serviced" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Emergency Support" }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Integrity",
      description: "We believe in honest, transparent service with no hidden costs or unnecessary work."
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Quality",
      description: "We use only the best parts and equipment to ensure lasting repairs and service."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen, understand, and deliver exceptional service."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Reliability",
      description: "Dependable service you can count on, delivered on time, every time."
    }
  ];

  const team = [
    {
      name: "John Smith",
      role: "Master Technician & Owner",
      experience: "20+ years",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      specialties: ["MOT Testing", "Engine Diagnostics", "Electrical Systems"]
    },
    {
      name: "Mike Johnson",
      role: "Senior Mechanic",
      experience: "15+ years",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      specialties: ["Brake Systems", "Suspension", "Transmission"]
    },
    {
      name: "Sarah Williams",
      role: "Service Advisor",
      experience: "8+ years",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      specialties: ["Customer Service", "Parts Ordering", "Scheduling"]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section style={{ background: 'var(--bg-gradient-main)' }} className="text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">About Access Auto Services</h1>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--primary-blue-lighter)' }}>
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
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Our garage facility"
                className="rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg" style={{ 
                background: 'var(--primary-blue)',
                opacity: 0.1
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
                  {stat.number}
                </div>
                <div className="font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20" style={{ background: 'var(--bg-gradient-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Our Story</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
                src="https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Mechanic working on vehicle"
                className="rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-6 -right-6 text-white p-6 rounded-lg shadow-lg" 
                   style={{ background: 'var(--bg-gradient-card)' }}>
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <div className="font-bold">MOT Approved</div>
                    <div className="text-sm" style={{ color: 'var(--primary-blue-lighter)' }}>Official Testing Station</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Our Values</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              The principles that guide everything we do at Access Auto Services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <div className="mb-4 flex justify-center" style={{ color: 'var(--primary-blue)' }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  {value.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20" style={{ background: 'var(--bg-gradient-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Meet Our Team</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Experienced professionals dedicated to providing exceptional automotive service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl glass-effect"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ 
                    background: 'var(--primary-blue)',
                    opacity: 0.2
                  }}></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>{member.name}</h3>
                  <p className="font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>{member.role}</p>
                  <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{member.experience} experience</p>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            background: 'var(--primary-blue-lighter)', 
                            color: 'var(--primary-blue-dark)' 
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Approvals */}
      <section className="py-20 text-white" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Certifications & Approvals</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
              We maintain the highest standards through official certifications and ongoing training
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MOT Approved</h3>
              <p style={{ color: 'var(--primary-blue-lighter)' }}>Official MOT testing station for Class 4, 5 & 7 vehicles</p>
            </div>
            
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Certified</h3>
              <p style={{ color: 'var(--primary-blue-lighter)' }}>All technicians hold relevant industry qualifications</p>
            </div>
            
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p style={{ color: 'var(--primary-blue-lighter)' }}>Comprehensive quality management systems in place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Experience the Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Join thousands of satisfied customers who trust Access Auto Services 
            for their vehicle maintenance and repair needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-300 text-white"
              style={{ 
                background: 'var(--bg-gradient-card)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Book Service
            </Link>
            <Link
              to="/services"
              className="border-2 px-8 py-4 rounded-lg text-lg font-semibold hover:text-white transform hover:scale-105 transition-all duration-300"
              style={{ 
                borderColor: 'var(--primary-blue)',
                borderRadius: 'var(--radius-md)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-blue)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
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