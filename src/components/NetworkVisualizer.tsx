
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface NetworkVisualizerProps {
  className?: string;
  nodeCount?: number;
  animated?: boolean;
  pulseEffect?: boolean;
}

const NetworkVisualizer = ({ 
  className, 
  nodeCount = 40,
  animated = false,
  pulseEffect = true
}: NetworkVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create nodes
    const nodes: any[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width / window.devicePixelRatio,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.7, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.7,
        // Gradient coloring with more variation
        color: i % 5 === 0 ? 'rgba(115, 103, 240, 0.8)' : 
               i % 4 === 0 ? 'rgba(74, 140, 255, 0.8)' : 
               i % 3 === 0 ? 'rgba(42, 90, 218, 0.8)' :
               i % 2 === 0 ? 'rgba(94, 80, 233, 0.8)' : 
               'rgba(66, 99, 235, 0.8)',
        // Animation properties
        pulseState: 0,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        orbitRadius: Math.random() * 20,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.005 + Math.random() * 0.01
      });
    }
    
    // Track mouse for interactive effect
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width / window.devicePixelRatio);
      mouseY = (e.clientY - rect.top) * (canvas.height / rect.height / window.devicePixelRatio);
      mouseActive = true;
      
      // Create ripple effect on mouse move
      if (animated) {
        const rippleNode = {
          x: mouseX,
          y: mouseY,
          radius: 0,
          maxRadius: 50,
          color: 'rgba(115, 103, 240, 0.2)',
          growth: 2
        };
        ripples.push(rippleNode);
      }
    });
    
    canvas.addEventListener('mouseleave', () => {
      mouseActive = false;
    });
    
    // Store ripples for mouse interaction
    const ripples: any[] = [];
    
    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.growth;
        ctx.beginPath();
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 1;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Remove ripple when it reaches max radius
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      // Update node positions if animation is enabled
      if (animated) {
        nodes.forEach(node => {
          // Basic movement
          node.x += node.vx;
          node.y += node.vy;
          
          // Add slight orbital motion
          node.orbitAngle += node.orbitSpeed;
          node.x += Math.cos(node.orbitAngle) * 0.2;
          node.y += Math.sin(node.orbitAngle) * 0.2;
          
          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width / window.devicePixelRatio) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height / window.devicePixelRatio) node.vy *= -1;
          
          // Mouse interaction - nodes gravitate slightly toward mouse
          if (mouseActive) {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              node.vx += dx * 0.002;
              node.vy += dy * 0.002;
            }
          }
          
          // Limit velocity
          const maxVel = 1.2;
          const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (vel > maxVel) {
            node.vx = node.vx / vel * maxVel;
            node.vy = node.vy / vel * maxVel;
          }
        });
      }
      
      // Draw connections
      nodes.forEach((nodeA, i) => {
        nodes.forEach((nodeB, j) => {
          if (i !== j) {
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) { // Increased connection distance
              // Draw line with gradient opacity based on distance
              ctx.beginPath();
              const opacity = 1 - distance / 120;
              ctx.strokeStyle = `rgba(115, 103, 240, ${opacity * 0.6})`; // Brighter connections
              ctx.lineWidth = opacity * 1.0; // Slightly thicker lines
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        });
      });
      
      // Draw nodes with enhanced glowing effect
      nodes.forEach(node => {
        // Update pulse state if pulsing is enabled
        if (pulseEffect) {
          node.pulseState += node.pulseSpeed;
          if (node.pulseState > Math.PI * 2) node.pulseState -= Math.PI * 2;
        }
        
        // Calculate pulse factor
        const pulseFactor = pulseEffect ? 0.5 + 0.5 * Math.sin(node.pulseState) : 1;
        
        // Create a gradient for the glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6 * pulseFactor
        );
        
        // Enhanced glow with more color stops
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(0.4, node.color.replace('0.8', '0.3'));
        gradient.addColorStop(0.8, node.color.replace('0.8', '0.1'));
        gradient.addColorStop(1, 'rgba(115, 103, 240, 0)');
        
        // Draw enhanced glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, node.radius * 6 * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw main node with subtle pulsing
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius * (0.8 + 0.2 * pulseFactor), 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(draw);
    };
    
    const animationId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [nodeCount, animated, pulseEffect]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
    />
  );
};

export default NetworkVisualizer;
