
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilters = ({ onFilterChange, isMobileOpen, setIsMobileOpen }) => {
  // Filter state
  const [priceRange, setPriceRange] = useState([300, 1000]);
  const [roomType, setRoomType] = useState('any');
  const [amenities, setAmenities] = useState({
    wifi: false,
    kitchen: false,
    laundry: false,
    parking: false,
    privateRoom: false,
    privateBathroom: false,
  });
  const [sortOrder, setSortOrder] = useState('relevance');
  
  // Handle price change
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };
  
  // Handle amenity toggle
  const handleAmenityToggle = (amenity) => {
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [amenity]: !prevAmenities[amenity],
    }));
  };
  
  // Handle filter apply
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      roomType,
      amenities,
      sortOrder,
    });
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setPriceRange([300, 1000]);
    setRoomType('any');
    setAmenities({
      wifi: false,
      kitchen: false,
      laundry: false,
      parking: false,
      privateRoom: false,
      privateBathroom: false,
    });
    setSortOrder('relevance');
    
    onFilterChange({
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
    
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };
  
  // Filters JSX
  const filtersContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        {isMobileOpen && (
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Price Range Section */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-base">Price Range</Label>
          <span className="text-sm text-gray-500">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[300, 1000]}
          min={100}
          max={2000}
          step={50}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="my-6"
        />
      </div>
      
      {/* Room Type Section */}
      <div className="space-y-2">
        <Label className="text-base">Room Type</Label>
        <RadioGroup value={roomType} onValueChange={setRoomType} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <Label htmlFor="any" className="cursor-pointer">Any</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="cursor-pointer">Private Room</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="shared" id="shared" />
            <Label htmlFor="shared" className="cursor-pointer">Shared Room</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="studio" id="studio" />
            <Label htmlFor="studio" className="cursor-pointer">Studio</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Amenities Section */}
      <div className="space-y-2">
        <Label className="text-base">Amenities</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="wifi" 
              checked={amenities.wifi} 
              onCheckedChange={() => handleAmenityToggle('wifi')}
            />
            <Label htmlFor="wifi" className="cursor-pointer">WiFi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="kitchen" 
              checked={amenities.kitchen} 
              onCheckedChange={() => handleAmenityToggle('kitchen')}
            />
            <Label htmlFor="kitchen" className="cursor-pointer">Kitchen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="laundry" 
              checked={amenities.laundry} 
              onCheckedChange={() => handleAmenityToggle('laundry')}
            />
            <Label htmlFor="laundry" className="cursor-pointer">Laundry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="parking" 
              checked={amenities.parking} 
              onCheckedChange={() => handleAmenityToggle('parking')}
            />
            <Label htmlFor="parking" className="cursor-pointer">Parking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="privateRoom" 
              checked={amenities.privateRoom} 
              onCheckedChange={() => handleAmenityToggle('privateRoom')}
            />
            <Label htmlFor="privateRoom" className="cursor-pointer">Private Room</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="privateBathroom" 
              checked={amenities.privateBathroom} 
              onCheckedChange={() => handleAmenityToggle('privateBathroom')}
            />
            <Label htmlFor="privateBathroom" className="cursor-pointer">Private Bath</Label>
          </div>
        </div>
      </div>
      
      {/* Sort Order */}
      <div className="space-y-2">
        <Label className="text-base">Sort By</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price_low_high">Price: Low to High</SelectItem>
              <SelectItem value="price_high_low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {/* Filter Actions */}
      <div className="flex space-x-2 pt-4">
        <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters} className="flex-1">Reset</Button>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          onClick={() => setIsMobileOpen(true)}
          className="w-full mb-4 flex items-center justify-center"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Mobile Filter Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={() => setIsMobileOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-80 bg-white p-6 overflow-y-auto transform transition-transform duration-200 ease-in-out">
            {filtersContent}
          </div>
        </div>
      )}
      
      {/* Desktop Filters */}
      <div className="hidden md:block sticky top-20 bg-white p-6 rounded-lg shadow">
        {filtersContent}
      </div>
    </>
  );
};

export default SearchFilters;
