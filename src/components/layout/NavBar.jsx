import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-dorm-600 text-white font-bold rounded-md p-1"></div>
          <span className="text-xl font-bold text-dorm-800">MyDromSpace</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/listings" className="nav-link">Find Rooms</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/help" className="nav-link">Help</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate(userType === 'owner' ? '/owner/dashboard' : '/dashboard')}
              >
                Dashboard
              </Button>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/listings" className="nav-link" onClick={toggleMobileMenu}>Find Rooms</Link>
            <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>About</Link>
            <Link to="/help" className="nav-link" onClick={toggleMobileMenu}>Help</Link>
            
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Button 
                    className="w-full mb-3" 
                    variant="outline" 
                    onClick={() => {
                      navigate(userType === 'owner' ? '/owner/dashboard' : '/dashboard');
                      toggleMobileMenu();
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button className="w-full" onClick={() => { logout(); toggleMobileMenu(); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="w-full mb-3" 
                    variant="outline" 
                    onClick={() => { navigate('/login'); toggleMobileMenu(); }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => { navigate('/signup'); toggleMobileMenu(); }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
