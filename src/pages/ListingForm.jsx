
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import dummyListings from '@/data/dummyListings';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, ArrowRight, Image, Loader2 } from 'lucide-react';

const ListingForm = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { listingId } = useParams();
  const isEditing = !!listingId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    roomType: 'Single',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    amenities: {
      WiFi: false,
      'Shared Kitchen': false,
      'Private Kitchen': false,
      Laundry: false,
      Parking: false,
      'Study Desk': false,
      'Private Bathroom': false,
      'Air Conditioning': false,
      TV: false,
      'Gym Access': false
    },
    houseRules: '',
    images: []
  });
  
  // Load listing data if editing
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
    
    if (isEditing) {
      const listing = dummyListings.find(item => item.id === listingId);
      if (listing) {
        // Convert listing to form data format
        const amenitiesObj = {};
        listing.amenities.forEach(amenity => {
          amenitiesObj[amenity] = true;
        });
        
        setFormData({
          title: listing.title,
          description: listing.description,
          price: listing.price.toString(),
          roomType: listing.roomType,
          address: listing.location.address,
          city: listing.location.city,
          state: listing.location.state,
          zipCode: listing.location.zipCode,
          latitude: listing.location.latitude.toString(),
          longitude: listing.location.longitude.toString(),
          amenities: {
            ...formData.amenities,
            ...amenitiesObj
          },
          houseRules: listing.houseRules.join('\n'),
          images: listing.images
        });
      } else {
        // If listing not found, redirect
        navigate('/owner/dashboard');
        toast("Listing not found");
      }
    }
  }, [isAuthenticated, user, navigate, isEditing, listingId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.title || !formData.description || !formData.price || !formData.address || !formData.city) {
      toast("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }
    
    // Validate price as a number
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      toast("Please enter a valid price");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast(isEditing ? "Listing updated successfully" : "Listing created successfully");
      navigate('/owner/dashboard');
    }, 1500);
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  // Placeholder image upload function
  const handleImageUpload = () => {
    // Simulate adding an image
    const placeholderImages = [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ];
    
    // Add a random image from placeholders if we have less than 5 images
    if (formData.images.length < 5) {
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, placeholderImages[randomIndex]]
      }));
      toast("Image uploaded (simulated)");
    } else {
      toast("Maximum of 5 images allowed");
    }
  };
  
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  if (!isAuthenticated || user?.type !== 'owner') {
    return null; // We're redirecting, no need to render anything
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/owner/dashboard')}
            className="mr-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Listing' : 'Create New Listing'}
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div className={`flex-1 text-center py-2 ${step === 1 ? 'font-bold text-dorm-600' : 'text-gray-500'}`}>
                Basic Info
              </div>
              <div className={`flex-1 text-center py-2 ${step === 2 ? 'font-bold text-dorm-600' : 'text-gray-500'}`}>
                Location
              </div>
              <div className={`flex-1 text-center py-2 ${step === 3 ? 'font-bold text-dorm-600' : 'text-gray-500'}`}>
                Features & Rules
              </div>
              <div className={`flex-1 text-center py-2 ${step === 4 ? 'font-bold text-dorm-600' : 'text-gray-500'}`}>
                Photos
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-dorm-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Listing Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Cozy Single Room near University Campus"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your space in detail..."
                    className="h-32"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($ per month) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Room Type</Label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Single">Single Room</option>
                      <option value="Private">Private Room</option>
                      <option value="Shared">Shared Room</option>
                      <option value="Studio">Studio Apartment</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g., 123 University Ave"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Boston"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g., Massachusetts"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      ZIP Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="e.g., 02115"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude (Optional)</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="e.g., 42.350"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude (Optional)</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="e.g., -71.105"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Features & Rules */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Amenities & House Rules</h2>
                
                <div className="space-y-4">
                  <Label>Available Amenities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData.amenities).map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`amenity-${amenity}`} 
                          checked={formData.amenities[amenity]}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                        />
                        <Label 
                          htmlFor={`amenity-${amenity}`}
                          className="cursor-pointer"
                        >
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="houseRules">
                    House Rules <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="houseRules"
                    name="houseRules"
                    value={formData.houseRules}
                    onChange={handleInputChange}
                    placeholder="List your house rules, one per line..."
                    className="h-32"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Add each rule on a new line (e.g., No smoking)
                  </p>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Photos */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Property Photos</Label>
                    <span className="text-sm text-gray-500">
                      {formData.images.length}/5 photos
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden h-40">
                        <img 
                          src={image} 
                          alt={`Property photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          onClick={() => removeImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center hover:bg-gray-50"
                      >
                        <Image className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Photo</span>
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload up to 5 photos of your property. The first photo will be your listing's thumbnail.
                  </p>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        {isEditing ? 'Updating Listing...' : 'Creating Listing...'}
                      </>
                    ) : (
                      isEditing ? 'Update Listing' : 'Create Listing'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingForm;
