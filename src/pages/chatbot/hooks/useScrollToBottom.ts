import { useEffect, useRef } from 'react';

export const useScrollToBottom = (dependency: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [dependency]);

  return scrollRef;
};