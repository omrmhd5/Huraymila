import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const {
    threshold = 0.01,
    rootMargin = "0px 0px -10px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { elementRef, isVisible: hasAnimated ? true : isVisible };
};

export const useStaggeredAnimation = (itemCount, options = {}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const { staggerDelay = 25, threshold = 0.01 } = options;

  const triggerAnimation = (index) => {
    if (visibleItems.has(index)) return;

    setTimeout(() => {
      setVisibleItems((prev) => new Set([...prev, index]));
    }, index * staggerDelay);
  };

  const resetAnimation = () => {
    setVisibleItems(new Set());
  };

  return { visibleItems, triggerAnimation, resetAnimation };
};
