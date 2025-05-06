
import { useState, useEffect, useRef } from 'react';

type UseElementOnScreenOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  triggerOnce?: boolean;
};

export function useElementOnScreen<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  triggerOnce = true
}: UseElementOnScreenOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once, triggerOnce]);

  return { elementRef, isVisible, hasTriggered };
}
