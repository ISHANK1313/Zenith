import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { isAuthenticated, username, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b-4 border-black bg-brutal-yellow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-4 border-black">
              <span className="text-2xl text-brutal-yellow font-bold">Z</span>
            </div>
            <span className="text-3xl font-bold uppercase">ZENITH</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white border-4 border-black">
                  <div className="w-8 h-8 bg-brutal-cyan border-2 border-black flex items-center justify-center">
                    <span className="font-bold text-sm">
                      {username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-bold">{username}</span>
                </div>
                <Button onClick={handleLogout} variant="pink" size="sm">
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="cyan" size="sm">
                    LOGIN
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="lime" size="sm">
                    SIGNUP
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};