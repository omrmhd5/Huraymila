import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  ...props
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay,
  });

  const animationClasses = {
    fadeInUp: "opacity-0 translate-y-4",
    fadeInDown: "opacity-0 -translate-y-4",
    fadeInLeft: "opacity-0 -translate-x-4",
    fadeInRight: "opacity-0 translate-x-4",
    fadeIn: "opacity-0",
    scaleIn: "opacity-0 scale-98",
    slideUp: "opacity-0 translate-y-6",
    slideDown: "opacity-0 -translate-y-6",
  };

  const visibleClasses = {
    fadeInUp: "opacity-100 translate-y-0",
    fadeInDown: "opacity-100 translate-y-0",
    fadeInLeft: "opacity-100 translate-x-0",
    fadeInRight: "opacity-100 translate-x-0",
    fadeIn: "opacity-100",
    scaleIn: "opacity-100 scale-100",
    slideUp: "opacity-100 translate-y-0",
    slideDown: "opacity-100 translate-y-0",
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "animate-section transition-all ease-out",
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        willChange: "opacity, transform",
      }}
      {...props}>
      {children}
    </div>
  );
};

export default AnimatedSection;
