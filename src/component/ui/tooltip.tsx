"use client";

import React, { useRef } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  isVisible: boolean;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  disabled?: boolean;
  interactive?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  isVisible = false,
  className = "",
}: // delay = 0,
// disabled = false,
// interactive = false,
TooltipProps) {
  // const [isVisible, setIsVisible] = useState(false);
  // const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const showTooltip = () => {
  //   if (disabled) return;

  //   const timer = setTimeout(() => {
  //     setIsVisible(true);
  //   }, delay);
  //   timeoutRef.current = timer;
  // };

  // const hideTooltip = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null;
  //   }
  //   if (!interactive || !isHoveringTooltip) setIsVisible(false);
  // };

  // const handleTooltipMouseEnter = () => {
  //   if (interactive) setIsHoveringTooltip(true);
  // };

  // const handleTooltipMouseLeave = () => {
  //   if (interactive) {
  //     setIsHoveringTooltip(false);
  //     setIsVisible(false);
  //   }
  // };

  const getPositionClasses = () => {
    const baseClasses =
      "absolute z-50 border border-[#8066CF80] w-[250px] md:w-[300px] bg-[#A082F9] rounded-lg md:rounded-xl p-2 md:p-4 gap-2.5";

    switch (position) {
      case "top":
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-4`;
      case "bottom":
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-4`;
      case "left":
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-4`;
      case "right":
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-4`;
      default:
        return baseClasses;
    }
  };

  const getArrowClasses = () => {
    const baseArrowClasses =
      "absolute size-3.5 bg-[#A082F9] transform rotate-45";

    switch (position) {
      case "top":
        return `${baseArrowClasses} top-full left-1/2 -translate-x-1/2 -mt-1.5`;
      case "bottom":
        return `${baseArrowClasses} bottom-full left-1/2 -translate-x-1/2 -mb-1.5`;
      case "left":
        return `${baseArrowClasses} left-full top-1/2 -translate-y-1/2 -ml-1.5`;
      case "right":
        return `${baseArrowClasses} right-full top-1/2 -translate-y-1/2 -mr-1.5`;
      default:
        return baseArrowClasses;
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   };
  // }, []);

  return (
    <div className="relative inline-block text-xs md:text-base">
      <div
        ref={triggerRef}
        // onMouseEnter={showTooltip}
        // onMouseLeave={hideTooltip}
        // onFocus={showTooltip}
        // onBlur={hideTooltip}
        className={className}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={getPositionClasses()}
          role="tooltip"
          // onMouseEnter={handleTooltipMouseEnter}
          // onMouseLeave={handleTooltipMouseLeave}
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}
