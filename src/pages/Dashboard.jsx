
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PropertyCard from '@/components/listings/PropertyCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import dummyListings from '@/data/dummyListings';
import { X } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('dormspaceFavorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);

      // Get the full listing objects for favorites
      const favListings = dummyListings.filter(listing => 
        parsedFavorites.includes(listing.id)
      );
      setFavoriteListings(favListings);
    }
  }, [isAuthenticated, navigate]);

  // Handle favorite toggle
  const handleFavoriteToggle = (listingId) => {
    const newFavorites = favorites.filter(id => id !== listingId);
    setFavorites(newFavorites);
    localStorage.setItem('dormspaceFavorites', JSON.stringify(newFavorites));
    
    // Update the displayed favorite listings
    const updatedFavoriteListings = favoriteListings.filter(
      listing => listing.id !== listingId
    );
    setFavoriteListings(updatedFavoriteListings);
  };

  // Simulated booking data
  const bookings = [
    {
      id: 'booking-001',
      listingId: dummyListings[0].id,
      listing: dummyListings[0],
      status: 'confirmed',
      startDate: '2023-09-01',
      endDate: '2024-05-31',
      createdAt: '2023-06-15'
    },
    {
      id: 'booking-002',
      listingId: dummyListings[2].id,
      listing: dummyListings[2],
      status: 'pending',
      startDate: '2023-10-01',
      endDate: '2024-06-30',
      createdAt: '2023-07-22'
    }
  ];

  if (!isAuthenticated) {
    return null; // We're redirecting, no need to render anything
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
        </div>

        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name}!</h2>
          <div className="text-gray-700">
            <p>Your student dashboard gives you access to your saved favorites and booking requests.</p>
          </div>
        </div>

        <Tabs defaultValue="favorites" className="space-y-8">
          <TabsList className="w-full border-b border-gray-200">
            <TabsTrigger value="favorites" className="text-lg py-3">Saved Favorites</TabsTrigger>
            <TabsTrigger value="bookings" className="text-lg py-3">My Bookings</TabsTrigger>
            <TabsTrigger value="profile" className="text-lg py-3">Profile Settings</TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            {favoriteListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteListings.map(listing => (
                  <PropertyCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={true}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No saved favorites yet</h3>
                <p className="text-gray-600 mb-6">
                  Browse listings and save your favorites to find them here
                </p>
                <Button onClick={() => navigate('/listings')}>
                  Browse Listings
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map(booking => (
                  <div 
                    key={booking.id} 
                    className="p-6 bg-white rounded-lg shadow flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/4">
                      <img 
                        src={booking.listing.images[0]} 
                        alt={booking.listing.title} 
                        className="w-full h-40 md:h-32 object-cover rounded-md"
                      />
                    </div>

                    <div className="md:w-3/4 md:pl-6 mt-4 md:mt-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">
                          {booking.listing.title}
                        </h3>
                        <div 
                          className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>

                      <div className="text-gray-600 mt-2">
                        <p>{booking.listing.location.city}, {booking.listing.location.state}</p>
                        <p className="mt-1">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex mt-4 space-x-4">
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/listing/${booking.listingId}`)}
                        >
                          View Listing
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {}}
                        >
                          Contact Owner
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">
                  Once you request to book a property, you'll see it here
                </p>
                <Button onClick={() => navigate('/listings')}>
                  Find Rooms
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Your Profile Information</h2>
              
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
                      Account Type
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.type === 'student' ? 'Student' : 'Property Owner'}
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

export default Dashboard;
