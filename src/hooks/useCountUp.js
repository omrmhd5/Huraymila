import { useState, useEffect } from 'react';

export const useCountUp = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  startOnMount = false 
}) => {
  const [current, setCurrent] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = current;
    const change = end - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (change * easeOut));
      
      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (startOnMount) {
      startAnimation();
    }
  }, [startOnMount]);

  return { current, startAnimation, isAnimating };
};

