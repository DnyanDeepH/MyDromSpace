import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate login delay
      login(email, password, userType);
      
      setTimeout(() => {
        setIsLoading(false);
        navigate(userType === 'owner' ? '/owner/dashboard' : '/dashboard');
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      toast("An error occurred during login");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Log In to MyDromSpace</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password"
                  className="text-sm text-dorm-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am a:</Label>
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
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-dorm-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default Login;
