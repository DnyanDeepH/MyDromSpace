
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About MyDromSpace</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              MyDromSpace is a specialized platform designed to connect students with affordable, 
              convenient, and comfortable housing options near their educational institutions. 
              We understand that finding the right accommodation is a crucial aspect of the student 
              experience, which is why we've created a platform that makes this process as seamless 
              as possible.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to simplify the student housing search process and create a transparent 
              marketplace where students can find their ideal living spaces and property owners can 
              connect with reliable student tenants.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose MyDromSpace?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Student-Focused:</strong> Our platform is specifically designed with students' 
                needs in mind, focusing on the factors that matter most to them.
              </li>
              <li>
                <strong>Comprehensive Listings:</strong> We provide detailed information about each 
                property, including amenities, house rules, and proximity to educational institutions.
              </li>
              <li>
                <strong>Verified Owners:</strong> We verify property owners to ensure the legitimacy of 
                listings on our platform.
              </li>
              <li>
                <strong>Direct Communication:</strong> Our platform facilitates direct communication 
                between students and property owners, ensuring a transparent and efficient process.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">For Students</h2>
            <p>
              Finding student accommodation can be overwhelming, especially for international students 
              or those moving to a new city. MyDromSpace provides a user-friendly platform where you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Search for accommodation based on location, price, and amenities</li>
              <li>View detailed information about each property</li>
              <li>Contact property owners directly</li>
              <li>Save favorite listings for future reference</li>
              <li>Read reviews from previous student tenants</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">For Property Owners</h2>
            <p>
              If you own property near educational institutions, MyDromSpace offers you a platform to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>List your property for free</li>
              <li>Reach a large audience of potential student tenants</li>
              <li>Manage your listings easily through a user-friendly dashboard</li>
              <li>Communicate directly with interested students</li>
              <li>Build a reputation through student reviews</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              MyDromSpace was founded by a team of former university students who experienced firsthand 
              the challenges of finding suitable student accommodation. With backgrounds in real estate, 
              technology, and education, our team is committed to improving the student housing experience.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              We're always looking to improve our platform and would love to hear your feedback. 
              If you have any questions, suggestions, or concerns, please don't hesitate to reach out to us.
            </p>
            <p>
              Email: <a href="mailto:info@mydromspace.com" className="text-dorm-600 hover:underline">info@mydromspace.com</a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
