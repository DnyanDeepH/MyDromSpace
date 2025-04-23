
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { BookOpen } from 'lucide-react';

const Help = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-dorm-600" />
            <h1 className="text-3xl font-bold text-dorm-800">Help & FAQ</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How do I search for a room?</h3>
                <p className="text-gray-600">
                  You can search for available rooms by using the search bar on the homepage. 
                  Enter your preferred location, and you can filter results by price, amenities, and more.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How do I contact property owners?</h3>
                <p className="text-gray-600">
                  Once you've found a room you're interested in, you can send a message to the property owner
                  directly from the listing page. You'll need to create an account or log in first.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How do I list my property on MyDormSpace?</h3>
                <p className="text-gray-600">
                  To list your property, sign up for an account as a property owner. After logging in, 
                  go to your owner dashboard and click on "Add New Listing" to create your property listing.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">Are there any fees for using MyDormSpace?</h3>
                <p className="text-gray-600">
                  MyDormSpace is completely free for students searching for accommodation. Property owners
                  can create basic listings at no cost, with premium features available on subscription plans.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How do I reset my password?</h3>
                <p className="text-gray-600">
                  If you've forgotten your password, click on the "Login" button, then select the
                  "Forgot Password" link. Enter your email address and follow the instructions sent to your inbox.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
            <p className="mb-4">
              Our support team is available to assist you with any questions or issues you may have.
              Please feel free to contact us using the information below.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-medium">Email:</span> support@mydormspace.com</p>
              <p className="text-gray-700"><span className="font-medium">Phone:</span> (555) 123-4567</p>
              <p className="text-gray-700"><span className="font-medium">Hours:</span> Monday - Friday, 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;
