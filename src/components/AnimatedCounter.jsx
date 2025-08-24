import { useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  className,
  duration = 2000 
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  const { current, startAnimation } = useCountUp({
    end: value,
    duration,
    start: 0
  });

  useEffect(() => {
    if (isIntersecting) {
      startAnimation();
    }
  }, [isIntersecting, startAnimation]);

  return (
    <span 
      ref={elementRef} 
      className={cn("animate-count-up", className)}
    >
      {current.toLocaleString()}{suffix}
    </span>
  );
};

