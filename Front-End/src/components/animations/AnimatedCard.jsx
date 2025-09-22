import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const AnimatedCard = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  hover = true,
  ...props
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.01,
    triggerOnce: true,
    delay,
  });

  const animationClasses = {
    fadeInUp: "opacity-0 translate-y-4",
    fadeInDown: "opacity-0 -translate-y-4",
    fadeInLeft: "opacity-0 -translate-x-4",
    fadeInRight: "opacity-0 translate-x-4",
    fadeIn: "opacity-0",
    scaleIn: "opacity-0 scale-98",
  };

  const visibleClasses = {
    fadeInUp: "opacity-100 translate-y-0",
    fadeInDown: "opacity-100 translate-y-0",
    fadeInLeft: "opacity-100 translate-x-0",
    fadeInRight: "opacity-100 translate-x-0",
    fadeIn: "opacity-100",
    scaleIn: "opacity-100 scale-100",
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "animate-section transition-all duration-500 ease-out",
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        hover && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      style={{
        willChange: "opacity, transform",
        ...props.style,
      }}
      {...props}>
      {children}
    </div>
  );
};

export default AnimatedCard;
