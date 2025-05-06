
import React, { useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import NetworkVisualizer from '@/components/NetworkVisualizer';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  Shield, 
  Database, 
  Network, 
  Scale, 
  LineChart, 
  TrendingUp, 
  Package, 
  Code,
  Lock,
  PieChart,
  FileText
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Create particles on mount
    const createParticles = () => {
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random particle properties
        const size = Math.random() * 8 + 4;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        const rotate = (Math.random() - 0.5) * 360;
        const duration = Math.random() * 2 + 3;
        const gradient = `linear-gradient(45deg, ${
          ['var(--tknx-blue)', 'var(--tknx-purple)', 'var(--tknx-lightBlue)'][
            Math.floor(Math.random() * 3)
          ]
        }, transparent)`;
        
        // Apply styles
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        particle.style.setProperty('--rotate', `${rotate}deg`);
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--gradient', gradient);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        card.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
          if (particle.parentNode === card) {
            card.removeChild(particle);
          }
        }, duration * 1000);
      }
    };
    
    // Handle parallax effect
    const handleMouseMove = (e) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate rotation based on mouse position
      const maxRotation = 8;
      const rotateY = ((mouseX - centerX) / rect.width) * maxRotation;
      const rotateX = ((centerY - mouseY) / rect.height) * maxRotation;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    // Reset card position when mouse leaves
    const handleMouseLeave = () => {
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      }
    };
    
    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', createParticles);
    
    // Create initial particles
    createParticles();
    
    // Cleanup
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', createParticles);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef} 
      className="feature-card parallax-card overflow-hidden relative"
      style={{
        animationDelay: `${delay * 100}ms`,
        transform: 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{title}</h3>
      <p className="text-gray-400">
        {description}
      </p>
      
      {/* Animated border effect */}
      <div className="absolute inset-0 -z-10 animate-pulse opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-tknx-blue to-tknx-purple opacity-10 blur-sm"></div>
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    document.title = "TKNX | Tokenize Your Financial Assets";
  }, []);

  // Create CSS variable at the root for the feature cards
  useEffect(() => {
    document.documentElement.style.setProperty('--tknx-blue', '#2A5ADA');
    document.documentElement.style.setProperty('--tknx-purple', '#7367F0');
    document.documentElement.style.setProperty('--tknx-lightBlue', '#4A8CFF');
  }, []);

  return (
    <div className="min-h-screen bg-tknx-background text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-40 pb-32">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-hero-pattern opacity-40">
          <NetworkVisualizer animated={true} nodeCount={50} className="h-full" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <div className="quantum-badge mb-6">
                <span className="bg-tknx-blue rounded-full w-2 h-2 animate-pulse-slow"></span>
                <span>QUANTUM SECURED PLATFORM</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
                <span>The Future. </span>
                <span className="text-gradient">Tokenized</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mb-12">
                Tokenize your financial instruments with unparalleled security, utility, and legal compliance through our quantum-secure blockchain platform
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  className="bg-gradient-to-r from-tknx-blue to-tknx-purple hover:opacity-90 text-white rounded-full px-10 py-7 font-medium button-glow animate-ripple"
                  size="lg"
                >
                  Learn More
                </Button>
                <Button 
                  className="bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full px-10 py-7 font-medium"
                  size="lg"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tknx-background to-transparent"></div>
      </div>
      
      {/* About Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="section-divider">
          <span>About TKNX</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-up">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">Pioneering <span className="text-gradient">Digital Asset</span> Transformation</h2>
              <p className="text-gray-300 mb-6 text-lg">
                TKNX is a pioneering blockchain technology provider that leverages the Quantum Chain ecosystems to tokenize traditional financial instruments.
              </p>
              <p className="text-gray-300 mb-10 text-lg">
                Taking the regulatory framework of Quantum Chain and mapping it to International Finance Law, TKNX ensures unparalleled security, utility, and legal compliance.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="quantum-badge">
                  <span className="bg-tknx-blue rounded-full w-2 h-2"></span>
                  <span>Quantum Secure</span>
                </div>
                <div className="quantum-badge">
                  <span className="bg-tknx-blue rounded-full w-2 h-2"></span>
                  <span>Compliant</span>
                </div>
                <div className="quantum-badge">
                  <span className="bg-tknx-blue rounded-full w-2 h-2"></span>
                  <span>Future-Proof</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-in-right" delay={0.2} className="hidden lg:block">
            <div className="relative glow-effect p-1 rounded-2xl">
              <div className="absolute -z-10 inset-0 blur-3xl bg-tknx-blue/10 rounded-full"></div>
              <div className="bg-tknx-cardBg rounded-2xl overflow-hidden border border-white/5">
                <NetworkVisualizer animated={true} nodeCount={80} className="h-96 w-full" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Technology Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="section-divider">
          <span>The Technology Behind TKNX</span>
        </div>
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Advanced <span className="text-gradient">Technology</span> Infrastructure</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our platform is built on next-generation blockchain technology that ensures security, scalability, and compliance
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-tknx-blue" />}
              title="Post-Quantum Security"
              description="Protected against quantum computing attacks with advanced cryptographic algorithms."
              delay={0}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.2}>
            <FeatureCard
              icon={<Database className="h-6 w-6 text-tknx-blue" />}
              title="API Financial Core Engine"
              description="Programmatic connectivity to legacy finance systems for seamless integration."
              delay={1}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.3}>
            <FeatureCard
              icon={<Network className="h-6 w-6 text-tknx-blue" />}
              title="High Scalability"
              description="Efficient scaling with next-generation consensus mechanisms and structure."
              delay={2}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.4}>
            <FeatureCard
              icon={<Scale className="h-6 w-6 text-tknx-blue" />}
              title="Interoperability"
              description="Connect with other platforms through cross-chain bridges and open standards."
              delay={3}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.5}>
            <FeatureCard
              icon={<Lock className="h-6 w-6 text-tknx-blue" />}
              title="Proof-of-Authority Governance"
              description="Regulatory-compliant consensus mechanism with verified authority nodes."
              delay={4}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.6}>
            <FeatureCard
              icon={<Code className="h-6 w-6 text-tknx-blue" />}
              title="Smart Contracts"
              description="Advanced programmable contracts with financial instrument templates."
              delay={5}
            />
          </ScrollReveal>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal animation="slide-in-left" delay={0.3}>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="step-badge">
                  <span className="bg-tknx-purple rounded-full w-2 h-2 animate-pulse-slow"></span>
                  <span>Future Built</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Programmable Processes</h3>
              <p className="text-gray-400 text-lg">
                Digital automated and programmable financial instruments for better transparency and operations.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-in-right" delay={0.4}>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="step-badge">
                  <span className="bg-tknx-purple rounded-full w-2 h-2 animate-pulse-slow"></span>
                  <span>Compliant</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Regulatory Compliance</h3>
              <p className="text-gray-400 text-lg">
                Built from the ground up with regulatory compliance as the primary focus for institutional use.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Industry Impact Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="section-divider">
          <span>Industry Impact</span>
        </div>
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Transforming <span className="text-gradient">Financial</span> Markets</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our technology creates significant advantages for financial institutions and investors alike
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="space-y-6">
            <div className="impact-row">
              <div className="impact-icon">
                <Shield className="h-6 w-6 text-tknx-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                <p className="text-gray-400">Sophisticated cryptographic measures ensures asset security and integrity.</p>
              </div>
            </div>
            
            <div className="impact-row">
              <div className="impact-icon">
                <PieChart className="h-6 w-6 text-tknx-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Operational Efficiency</h3>
                <p className="text-gray-400">Automated lifecycles reduce overhead by up to 80% and lower costs.</p>
              </div>
            </div>
            
            <div className="impact-row">
              <div className="impact-icon">
                <TrendingUp className="h-6 w-6 text-tknx-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Market Expansion</h3>
                <p className="text-gray-400">Access to broader markets through digital trading venues.</p>
              </div>
            </div>
            
            <div className="impact-row">
              <div className="impact-icon">
                <FileText className="h-6 w-6 text-tknx-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Immutable Governance</h3>
                <p className="text-gray-400">Programmatic rules ensure consistent application of terms throughout asset lifecycle.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Services Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="section-divider">
          <span>Our Services</span>
        </div>
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Comprehensive <span className="text-gradient">Solutions</span></h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              End-to-end services for digital asset tokenization and management
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="service-card">
              <div className="feature-icon mb-6">
                <Package className="h-6 w-6 text-tknx-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Primary Issuance</h3>
              <p className="text-gray-400 mb-4">
                We create the initial token issuance, enabling streamlined distribution of financial assets directly to qualified investors. 
              </p>
              <div className="mt-auto pt-4">
                <Button className="bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-full text-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="service-card">
              <div className="feature-icon mb-6">
                <LineChart className="h-6 w-6 text-tknx-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Asset Lifecycle Management</h3>
              <p className="text-gray-400 mb-4">
                Full automation of corporate actions, pricing calculations, and settlement processes through smart contracts.
              </p>
              <div className="mt-auto pt-4">
                <Button className="bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-full text-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.3}>
            <div className="service-card">
              <div className="feature-icon mb-6">
                <TrendingUp className="h-6 w-6 text-tknx-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secondary Trading</h3>
              <p className="text-gray-400 mb-4">
                Seamlessly enable secondary market liquidity for digital securities through regulated trading venues.
              </p>
              <div className="mt-auto pt-4">
                <Button className="bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-full text-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Partners Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="section-divider">
          <span>Our Partners</span>
        </div>
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted <span className="text-gradient">Partnerships</span></h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Working with industry leaders to transform financial markets
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="scale-in" delay={0.2}>
          <div className="flex flex-wrap justify-center items-center gap-10 my-16">
            <div className="partner-logo h-24 w-48 flex items-center justify-center">
              <div className="text-2xl font-bold text-gradient">X/LIQUID</div>
            </div>
            <div className="partner-logo h-24 w-48 flex items-center justify-center">
              <div className="text-2xl font-bold text-gradient">CHAIN</div>
            </div>
            <div className="partner-logo h-24 w-48 flex items-center justify-center">
              <div className="text-2xl font-bold text-gradient">Quantum</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <ScrollReveal animation="fade-up">
          <div className="cta-section">
            <div className="cta-glow"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  Ready to <span className="text-gradient">Revolutionize</span> Your Financial Assets?
                </h2>
                <p className="text-gray-300 mb-10 text-lg">
                  Schedule a demo with our team to see how TKNX can transform your financial products into digital assets ready for the future market.
                </p>
                <Button 
                  className="bg-white text-tknx-background hover:bg-gray-200 rounded-full px-8 py-6 font-medium"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
              <div className="hidden lg:block">
                <div className="glass-card p-1 rounded-2xl overflow-hidden border border-white/10 animate-float">
                  <NetworkVisualizer animated={true} nodeCount={100} className="h-80" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Footer */}
      <footer className="bg-tknx-darkBlue/50 border-t border-white/5 mt-12 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-3xl font-bold mb-6">
                <span className="text-gradient font-extrabold">TKNX</span>
              </div>
              <p className="text-gray-400 mb-6">Tokenizing the future of finance</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Vision</h4>
              <ul className="space-y-4">
                <li><a href="/about" className="text-gray-400 hover:text-white hover-underline">About Us</a></li>
                <li><a href="/team" className="text-gray-400 hover:text-white hover-underline">Our Team</a></li>
                <li><a href="/technology" className="text-gray-400 hover:text-white hover-underline">Technology</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Solutions</h4>
              <ul className="space-y-4">
                <li><a href="/bonds" className="text-gray-400 hover:text-white hover-underline">Bonds</a></li>
                <li><a href="/structured-notes" className="text-gray-400 hover:text-white hover-underline">Structured Notes</a></li>
                <li><a href="/tokenization" className="text-gray-400 hover:text-white hover-underline">Tokenization</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Subscribe to Our Newsletter</h4>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-tknx-cardBg border border-white/10 rounded-l-full px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-tknx-blue"
                />
                <Button className="bg-gradient-to-r from-tknx-blue to-tknx-purple hover:opacity-90 text-white rounded-r-full rounded-l-none">
                  Send
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 TKNX. All rights reserved.</p>
            <div className="mt-6 md:mt-0">
              <ul className="flex flex-wrap gap-8 justify-center">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm hover-underline">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm hover-underline">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm hover-underline">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
