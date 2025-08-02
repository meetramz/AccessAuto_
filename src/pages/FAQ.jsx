import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, AlertTriangle,  Calendar } from 'lucide-react';


const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      category: "MOT Testing",
      icon: <Calendar className="w-6 h-6" />,
      questions: [
        {
          question: "What is an MOT test?",
          answer: "An MOT test is an annual test of vehicle safety, roadworthiness aspects and exhaust emissions. It's required by law for most vehicles over 3 years old in the UK."
        },
        {
          question: "How long does an MOT test take?",
          answer: "A standard MOT test typically takes 45-60 minutes. However, this can vary depending on the vehicle type and any issues that need to be addressed."
        },
        {
          question: "What happens if my car fails the MOT?",
          answer: "If your car fails the MOT, you'll receive a failure certificate listing the reasons. You can drive your car away if your current MOT hasn't expired, but you must fix the issues before driving if it has expired."
        },
        {
          question: "Can I drive my car if the MOT has expired?",
          answer: "No, it's illegal to drive a car without a valid MOT certificate unless you're driving to a pre-booked MOT test or to a garage for repairs."
        }
      ]
    },
    {
      category: "Services & Repairs",
      
      questions: [
        {
          question: "Do you service all makes and models?",
          answer: "Yes, we provide comprehensive servicing and repairs for all vehicle makes and models. Our experienced technicians are trained to work on various vehicle types."
        },
        {
          question: "How often should I service my car?",
          answer: "Generally, cars should be serviced every 6 months or 6,000 miles, whichever comes first. However, this can vary based on your vehicle's manufacturer recommendations and driving conditions."
        },
        {
          question: "Do you provide warranties on your work?",
          answer: "Yes, all our work comes with a comprehensive warranty. Parts typically have a 12-month warranty, and labor is guaranteed for 6 months."
        },
        {
          question: "Can you provide a quote before starting work?",
          answer: "Absolutely. We always provide detailed quotes before beginning any work. We believe in transparent pricing with no hidden costs."
        }
      ]
    },
    {
      category: "Booking & Appointments",
      icon: <Calendar className="w-6 h-6" />,
      questions: [
        {
          question: "How do I book an appointment?",
          answer: "You can book an appointment online through our booking system, call us at 01782 405229, or visit our garage in person."
        },
        {
          question: "Can I get a same-day appointment?",
          answer: "We try to accommodate same-day appointments when possible, especially for urgent repairs. Please call us to check availability."
        },
        {
          question: "What should I bring to my appointment?",
          answer: "Please bring your vehicle registration documents, previous MOT certificate (if applicable), and any relevant service history."
        },
        {
          question: "Can I wait while my car is being serviced?",
          answer: "Yes, we have a comfortable waiting area with refreshments. For longer services, we can also arrange alternative transport if needed."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      icon: <HelpCircle className="w-6 h-6" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, all major credit and debit cards, and bank transfers. We also offer payment plans for larger repairs."
        },
        {
          question: "Are your prices competitive?",
          answer: "Yes, we offer competitive pricing while maintaining high-quality service. We provide detailed quotes so you know exactly what you're paying for."
        },
        {
          question: "Do you offer any discounts?",
          answer: "We offer various discounts including senior citizen discounts, student discounts, and loyalty rewards for regular customers."
        },
        {
          question: "Is there a call-out charge for diagnostics?",
          answer: "Our diagnostic service starts from £45. If you proceed with the recommended repairs, this fee is often deducted from the final bill."
        }
      ]
    },
    {
      category: "Emergency Services",
      icon: <AlertTriangle className="w-6 h-6" />,
      questions: [
        {
          question: "Do you offer emergency breakdown services?",
          answer: "Yes, we provide emergency breakdown services. Call our emergency line at 07700 900 123 for immediate assistance."
        },
        {
          question: "Are you open on weekends for emergencies?",
          answer: "While our regular hours are Monday-Saturday, we do provide emergency services outside normal hours for urgent situations."
        },
        {
          question: "What should I do if my car breaks down?",
          answer: "First, ensure you're in a safe location. Then call our emergency line. If possible, move your vehicle to a safe area and turn on hazard lights."
        }
      ]
    }
  ];

  const tips = [
    {
      title: "Regular Maintenance",
      description: "Regular servicing can prevent costly repairs and extend your vehicle's lifespan.",
      icon: <Calendar className="w-6 h-6 mb-3" />
    },
    {
      title: "MOT Preparation",
      description: "Check lights, tires, and fluid levels before your MOT to avoid common failures.",
      icon: <AlertTriangle className="w-6 h-6 mb-3" />
    },
    {
      title: "Warning Signs",
      description: "Don't ignore unusual noises, vibrations, or warning lights - address them early.",
      icon: <AlertTriangle className="w-6 h-6 mb-3" />
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ background: 'var(--bg-gradient-main )' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Find answers to common questions about our services, MOT testing, and vehicle maintenance
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12" style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border text-lg"
                style={{ 
                  borderColor: 'var(--card-border)', 
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-dark)',
                  transition: 'var(--transition-normal)'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px var(--primary-blue-lighter)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 glass-effect" style={{ 
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <HelpCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                  No results found
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Try adjusting your search terms or browse all categories below.
                </p>
              </div>
            ) : (
              filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-3xl font-bold mb-8 pb-2 flex items-center" 
                      style={{ 
                        color: 'var(--text-dark)',
                        borderBottom: `2px solid var(--primary-blue)`
                      }}
                  >
                    <span className="mr-3" style={{ color: 'var(--primary-blue)' }}>
                      {category.icon}
                    </span>
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemKey = `${categoryIndex}-${index}`;
                      return (
                        <div
                          key={itemKey}
                          className="glass-effect overflow-hidden"
                          style={{ 
                            background: 'white',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: openItems[itemKey] ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                            border: '1px solid var(--card-border)',
                            transition: 'var(--transition-normal)'
                          }}
                        >
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center"
                            style={{ 
                              background: openItems[itemKey] ? 'rgba(219, 234, 254, 0.3)' : 'white',
                              transition: 'var(--transition-normal)'
                            }}
                            onMouseOver={(e) => {
                              if (!openItems[itemKey]) {
                                e.currentTarget.style.background = 'rgba(243, 244, 246, 0.5)';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!openItems[itemKey]) {
                                e.currentTarget.style.background = 'white';
                              }
                            }}
                          >
                            <h3 className="text-lg font-semibold pr-4" style={{ color: 'var(--text-dark)' }}>
                              {faq.question}
                            </h3>
                            {openItems[itemKey] ? (
                              <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary-blue)' }} />
                            ) : (
                              <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary-blue)' }} />
                            )}
                          </button>
                          {openItems[itemKey] && (
                            <div className="px-6 pb-4">
                              <div className="border-t pt-4" style={{ borderColor: 'var(--card-border)' }}>
                                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 text-white" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="hover-scale px-8 py-4 text-lg font-semibold"
              style={{ 
                background: 'white',
                color: 'var(--primary-blue-dark)',
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-normal)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              Contact Us
            </a>
            <a
              href="tel:01782405229"
              className="hover-scale px-8 py-4 text-lg font-semibold"
              style={{ 
                border: '2px solid white',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-normal)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--primary-blue-dark)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Call: 01782 405229
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Quick Tips</h2>
            <p className="text-xl" style={{ color: 'var(--text-muted)' }}>
              Helpful advice to keep your vehicle running smoothly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div 
                key={index} 
                className="hover-scale p-6"
                style={{ 
                  background: 'var(--bg-gradient-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--card-border)',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ color: 'var(--primary-blue)' }}>{tip.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>{tip.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;