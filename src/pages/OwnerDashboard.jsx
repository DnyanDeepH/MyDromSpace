
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import dummyListings from '@/data/dummyListings';
import { Plus, Edit, Trash, Eye, Home, MapPin, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const OwnerDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If authenticated but not an owner, redirect to student dashboard
    if (isAuthenticated && user?.type !== 'owner') {
      navigate('/dashboard');
      return;
    }

    // For demo purposes, we'll set a few dummy listings as "owned" by this user
    setMyListings(dummyListings.slice(0, 3));
  }, [isAuthenticated, user, navigate]);

  // Handle delete listing
  const handleDeleteListing = (listingId) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const updatedListings = myListings.filter(listing => listing.id !== listingId);
      setMyListings(updatedListings);
      toast('Listing deleted successfully');
    }
  };

  // Simulated booking requests
  const bookingRequests = [
    {
      id: 'request-001',
      listingId: dummyListings[0].id,
      listing: dummyListings[0],
      studentName: 'Michael Chen',
      studentEmail: 'michael.chen@example.com',
      message: "Hi, I'm interested in renting this room for the upcoming semester. Is it still available? I'd like to schedule a viewing.",
      createdAt: '2023-07-15'
    },
    {
      id: 'request-002',
      listingId: dummyListings[2].id,
      listing: dummyListings[2],
      studentName: 'Sarah Johnson',
      studentEmail: 'sarah.j@example.com',
      message: "Hello, I'm a graduate student looking for a quiet place to stay. Your listing looks perfect. Can we discuss more details?",
      createdAt: '2023-07-20'
    }
  ];

  // Stats for the dashboard
  const stats = [
    { 
      title: 'Total Listings',
      value: myListings.length,
      icon: Home,
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      title: 'Active Requests',
      value: bookingRequests.length,
      icon: User,
      color: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Total Views',
      value: 142,
      icon: Eye,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  if (!isAuthenticated || user?.type !== 'owner') {
    return null; // We're redirecting, no need to render anything
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <Button onClick={() => navigate('/owner/listings/new')}>
            <Plus size={16} className="mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="listings" className="space-y-8">
          <TabsList className="w-full border-b border-gray-200">
            <TabsTrigger value="listings" className="text-lg py-3">My Listings</TabsTrigger>
            <TabsTrigger value="requests" className="text-lg py-3">Booking Requests</TabsTrigger>
            <TabsTrigger value="profile" className="text-lg py-3">Profile Settings</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            {myListings.length > 0 ? (
              <div className="space-y-6">
                {myListings.map(listing => (
                  <div 
                    key={listing.id} 
                    className="p-6 bg-white rounded-lg shadow flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/4">
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title} 
                        className="w-full h-40 md:h-32 object-cover rounded-md"
                      />
                    </div>

                    <div className="md:w-3/4 md:pl-6 mt-4 md:mt-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">
                          {listing.title}
                        </h3>
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Active
                        </div>
                      </div>

                      <div className="text-gray-600 mt-2 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>
                          {listing.location.city}, {listing.location.state}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span className="font-semibold">${listing.price}</span> /month
                      </div>

                      <div className="flex mt-4 space-x-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => navigate(`/listing/${listing.id}`)}
                        >
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => navigate(`/owner/listings/${listing.id}/edit`)}
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700 hover:border-red-700"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Trash size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-6">
                  Add your first property to start finding student tenants
                </p>
                <Button onClick={() => navigate('/owner/listings/new')}>
                  <Plus size={16} className="mr-2" />
                  Add Listing
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Booking Requests Tab */}
          <TabsContent value="requests">
            {bookingRequests.length > 0 ? (
              <div className="space-y-6">
                {bookingRequests.map(request => (
                  <div 
                    key={request.id} 
                    className="p-6 bg-white rounded-lg shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img 
                          src={request.listing.images[0]} 
                          alt={request.listing.title} 
                          className="w-full h-40 md:h-32 object-cover rounded-md"
                        />
                      </div>

                      <div className="md:w-3/4 md:pl-6 mt-4 md:mt-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">
                            Request for: {request.listing.title}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="font-medium">{request.studentName}</p>
                          <p className="text-gray-600">{request.studentEmail}</p>
                        </div>

                        <div className="mt-3 bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-700">{request.message}</p>
                        </div>

                        <div className="flex mt-4 space-x-4">
                          <Button 
                            size="sm" 
                            onClick={() => {
                              toast('Request accepted (simulated)');
                            }}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              toast('Message sent to student (simulated)');
                            }}
                          >
                            Contact Student
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:text-red-700 hover:border-red-700"
                            onClick={() => {
                              toast('Request declined (simulated)');
                            }}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No booking requests yet</h3>
                <p className="text-gray-600">
                  When students request to book your properties, they'll appear here
                </p>
              </div>
            )}
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Owner Profile Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.name || ''}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value="(555) 123-4567"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Me (Shown to Students)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-none"
                    value="I'm a property owner with several student accommodations near major universities. I pride myself on maintaining clean, safe, and comfortable spaces for students."
                    readOnly
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <Button>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OwnerDashboard;
