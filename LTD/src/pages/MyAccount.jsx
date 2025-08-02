import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Car, 
  FileText, 
  Settings, 
  Bell,
  CreditCard,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
  Download,
  Shield,
  AlertCircle
} from 'lucide-react';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '01782 405229',
    address: '123 Main Street, London, UK'
  });

  const bookings = [
    {
      id: 'B001',
      service: 'MOT Test',
      date: '2024-02-15',
      time: '10:00',
      status: 'Confirmed',
      vehicle: 'Ford Focus - AB12 CDE',
      price: 54.85
    },
    {
      id: 'B002',
      service: 'Full Service',
      date: '2024-01-20',
      time: '14:00',
      status: 'Completed',
      vehicle: 'Ford Focus - AB12 CDE',
      price: 89.00
    },
    {
      id: 'B003',
      service: 'Brake Service',
      date: '2023-12-10',
      time: '09:30',
      status: 'Completed',
      vehicle: 'Ford Focus - AB12 CDE',
      price: 120.00
    }
  ];

  const vehicles = [
    {
      id: 'V001',
      make: 'Ford',
      model: 'Focus',
      year: 2019,
      registration: 'AB12 CDE',
      mileage: 45000,
      motExpiry: '2024-03-15',
      lastService: '2024-01-20'
    }
  ];

  const documents = [
    {
      id: 'D001',
      type: 'MOT Certificate',
      date: '2024-01-15',
      vehicle: 'AB12 CDE',
      status: 'Valid'
    },
    {
      id: 'D002',
      type: 'Service Receipt',
      date: '2024-01-20',
      vehicle: 'AB12 CDE',
      status: 'Available'
    },
    {
      id: 'D003',
      type: 'Invoice',
      date: '2023-12-10',
      vehicle: 'AB12 CDE',
      status: 'Available'
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: <User className="w-5 h-5 mr-3" /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-5 h-5 mr-3" /> },
    { id: 'vehicles', label: 'My Vehicles', icon: <Car className="w-5 h-5 mr-3" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5 mr-3" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5 mr-3" /> }
  ];

  const statsCards = [
    { 
      count: 3, 
      label: 'Total Bookings', 
      icon: <Calendar className="w-8 h-8 mx-auto mb-2" />, 
      bgColor: 'rgba(219, 234, 254, 0.5)',
      iconColor: 'var(--primary-blue)'
    },
    { 
      count: 1, 
      label: 'Registered Vehicles', 
      icon: <Car className="w-8 h-8 mx-auto mb-2" />, 
      bgColor: 'rgba(209, 250, 229, 0.5)',
      iconColor: '#10b981'
    },
    { 
      count: 3, 
      label: 'Documents', 
      icon: <FileText className="w-8 h-8 mx-auto mb-2" />, 
      bgColor: 'rgba(233, 213, 255, 0.5)',
      iconColor: '#8b5cf6'
    }
  ];

  const recentActivities = [
    { 
      title: 'MOT Test Booked',
      description: 'Scheduled for February 15, 2024 at 10:00 AM',
      icon: <Calendar className="w-6 h-6 mr-4" />,
      iconColor: 'var(--primary-blue)'
    },
    { 
      title: 'Service Completed',
      description: 'Full service completed on January 20, 2024',
      icon: <FileText className="w-6 h-6 mr-4" />,
      iconColor: '#10b981'
    }
  ];

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('User info updated:', userInfo);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return { bg: 'rgba(219, 234, 254, 0.5)', text: 'var(--primary-blue-dark)' };
      case 'Completed':
        return { bg: 'rgba(209, 250, 229, 0.5)', text: '#065f46' };
      case 'Cancelled':
        return { bg: 'rgba(254, 226, 226, 0.5)', text: '#b91c1c' };
      default:
        return { bg: 'rgba(229, 231, 235, 0.5)', text: '#1f2937' };
    }
  };

  // Form fields for settings
  const personalInfoFields = [
    { id: 'firstName', label: 'First Name', type: 'text', colSpan: 1 },
    { id: 'lastName', label: 'Last Name', type: 'text', colSpan: 1 },
    { id: 'email', label: 'Email Address', type: 'email', colSpan: 1 },
    { id: 'phone', label: 'Phone Number', type: 'tel', colSpan: 1 },
    { id: 'address', label: 'Address', type: 'textarea', rows: 3, colSpan: 2 }
  ];

  // Notification preferences
  const notificationPrefs = [
    {
      id: 'bookingReminders',
      icon: <Bell className="w-5 h-5 mr-3" />,
      title: 'Booking Reminders',
      description: 'Get reminded about upcoming appointments',
      defaultChecked: true
    },
    {
      id: 'emailUpdates',
      icon: <Mail className="w-5 h-5 mr-3" />,
      title: 'Email Updates',
      description: 'Receive service updates and promotions',
      defaultChecked: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-secondary)' }}>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ background: 'var(--bg-gradient-main)' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">My Account</h1>
          <p className="text-xl" style={{ color: 'var(--primary-blue-lighter)' }}>
            Manage your bookings, vehicles, and account information
          </p>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 glass-effect rounded-lg shadow-lg p-6" style={{ 
                background: 'white', 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--card-border)'
              }}>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                       style={{ 
                         background: 'var(--primary-blue-lighter)',
                         color: 'var(--primary-blue)'
                       }}>
                    <User className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-dark)' }}>
                    {userInfo.firstName} {userInfo.lastName}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>{userInfo.email}</p>
                </div>
                
                <nav className="space-y-2">
                  {navigationItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === item.id ? 'text-white' : ''
                      }`}
                      style={{
                        background: activeTab === item.id ? 'var(--bg-gradient-card)' : 'transparent',
                        color: activeTab === item.id ? 'white' : 'var(--text-muted)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                    background: 'white', 
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--card-border)'
                  }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
                      Account Overview
                    </h2>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {statsCards.map((stat, index) => (
                        <div key={index} className="rounded-lg p-6 text-center" style={{ 
                          background: stat.bgColor,
                          borderRadius: 'var(--radius-md)'
                        }}>
                          <div style={{ color: stat.iconColor }}>{stat.icon}</div>
                          <div className="text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>{stat.count}</div>
                          <div style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-center p-4 rounded-lg" style={{ 
                            background: 'rgba(243, 244, 246, 0.5)',
                            borderRadius: 'var(--radius-md)'
                          }}>
                            <div style={{ color: activity.iconColor }}>{activity.icon}</div>
                            <div>
                              <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>{activity.title}</p>
                              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                  background: 'white', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--card-border)'
                }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>My Bookings</h2>
                    <a
                      href="/booking"
                      className="px-6 py-2 rounded-lg hover-scale text-white"
                      style={{ 
                        background: 'var(--bg-gradient-card)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'var(--transition-normal)'
                      }}
                    >
                      New Booking
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const statusStyle = getStatusColor(booking.status);
                      return (
                        <div key={booking.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300" 
                             style={{ 
                               borderColor: 'var(--card-border)',
                               borderRadius: 'var(--radius-md)'
                             }}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-dark)' }}>{booking.service}</h3>
                              <p style={{ color: 'var(--text-muted)' }}>{booking.vehicle}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ 
                              background: statusStyle.bg,
                              color: statusStyle.text,
                              borderRadius: 'var(--radius-full)'
                            }}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-2" />
                              £{booking.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button className="text-sm font-semibold" style={{ color: 'var(--primary-blue)' }}>
                              View Details
                            </button>
                            {booking.status === 'Confirmed' && (
                              <button className="text-sm font-semibold text-red-600 hover:text-red-800">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Vehicles Tab */}
              {activeTab === 'vehicles' && (
                <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                  background: 'white', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--card-border)'
                }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>My Vehicles</h2>
                    <button 
                      className="px-6 py-2 rounded-lg hover-scale text-white"
                      style={{ 
                        background: 'var(--bg-gradient-card)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'var(--transition-normal)'
                      }}
                    >
                      Add Vehicle
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300" 
                           style={{ 
                             borderColor: 'var(--card-border)',
                             borderRadius: 'var(--radius-md)'
                           }}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-dark)' }}>
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-lg font-mono" style={{ color: 'var(--text-muted)' }}>
                              {vehicle.registration}
                            </p>
                          </div>
                          <button style={{ color: 'var(--primary-blue)' }}>
                            <Edit className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span style={{ color: 'var(--text-muted)' }}>Mileage:</span>
                            <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>
                              {vehicle.mileage.toLocaleString()} miles
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)' }}>MOT Expires:</span>
                            <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>{vehicle.motExpiry}</p>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)' }}>Last Service:</span>
                            <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>{vehicle.lastService}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-4">
                          <a
                            href="/booking"
                            className="px-4 py-2 rounded text-sm text-white"
                            style={{ 
                              background: 'var(--bg-gradient-card)',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            Book Service
                          </a>
                          <button className="text-sm font-semibold" style={{ color: 'var(--primary-blue)' }}>
                            View History
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                  background: 'white', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--card-border)'
                }}>
                  <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>My Documents</h2>
                  
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300" 
                           style={{ 
                             borderColor: 'var(--card-border)',
                             borderRadius: 'var(--radius-md)'
                           }}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="w-8 h-8 mr-4" style={{ color: 'var(--primary-blue)' }} />
                            <div>
                              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>{doc.type}</h3>
                              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {doc.vehicle} • {doc.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ 
                              background: doc.status === 'Valid' ? 'rgba(209, 250, 229, 0.5)' : 'rgba(219, 234, 254, 0.5)',
                              color: doc.status === 'Valid' ? '#065f46' : 'var(--primary-blue-dark)',
                              borderRadius: 'var(--radius-full)'
                            }}>
                              {doc.status}
                            </span>
                            <button style={{ color: 'var(--primary-blue)' }} className="p-2">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button style={{ color: 'var(--primary-blue)' }} className="p-2">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                    background: 'white', 
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--card-border)'
                  }}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>Personal Information</h2>
                      <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="px-6 py-2 rounded-lg hover-scale text-white"
                        style={{ 
                          background: 'var(--bg-gradient-card)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-md)',
                          transition: 'var(--transition-normal)'
                        }}
                      >
                        {isEditing ? 'Save Changes' : 'Edit'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {personalInfoFields.map(field => (
                        <div key={field.id} className={field.colSpan === 2 ? 'md:col-span-2' : ''}>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              value={userInfo[field.id]}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              disabled={!isEditing}
                              rows={field.rows || 3}
                              className="w-full px-4 py-3 border rounded-lg transition-all duration-300 disabled:bg-gray-50 resize-none"
                              style={{ 
                                borderColor: 'var(--card-border)', 
                                borderRadius: 'var(--radius-md)'
                              }}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={userInfo[field.id]}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border rounded-lg transition-all duration-300 disabled:bg-gray-50"
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

                  {/* Notification Preferences */}
                  <div className="glass-effect rounded-lg shadow-lg p-8" style={{ 
                    background: 'white', 
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--card-border)'
                  }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>Notification Preferences</h3>
                    <div className="space-y-4">
                      {notificationPrefs.map((pref, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div style={{ color: 'var(--primary-blue)' }}>{pref.icon}</div>
                            <div>
                              <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>{pref.title}</p>
                              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{pref.description}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={pref.defaultChecked} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                              background: 'var(--card-border)',
                            }}></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;