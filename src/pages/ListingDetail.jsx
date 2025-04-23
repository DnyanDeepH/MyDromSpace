
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Map,
  Wifi,
  Home,
  User,
  Star,
  MessageCircle,
  Phone,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import dummyListings from '@/data/dummyListings';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const ListingDetail = () => {
  const { listingId } = useParams();
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  
  // Load listing data and favorites
  useEffect(() => {
    // Find the listing in dummy data
    const foundListing = dummyListings.find(item => item.id === listingId);
    setListing(foundListing || null);
    setLoading(false);
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('dormspaceFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [listingId]);
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast("Please log in to save favorites");
      return;
    }
    
    if (favorites.includes(listingId)) {
      const newFavorites = favorites.filter(id => id !== listingId);
      setFavorites(newFavorites);
      localStorage.setItem('dormspaceFavorites', JSON.stringify(newFavorites));
      toast("Removed from favorites");
    } else {
      const newFavorites = [...favorites, listingId];
      setFavorites(newFavorites);
      localStorage.setItem('dormspaceFavorites', JSON.stringify(newFavorites));
      toast("Added to favorites");
    }
  };
  
  // Handle contact owner
  const handleContactOwner = () => {
    if (!isAuthenticated) {
      toast("Please log in to contact owners");
      return;
    }
    toast("Contact request sent to owner (simulated)");
  };
  
  // Navigation for image carousel
  const nextImage = () => {
    if (listing) {
      setActiveImageIndex((activeImageIndex + 1) % listing.images.length);
    }
  };
  
  const prevImage = () => {
    if (listing) {
      setActiveImageIndex((activeImageIndex - 1 + listing.images.length) % listing.images.length);
    }
  };
  
  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }
  
  if (!listing) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p>The listing you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const isFavorite = favorites.includes(listingId);
  const averageRating = calculateAverageRating(listing.reviews);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
        </Button>
        
        {/* Image Gallery */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="h-[400px] relative">
            <img 
              src={listing.images[activeImageIndex]} 
              alt={`Photo ${activeImageIndex + 1} of ${listing.title}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100"
              aria-label="Previous image"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100"
              aria-label="Next image"
            >
              <ArrowRight size={20} />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-white text-sm">
              {activeImageIndex + 1} / {listing.images.length}
            </div>
            
            {/* Price Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-dorm-600 text-white text-lg px-3 py-2">
                ${listing.price}/month
              </Badge>
            </div>
          </div>
          
          {/* Thumbnail Row */}
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {listing.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden ${
                  index === activeImageIndex ? 'ring-2 ring-dorm-600' : ''
                }`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <Button 
                variant="outline" 
                className={isFavorite ? 'text-red-500' : ''}
                onClick={handleFavoriteToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="ml-2">{isFavorite ? 'Saved' : 'Save'}</span>
              </Button>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <Map className="h-4 w-4 mr-1" />
              <span>
                {listing.location.address}, {listing.location.city}, {listing.location.state} {listing.location.zipCode}
              </span>
            </div>
            
            <div className="flex items-center mb-6 space-x-4">
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 fill-yellow-500" />
                <span className="ml-1 font-medium">{averageRating}</span>
                <span className="ml-1 text-gray-600">
                  ({listing.reviews.length} reviews)
                </span>
              </div>
              
              <Badge variant="outline" className="text-dorm-700 border-dorm-200 bg-dorm-50">
                {listing.roomType} Room
              </Badge>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">About This Space</h2>
              <p className="text-gray-700">{listing.description}</p>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-dorm-600 mr-2">
                      {amenity.toLowerCase().includes('wifi') ? (
                        <Wifi className="h-5 w-5" />
                      ) : (
                        <Home className="h-5 w-5" />
                      )}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* House Rules */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <ul className="space-y-2">
                {listing.houseRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 bg-dorm-600 rounded-full"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Reviews ({listing.reviews.length})
              </h2>
              
              <div className="space-y-6">
                {listing.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{review.author}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex items-center mb-2 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500' : ''}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              {/* Owner Info */}
              <div className="flex items-center mb-6">
                <img 
                  src={listing.owner.image} 
                  alt={listing.owner.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">Hosted by {listing.owner.name}</h3>
                  <p className="text-sm text-gray-500">
                    Response rate: {listing.owner.responseRate}
                  </p>
                </div>
              </div>
              
              {/* Contact Section */}
              <div className="space-y-4">
                <Button 
                  className="w-full flex items-center justify-center"
                  onClick={handleContactOwner}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Message Owner
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={handleContactOwner}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Request Phone Call
                </Button>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Available From</h4>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Immediate</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Room Type</h4>
                  <div className="flex items-center text-gray-600">
                    <User className="mr-2 h-5 w-5" />
                    <span>{listing.roomType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetail;
