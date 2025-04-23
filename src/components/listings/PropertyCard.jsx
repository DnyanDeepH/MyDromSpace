
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Wifi, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PropertyCard = ({ listing, onFavoriteToggle, isFavorite = false }) => {
  const { isAuthenticated } = useAuth();
  
  // Function to render stars based on average rating
  const renderRating = () => {
    // Calculate average rating
    if (!listing.reviews || listing.reviews.length === 0) return null;
    
    const avgRating = listing.reviews.reduce((acc, review) => acc + review.rating, 0) / listing.reviews.length;
    
    return (
      <div className="flex items-center text-yellow-500">
        <Star className="h-4 w-4 fill-yellow-500" />
        <span className="ml-1 text-sm font-medium">{avgRating.toFixed(1)}</span>
        <span className="ml-1 text-xs text-gray-500">({listing.reviews.length})</span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/listing/${listing.id}`}>
          <img 
            src={listing.images[0]} 
            alt={listing.title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {isAuthenticated && (
          <button 
            onClick={() => onFavoriteToggle(listing.id)}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
          </button>
        )}
        
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-dorm-600">{listing.price}/month</Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/listing/${listing.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
        </Link>
        
        <div className="flex items-center text-gray-500 mt-1">
          <span className="truncate">{listing.location.city}, {listing.location.state}</span>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.roomType}</span>
            </div>
            {listing.amenities.includes('WiFi') && (
              <div className="flex items-center text-gray-600">
                <Wifi className="h-4 w-4 mr-1" />
                <span className="text-sm">WiFi</span>
              </div>
            )}
          </div>
          
          {renderRating()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
