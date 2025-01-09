import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SwipeableHabitContainerProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export const SwipeableHabitContainer: React.FC<SwipeableHabitContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setSwipeDirection(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const distance = touchStart - currentTouch;
    
    if (Math.abs(distance) > minSwipeDistance) {
      setSwiping(true);
      setSwipeDirection(distance > 0 ? 'left' : 'right');
    }
    
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      onSwipeLeft();
    } else if (isRightSwipe) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      onSwipeRight();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setSwiping(false);
    setSwipeDirection(null);
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        "flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200",
        swiping && "opacity-50",
        swipeDirection === 'left' && "translate-x-[-100px]",
        swipeDirection === 'right' && "translate-x-[100px]"
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};