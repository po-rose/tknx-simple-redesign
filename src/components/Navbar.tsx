import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Menu, X
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-10 pb-4",
        isScrolled 
          ? "bg-tknx-background/80 backdrop-blur-xl border-b border-white/5" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-3xl font-bold flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/logo.png" alt="TKNX Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/vision" className="text-gray-300 hover:text-white transition-colors hover-underline">
              Vision
            </Link>
            <Link to="/tokenization" className="text-gray-300 hover:text-white transition-colors hover-underline">
              Tokenization
            </Link>
            <Link to="/solutions" className="text-gray-300 hover:text-white transition-colors hover-underline">
              Solutions
            </Link>
            <Link to="/news" className="text-gray-300 hover:text-white transition-colors hover-underline">
              News
            </Link>
            <Button 
              className="bg-gradient-to-r from-tknx-blue to-tknx-purple hover:opacity-90 text-white rounded-full px-8 py-6 font-medium button-glow"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-card mt-4 py-6 px-4 rounded-2xl shadow-lg border border-white/5">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/vision" 
                className="text-gray-300 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Vision
              </Link>
              <Link 
                to="/tokenization" 
                className="text-gray-300 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Tokenization
              </Link>
              <Link 
                to="/solutions" 
                className="text-gray-300 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/news" 
                className="text-gray-300 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Button 
                className="bg-gradient-to-r from-tknx-blue to-tknx-purple hover:opacity-90 text-white w-full rounded-xl font-medium py-6 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
