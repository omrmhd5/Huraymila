import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const StaggeredContainer = ({
  children,
  className = "",
  staggerDelay = 25,
  animation = "fadeInUp",
  threshold = 0.01,
  ...props
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  });
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    if (isVisible) {
      const childrenArray = React.Children.toArray(children);
      childrenArray.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, index]));
        }, index * staggerDelay);
      });
    }
  }, [isVisible, children, staggerDelay]);

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
    <div ref={elementRef} className={cn(className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: cn(
              "animate-section transition-all duration-500 ease-out",
              visibleItems.has(index)
                ? visibleClasses[animation]
                : animationClasses[animation],
              child.props.className
            ),
            style: {
              willChange: "opacity, transform",
              ...child.props.style,
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default StaggeredContainer;
