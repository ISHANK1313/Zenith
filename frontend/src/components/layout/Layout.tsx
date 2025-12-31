import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t-4 border-black bg-brutal-cyan py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold">
            © 2025 ZENITH • Built with ⚡ by Shivank
          </p>
        </div>
      </footer>
    </div>
  );
};