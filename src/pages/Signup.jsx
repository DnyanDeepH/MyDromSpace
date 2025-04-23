
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate registration delay
      register(name, email, password, userType);
      
      setTimeout(() => {
        setIsLoading(false);
        navigate(userType === 'owner' ? '/owner/dashboard' : '/dashboard');
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      toast("An error occurred during signup");
    }
  };
  
  return (
    <MainLayout>
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/rooms-background.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am signing up as a:</Label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="student"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => setUserType('student')}
                    className="mr-2"
                  />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="owner"
                    name="userType"
                    value="owner"
                    checked={userType === 'owner'}
                    onChange={() => setUserType('owner')}
                    className="mr-2"
                  />
                  <Label htmlFor="owner" className="cursor-pointer">Property Owner</Label>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-dorm-600 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
