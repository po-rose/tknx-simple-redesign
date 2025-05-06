
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NetworkVisualizer from "@/components/NetworkVisualizer";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-tknx-background text-white">
      <Navbar />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <NetworkVisualizer animated={true} nodeCount={30} className="h-full" />
        </div>
        
        <div className="container relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-gradient text-9xl font-bold mb-6">404</h1>
          <p className="text-3xl text-gray-300 mb-6">Page Not Found</p>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button 
              className="bg-tknx-blue hover:bg-tknx-darkBlue text-white rounded-full px-8 py-6"
              size="lg"
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
