
// Mock data for property listings
const dummyListings = [
  {
    id: "listing-001",
    title: "Cozy Single Room near University Campus",
    description: "This comfortable single room is perfect for students looking for a quiet place to study and relax. Located just a 5-minute walk from the main campus, it offers convenience and comfort.",
    price: 450,
    location: {
      address: "123 University Ave",
      city: "Boston",
      state: "Massachusetts",
      zipCode: "02215",
      latitude: 42.350,
      longitude: -71.105
    },
    roomType: "Single",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Desk", "Shared Kitchen", "Laundry"],
    houseRules: ["No smoking", "Quiet hours after 10 PM"],
    owner: {
      id: "owner-001",
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "98%"
    },
    reviews: [
      {
        id: "review-001",
        rating: 4.5,
        text: "Great room and location! Jane was very helpful.",
        author: "Michael Davis",
        date: "2023-04-15"
      },
      {
        id: "review-002",
        rating: 5,
        text: "Perfect for students. Clean and comfortable.",
        author: "Sarah Wilson",
        date: "2023-03-22"
      }
    ],
    createdAt: "2023-02-10"
  },
  {
    id: "listing-002",
    title: "Modern Shared Apartment in Downtown",
    description: "Share this beautiful 3-bedroom apartment with other students in the heart of downtown. Recently renovated with modern appliances and close to public transportation.",
    price: 650,
    location: {
      address: "456 Main Street",
      city: "Boston",
      state: "Massachusetts",
      zipCode: "02110",
      latitude: 42.360,
      longitude: -71.059
    },
    roomType: "Shared",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Full Kitchen", "Washer/Dryer", "TV", "Air Conditioning"],
    houseRules: ["No pets", "No parties", "Quiet hours after 11 PM"],
    owner: {
      id: "owner-002",
      name: "Robert Johnson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "95%"
    },
    reviews: [
      {
        id: "review-003",
        rating: 4,
        text: "Great location and nice roommates. Kitchen is well-equipped.",
        author: "Emma Thompson",
        date: "2023-05-02"
      }
    ],
    createdAt: "2023-03-05"
  },
  {
    id: "listing-003",
    title: "Private Room in Quiet Neighborhood",
    description: "Spacious private room in a quiet residential area. Perfect for graduate students or those who prefer a peaceful environment away from campus noise.",
    price: 550,
    location: {
      address: "789 Oak Street",
      city: "Cambridge",
      state: "Massachusetts",
      zipCode: "02138",
      latitude: 42.378,
      longitude: -71.116
    },
    roomType: "Private",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Private Bathroom", "Study Desk", "Parking"],
    houseRules: ["No smoking", "No overnight guests"],
    owner: {
      id: "owner-003",
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "100%"
    },
    reviews: [
      {
        id: "review-004",
        rating: 5,
        text: "Absolutely perfect for my needs. David is an excellent host.",
        author: "Laura Martin",
        date: "2023-04-28"
      },
      {
        id: "review-005",
        rating: 4.5,
        text: "Very quiet and comfortable. Great for studying.",
        author: "James Wilson",
        date: "2023-03-15"
      }
    ],
    createdAt: "2023-01-20"
  },
  {
    id: "listing-004",
    title: "Studio Apartment Near Tech Campus",
    description: "Fully furnished studio apartment perfect for students who value privacy. Close to tech campus and local amenities.",
    price: 800,
    location: {
      address: "101 Pine Lane",
      city: "Boston",
      state: "Massachusetts",
      zipCode: "02115",
      latitude: 42.340,
      longitude: -71.089
    },
    roomType: "Studio",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Full Kitchen", "Private Bathroom", "Study Area", "Gym Access"],
    houseRules: ["No pets", "Quiet hours after 10 PM"],
    owner: {
      id: "owner-004",
      name: "Samantha Lee",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "97%"
    },
    reviews: [
      {
        id: "review-006",
        rating: 4.5,
        text: "Lovely studio with everything you need. Very convenient location.",
        author: "Thomas Brown",
        date: "2023-05-05"
      }
    ],
    createdAt: "2023-02-28"
  },
  {
    id: "listing-005",
    title: "Affordable Room in Student House",
    description: "Join our friendly student house! We have one room available in our 5-bedroom house. Great atmosphere for socializing and studying.",
    price: 400,
    location: {
      address: "222 College Road",
      city: "Cambridge",
      state: "Massachusetts",
      zipCode: "02139",
      latitude: 42.365,
      longitude: -71.104
    },
    roomType: "Shared",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1547333590-47fae5f58d21?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Shared Kitchen", "Laundry", "Garden", "Living Room"],
    houseRules: ["No smoking inside", "Shared cleaning duties", "Respect quiet hours"],
    owner: {
      id: "owner-005",
      name: "Mark Wilson",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "90%"
    },
    reviews: [
      {
        id: "review-007",
        rating: 4,
        text: "Great atmosphere and friendly roommates. The house is a bit old but well-maintained.",
        author: "Nina Patel",
        date: "2023-04-10"
      },
      {
        id: "review-008",
        rating: 3.5,
        text: "Good value for money. Location is convenient for students.",
        author: "Carlos Rodriguez",
        date: "2023-03-05"
      }
    ],
    createdAt: "2023-01-15"
  },
  {
    id: "listing-006",
    title: "Luxury Student Apartment with Pool",
    description: "High-end student accommodation with modern amenities including a pool, gym, and study lounge. Perfect for students who want a premium living experience.",
    price: 950,
    location: {
      address: "333 Luxury Lane",
      city: "Boston",
      state: "Massachusetts",
      zipCode: "02116",
      latitude: 42.348,
      longitude: -71.075
    },
    roomType: "Private",
    images: [
      "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1551361415-69c87624334f?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      "https://images.unsplash.com/photo-1603988089934-fea3111e619e?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    ],
    amenities: ["WiFi", "Swimming Pool", "Gym", "Study Lounge", "Secured Building", "Parking"],
    houseRules: ["No smoking", "No parties", "Guests must be registered"],
    owner: {
      id: "owner-006",
      name: "Elite Student Housing",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      responseRate: "98%"
    },
    reviews: [
      {
        id: "review-009",
        rating: 5,
        text: "Amazing facilities and professional management. Worth every penny.",
        author: "Alexandra Kim",
        date: "2023-05-10"
      },
      {
        id: "review-010",
        rating: 4.5,
        text: "Luxurious living with great amenities. Perfect for serious students.",
        author: "William Taylor",
        date: "2023-04-22"
      }
    ],
    createdAt: "2023-03-01"
  }
];

export default dummyListings;
