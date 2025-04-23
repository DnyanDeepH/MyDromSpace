
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SearchFilters from '@/components/listings/SearchFilters';
import PropertyCard from '@/components/listings/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import dummyListings from '@/data/dummyListings';

const Listings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchLocation = queryParams.get('location') || '';
  
  const [searchInput, setSearchInput] = useState(initialSearchLocation);
  const [filteredListings, setFilteredListings] = useState(dummyListings);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [300, 1000],
    roomType: 'any',
    amenities: {
      wifi: false,
      kitchen: false,
      laundry: false,
      parking: false,
      privateRoom: false,
      privateBathroom: false,
    },
    sortOrder: 'relevance',
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('dormspaceFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, searchInput]);
  
  // Apply all filters to listings
  const applyFilters = () => {
    let results = [...dummyListings];
    
    // Apply search filter
    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      results = results.filter(listing => 
        listing.location.city.toLowerCase().includes(searchTerm) ||
        listing.location.state.toLowerCase().includes(searchTerm) ||
        listing.title.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply price filter
    results = results.filter(listing => 
      listing.price >= filters.priceRange[0] && 
      listing.price <= filters.priceRange[1]
    );
    
    // Apply room type filter
    if (filters.roomType !== 'any') {
      results = results.filter(listing => 
        listing.roomType.toLowerCase() === filters.roomType.toLowerCase()
      );
    }
    
    // Apply amenities filters
    const activeAmenities = Object.entries(filters.amenities)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name);
    
    if (activeAmenities.length > 0) {
      results = results.filter(listing => {
        // Map amenity keys to their representation in the listing data
        const amenityMap = {
          wifi: 'WiFi',
          kitchen: 'Kitchen',
          laundry: 'Laundry',
          parking: 'Parking',
          privateRoom: 'Private',
          privateBathroom: 'Private Bathroom',
        };
        
        return activeAmenities.every(amenity => 
          listing.amenities.some(a => 
            a.toLowerCase().includes(amenityMap[amenity].toLowerCase())
          )
        );
      });
    }
    
    // Apply sorting
    switch (filters.sortOrder) {
      case 'price_low_high':
        results = results.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        results = results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results = results.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      // 'relevance' is default and doesn't need special sorting
      default:
        break;
    }
    
    setFilteredListings(results);
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?location=${searchInput}`);
    applyFilters();
  };
  
  // Toggle a listing as favorite
  const handleFavoriteToggle = (listingId) => {
    if (favorites.includes(listingId)) {
      const newFavorites = favorites.filter(id => id !== listingId);
      setFavorites(newFavorites);
      localStorage.setItem('dormspaceFavorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, listingId];
      setFavorites(newFavorites);
      localStorage.setItem('dormspaceFavorites', JSON.stringify(newFavorites));
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by city or university..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <SearchFilters 
              onFilterChange={setFilters}
              isMobileOpen={isMobileFiltersOpen}
              setIsMobileOpen={setIsMobileFiltersOpen}
            />
          </div>
          
          {/* Listings Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {filteredListings.length} {filteredListings.length === 1 ? 'Result' : 'Results'}
              </h1>
            </div>
            
            {filteredListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <PropertyCard 
                    key={listing.id} 
                    listing={listing} 
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorite={favorites.includes(listing.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No listings found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search for a different location
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Listings;
