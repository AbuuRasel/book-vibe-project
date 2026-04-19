import React from 'react';
import Navbar from '../components/shared/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">  {/* ✅ Add these */}
      <Navbar />
      <main className="flex-1">  {/* ✅ This pushes footer down */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;