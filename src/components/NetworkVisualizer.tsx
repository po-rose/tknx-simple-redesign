
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface NetworkVisualizerProps {
  className?: string;
  nodeCount?: number;
  animated?: boolean;
}

const NetworkVisualizer = ({ 
  className, 
  nodeCount = 40,
  animated = false 
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
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        // Gradient coloring
        color: i % 4 === 0 ? 'rgba(115, 103, 240, 0.8)' : 
               i % 3 === 0 ? 'rgba(74, 140, 255, 0.8)' : 
               i % 2 === 0 ? 'rgba(42, 90, 218, 0.8)' : 
               'rgba(94, 80, 233, 0.8)'
      });
    }
    
    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Update node positions if animation is enabled
      if (animated) {
        nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;
          
          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width / window.devicePixelRatio) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height / window.devicePixelRatio) node.vy *= -1;
        });
      }
      
      // Draw connections
      nodes.forEach((nodeA, i) => {
        nodes.forEach((nodeB, j) => {
          if (i !== j) {
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              // Draw line with gradient opacity based on distance
              ctx.beginPath();
              const opacity = 1 - distance / 100;
              ctx.strokeStyle = `rgba(115, 103, 240, ${opacity * 0.5})`;
              ctx.lineWidth = opacity * 0.8;
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        });
      });
      
      // Draw nodes with glowing effect
      nodes.forEach(node => {
        ctx.beginPath();
        // Create a gradient for the node
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(115, 103, 240, 0)');
        
        // Draw glow
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw main node
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(draw);
    };
    
    const animationId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [nodeCount, animated]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
    />
  );
};

export default NetworkVisualizer;
