
import React from 'react';
import { useElementOnScreen } from '@/hooks/useElementOnScreen';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    'fade-up' | 
    'fade-in' | 
    'scale-in' | 
    'slide-in-right' | 
    'slide-in-left' | 
    'zoom-in' | 
    'rotate-in' | 
    'bounce-in' | 
    'flip-in' | 
    'glide-in' | 
    'blur-in';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  duration?: number;
  distance?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  easing?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  duration = 0.8,
  distance = 40,
  staggerChildren = false,
  staggerDelay = 0.1,
  easing = 'cubic-bezier(0.215, 0.61, 0.355, 1)',
}) => {
  const { elementRef, isVisible } = useElementOnScreen<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
  });

  // Generate initial state styles based on animation type
  const getInitialStyles = () => {
    const baseStyles = { opacity: 0 };
    
    switch (animation) {
      case 'fade-up':
        return { ...baseStyles, transform: `translateY(${distance}px)` };
      case 'fade-in':
        return baseStyles;
      case 'scale-in':
        return { ...baseStyles, transform: 'scale(0.92)' };
      case 'slide-in-right':
        return { ...baseStyles, transform: `translateX(${distance}px)` };
      case 'slide-in-left':
        return { ...baseStyles, transform: `translateX(-${distance}px)` };
      case 'zoom-in':
        return { ...baseStyles, transform: 'scale(0.5)' };
      case 'rotate-in':
        return { ...baseStyles, transform: 'rotate(-10deg) scale(0.95)' };
      case 'bounce-in':
        return { ...baseStyles, transform: 'translateY(30px)' };
      case 'flip-in':
        return { ...baseStyles, transform: 'perspective(400px) rotateX(90deg)' };
      case 'glide-in':
        return { ...baseStyles, transform: `translateY(${distance}px) translateX(${distance/2}px)` };
      case 'blur-in':
        return { ...baseStyles, filter: 'blur(8px)' };
      default:
        return baseStyles;
    }
  };

  const initialStyles = getInitialStyles();
  
  // Process children to add staggered animation delays if needed
  const renderChildren = () => {
    if (!staggerChildren || React.Children.count(children) <= 1) {
      return children;
    }
    
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      
      const childDelay = delay + (index * staggerDelay);
      
      // Create a wrapped element that can take our animation styles
      return (
        <div
          style={{
            transitionDelay: `${childDelay}s`,
            transitionProperty: 'transform, opacity, filter',
            transitionDuration: `${duration}s`,
            transitionTimingFunction: easing,
          }}
          className={cn(
            'transition-all',
            child.props.className
          )}
        >
          {child}
        </div>
      );
    });
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all',
        className
      )}
      style={{
        ...(!isVisible ? initialStyles : {}),
        transitionDelay: staggerChildren ? '0s' : `${delay}s`,
        transitionProperty: 'transform, opacity, filter',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: easing,
      }}
    >
      {staggerChildren ? renderChildren() : children}
    </div>
  );
};

export default ScrollReveal;
